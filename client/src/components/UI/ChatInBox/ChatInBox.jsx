import React, { useState, useEffect, Fragment, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { log } from "../../../utils/consoleLog";
import { baseUrl } from "../../../store/store";
import { generateChatRoomId } from "../../../utils/generateChatRoomId";
import { IoSendSharp } from "react-icons/io5";
import { IconContext } from "react-icons";
import ChatInBoxHeader from "../../layouts/ChatInBoxHeader/ChatInBoxHeader";
import styles from "./ChatInBox.module.scss";

const ChatInBox = ({ socket }) => {
  const textRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const chatMateUserIndex = useSelector(
    (state) => state.chat.chatMate.userIndex
  );
  const chatMateUserId = useSelector((state) => state.chat.chatMate.userId);
  const currentUserIndex = useSelector((state) => state.auth.user.userIndex);
  const currentUserId = useSelector((state) => state.auth.user.userId);
  const chatRoomId = generateChatRoomId(chatMateUserIndex, currentUserIndex);
  const navigate = useNavigate();

  useMemo(() => {
    const getChatMessages = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/api/chats/chat-messages/${chatRoomId}`,
          {
            method: "GET",
            headers: new Headers({
              "Content-type": "application/json",
              Authorization: "Bearer " + token,
            }),
          }
        );
        if (!response.ok) {
          const error = await response.json();
          //   Dispatch an alert msg
          throw new Error(error.message);
        }
        const data = await response.json();
        setMessages(data.data);
      } catch (error) {
        log("error:" + error.message);
      }
    };
    getChatMessages();
  }, [chatRoomId, token]);

  // provides format  -> Sun Jul 03 2022;
  const getDateString = (dateObject) => {
    const date = new Date(JSON.parse(dateObject).date);
    return date.toDateString();
  };
  //provides format  -> 3:47 AM
  const getTime = (dateObject) => {
    const date = new Date(JSON.parse(dateObject).date);
    return date.toLocaleTimeString("en-Us", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  // function to send text message to the server
  const msgObject = {
    chatRoomId: generateChatRoomId(chatMateUserIndex, currentUserIndex),
    senderId: currentUserId,
    recipientId: chatMateUserId,
    date: JSON.stringify({ date: new Date(Date.now()) }),
    message: "",
  };

  const sendTextMessage = (event) => {
    event.preventDefault();
    if (!textRef.current.value) return;
    msgObject.message = textRef.current.value;
    socket.emit("sendMessage", msgObject);
    setMessages((msgList) => [...msgList, msgObject]);
    textRef.current.value = "";
  };

  useEffect(() => {
    const navigateToChat = () => {
      if (!chatRoomId) {
        return navigate("/chat", { replace: true });
      }
    };
    navigateToChat();
  }, [chatRoomId, navigate]);

  // Getting the text message from the server(backend)
  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      log("chat messages: " + msg);
      setMessages((msgList) => [...msgList, msg]);
    });
  }, [socket]);

  return (
    <Fragment>
      <div className={styles["chat-in-box"]}>
        <div className={styles["chat-in-box__header"]}>
          <ChatInBoxHeader />
        </div>
        <section className={styles["chat-in-box__data"]}>
          {messages.map((msgObject) => {
            return (
              <div
                key={new Date(JSON.parse(msgObject.date).date)}
                id={styles["chat-in-box__data__message"]}
                className={
                  currentUserIndex === msgObject.senderId
                    ? styles["chat-in-box__data__message--sender"]
                    : styles["chat-in-box__data__message--recipient"]
                }
              >
                <span className={styles["chat-in-box__data__message--text"]}>
                  {msgObject.message}
                </span>
                <div className={styles["chat-in-box__data__message__date"]}>
                  <span
                    className={styles["chat-in-box__data__message__date--date"]}
                  >
                    {getDateString(msgObject.date)}
                  </span>
                  <span
                    className={styles["chat-in-box__data__message__date--time"]}
                  >
                    {getTime(msgObject.date)}
                  </span>
                </div>
              </div>
            );
          })}
        </section>
        <form className={styles["chat-in-box__form"]}>
          <input
            type="text"
            ref={textRef}
            className={styles["chat-in-box__form__input"]}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                sendTextMessage(event);
              }
            }}
            required
          />
          <span
            onClick={(event) => sendTextMessage(event)}
            className={styles["chat-in-box__form__submit"]}
          >
            <IconContext.Provider value={{ size: "1.5rem" }}>
              <IoSendSharp />
            </IconContext.Provider>
          </span>
        </form>
      </div>
    </Fragment>
  );
};

export default ChatInBox;
