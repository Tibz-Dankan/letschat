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
// import Modernizr from "modernizr";
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
  // const msgDivRef = useRef(null);
  const effectRan = useRef(false);

  // if (Modernizr.ie) {
  //   document.body.classList.add("ie");
  // }
  if (navigator.userAgent.indexOf("Trident/") > -1) {
    document.body.classList.add("ie");
  }

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
    if (effectRan.current === false) {
      socket.on("receiveMessage", (msg) => {
        // log("chat messages: " + msg);
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

  // const className={css`
  //   padding: 32px;
  //   background-color: hotpink;
  //   font-size: 24px;
  //   border-radius: 4px;
  //   &:hover {
  //     color: ${color};
  //   }
  // `}

  //   css`
  // &::scrollbar {
  //   width: 0.8rem;
  //   height: auto;
  // }
  // &::scrollbar-thumb {
  //   background: linear-gradient(
  //     to bottom,
  //     var(--color-grey-dark-3),
  //     var(--color-primary-dark),
  //     var(--color-grey-dark-3)
  //   );
  //   border-radius: 0.8rem;
  // }
  // &::scrollbar-track {
  //   background: var(--color-grey-dark-2);
  // }
  // `
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
          {messages.map((msgObject, index) => {
            return (
              <div
                key={index}
                id={styles["single-message"]}
                className={
                  currentUserId === msgObject.senderId
                    ? styles["chat-in-box__message--sender"]
                    : styles["chat-in-box__message--recipient"]
                }
              >
                <div className={styles["content"]}>
                  <span className={styles["content--text"]}>
                    {msgObject.message}
                  </span>
                  <div className={styles["content__date"]}>
                    {/* <span className={styles["content__date--date"]}>
                      {getDateString(msgObject.date)}
                    </span> */}
                    <span className={styles["content__date--time"]}>
                      {getTime(msgObject.date)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
        <form className={styles["chat-in-box__form"]}>
          <div className={styles["chat-in-box__form__group"]}>
            <input
              type="text"
              ref={textRef}
              className={styles["chat-in-box__form__group__input"]}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  sendTextMessage(event);
                }
              }}
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
