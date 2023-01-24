import React, { useState, useEffect, Fragment, useRef, useMemo } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { baseUrl } from "../../../store/store";
import { generateChatRoomId } from "../../../utils/generateChatRoomId";
import { IoSendSharp } from "react-icons/io5";
import { IconContext } from "react-icons";
import { getChatMessages } from "../../../store/actions/chat";
import { notificationActions } from "../../../store/store";
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
  const dispatch = useDispatch();

  useEffect(() => {
    const navigateToChat = () => {
      if (!chatRoomId) {
        return navigate("/chat", { replace: true });
      }
    };
    navigateToChat();
  }, [chatRoomId, navigate]);

  const dispatchNotificationHandler = (type, message) => {
    dispatch(
      notificationActions.showCardNotification({
        type: type,
        message: message,
      })
    );
  };

  useMemo(() => {
    const getChatMessagesHandler = async () => {
      try {
        setIsLoading(true);
        const myChatMessages = await getChatMessages(chatRoomId, token);
        setMessages(myChatMessages);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        dispatchNotificationHandler(
          "error",
          "Sorry something went wrong while fetching your chats"
        );
      }
    };
    getChatMessagesHandler();
  }, [chatRoomId, token]);

  const textChangeHandler = (event) => {
    setText(event.target.value);
  };

  const onPressEnterHandler = (event) => {
    if (event.key === "Enter") {
      sendTextHandler(event);
    }
  };

  const getDayHandler = (dateObject) => {
    const date = new Date(JSON.parse(dateObject).date);
    return new ChatDate(date).day();
  };

  const getTimeHandler = (dateObject) => {
    const date = new Date(JSON.parse(dateObject).date);
    return new ChatDate(date).time();
  };

  const messageObj = {
    chatRoomId: generateChatRoomId(chatMateUserIndex, currentUserIndex),
    senderId: currentUserId,
    recipientId: chatMateUserId,
    date: JSON.stringify({ date: new Date(Date.now()) }),
    message: text,
  };

  const sendTextHandler = (event) => {
    event.preventDefault();
    if (!text) return;
    socket.emit("sendMessage", messageObj);
    setMessages((messageList) => [...messageList, messageObj]);
    setText("");
  };

  useEffect(() => {
    if (effectRan.current === false) {
      socket.on("receiveMessage", (messageObj) => {
        setMessages((messageList) => [...messageList, messageObj]);
      });
      return () => {
        effectRan.current = true;
      };
    }
  }, [socket]);

  const chatMessages = new Chat(messages).organize();

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
              {chatMessages.map((messageObj, index) => {
                return (
                  <div
                    key={index}
                    className={
                      currentUserId === messageObj.senderId
                        ? `${
                            styles["chat-in-box__message--sender"]
                          } ${messageObj.day && styles["has-unique-day"]}`
                        : `${
                            styles["chat-in-box__message--recipient"]
                          } ${messageObj.day && styles["has-unique-day"]}`
                    }
                  >
                    {messageObj.day && (
                      <div className={styles["has-unique-day__container"]}>
                        <span
                          className={styles["has-unique-day__container--day"]}
                        >
                          {getDayHandler(messageObj.date)}
                        </span>
                      </div>
                    )}
                    <div className={styles["content"]}>
                      <span className={styles["content--text"]}>
                        {messageObj.message}
                      </span>
                      <div className={styles["content__date"]}>
                        <span className={styles["content__date--time"]}>
                          {getTimeHandler(messageObj.date)}
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
              onChange={(event) => textChangeHandler(event)}
              value={text}
              className={styles["chat-in-box__form__group__input"]}
              onKeyPress={(event) => onPressEnterHandler(event)}
              required
            />
            <span
              onClick={(event) => sendTextHandler(event)}
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
