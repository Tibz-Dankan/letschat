import React, { useState, useEffect, Fragment, useRef, useMemo } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { css } from "@emotion/css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { log } from "../../../utils/consoleLog";
import { baseUrl } from "../../../store/store";
import { generateChatRoomId } from "../../../utils/generateChatRoomId";
import { IoSendSharp } from "react-icons/io5";
import { IconContext } from "react-icons";
import ChatInBoxHeader from "../../layouts/ChatInBoxHeader/ChatInBoxHeader";
import Loading from "../Loading/Loading";
import { ChatDate } from "../../../utils/chatDate";
import { Chat } from "../../../utils/chat";
import styles from "./ChatInBox.module.scss";

const ChatInBox = ({ socket }) => {
  const [text, setText] = useState("");
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
  const effectRan = useRef(false);
  const [isLoading, setIsLoading] = useState(false);

  if (navigator.userAgent.indexOf("Trident/") > -1) {
    document.body.classList.add("ie");
  }

  const textChangeHandler = (event) => {
    setText(event.target.value);
  };

  const onPressEnterHandler = (event) => {
    if (event.key === "Enter") {
      sendTextMessage(event);
    }
  };

  useMemo(() => {
    const getChatMessages = async () => {
      try {
        setIsLoading(true);
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
        setIsLoading(false);
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

  const chatMessages = new Chat(messages).organize();

  const getDay = (dateObject) => {
    const date = new Date(JSON.parse(dateObject).date);
    return new ChatDate(date).day();
  };

  const getTime = (dateObject) => {
    const date = new Date(JSON.parse(dateObject).date);
    return new ChatDate(date).time();
  };

  // function to send text message to the server
  const msgObject = {
    chatRoomId: generateChatRoomId(chatMateUserIndex, currentUserIndex),
    senderId: currentUserId,
    recipientId: chatMateUserId,
    date: JSON.stringify({ date: new Date(Date.now()) }),
    message: text,
  };

  const sendTextMessage = (event) => {
    event.preventDefault();
    if (!text) return;
    socket.emit("sendMessage", msgObject);
    setMessages((msgList) => [...msgList, msgObject]);
    setText("");
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
    if (effectRan.current === false) {
      socket.on("receiveMessage", (msg) => {
        console.log("message received");
        console.log(msg);
        setMessages((msgList) => [...msgList, msg]);
      });
      return () => {
        effectRan.current = true;
      };
    }
  }, [socket]);

  const color = "white";

  const ROOT_CSS = css({
    height: 600,
    width: 400,
  });

  return (
    <Fragment>
      <div className={styles["chat-in-box"]}>
        <div className={styles["chat-in-box__header"]}>
          <ChatInBoxHeader />
        </div>
        <ScrollToBottom className={styles["chat-in-box__message"]}>
          {isLoading && <Loading event={"on-loading-messages"} />}
          {!isLoading && (
            <>
              {chatMessages.map((msgObject, index) => {
                return (
                  <div
                    key={index}
                    className={
                      currentUserId === msgObject.senderId
                        ? `${
                            styles["chat-in-box__message--sender"]
                          } ${msgObject.day && styles["has-unique-day"]}`
                        : `${
                            styles["chat-in-box__message--recipient"]
                          } ${msgObject.day && styles["has-unique-day"]}`
                    }
                  >
                    {msgObject.day && (
                      <div className={styles["has-unique-day__container"]}>
                        <span
                          className={styles["has-unique-day__container--day"]}
                        >
                          {getDay(msgObject.date)}
                        </span>
                      </div>
                    )}
                    <div className={styles["content"]}>
                      <span className={styles["content--text"]}>
                        {msgObject.message}
                      </span>
                      <div className={styles["content__date"]}>
                        <span className={styles["content__date--time"]}>
                          {getTime(msgObject.date)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </ScrollToBottom>
        <form className={styles["chat-in-box__form"]}>
          <div className={styles["chat-in-box__form__group"]}>
            <input
              type="text"
              // ref={textRef}
              onChange={(event) => textChangeHandler(event)}
              value={text}
              className={styles["chat-in-box__form__group__input"]}
              onKeyPress={(event) => onPressEnterHandler(event)}
              required
            />
            <span
              onClick={(event) => sendTextMessage(event)}
              className={styles["chat-in-box__form__group__submit"]}
            >
              <IconContext.Provider value={{ size: "1.5rem" }}>
                <IoSendSharp />
              </IconContext.Provider>
            </span>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default ChatInBox;
