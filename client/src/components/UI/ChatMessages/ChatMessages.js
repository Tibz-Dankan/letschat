import React, { useState, useEffect, Fragment, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { log } from "../../../utils/consoleLog";
import { generateChatRoomId } from "../../../utils/generateChatRoomId";
import { IoMdVideocam } from "react-icons/io";
import { IoCallSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { GiPlayButton } from "react-icons/gi";
import { IconContext } from "react-icons";
import styles from "./ChatMessages.module.scss";

const ChatMessages = ({ socket }) => {
  const [text, setText] = useState("");
  // Initials state of messages is from redux store
  const messagesInStore = useSelector((state) => state.chat.messages);
  const [messages, setMessages] = useState(messagesInStore);

  useEffect(() => {
    if (messagesInStore === null) {
      setMessages(messagesInStore);
    }
  }, [messagesInStore]);

  const effectRan = useRef(false);
  const imageUrl = useSelector((state) => state.users.chatWithUser.image_url);
  const chatWithUserId = useSelector(
    (state) => state.users.chatWithUser.user_id
  );
  const currentUserId = useSelector((state) => state.auth.user.userId);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  // TODO: consider adding message id (this could be date) // to be decided

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

  log("chat room Id: " + generateChatRoomId(chatWithUserId, currentUserId)); // to be removed
  // function to send text message to the server
  const msgObject = {
    chatRoomId: generateChatRoomId(chatWithUserId, currentUserId),
    senderId: currentUserId,
    recipientId: chatWithUserId,
    date: JSON.stringify({ date: new Date(Date.now()) }),
    message: text,
  };
  const sendTextMessage = (event) => {
    event.preventDefault();
    if (text === "") return;
    socket.emit("sendMessage", msgObject);
    setMessages((msgList) => [...msgList, msgObject]);
    setText("");
  };

  // Getting the text message from the server
  useEffect(() => {
    if (effectRan.current === false) {
      socket.on("receiveMessage", (msg) => {
        log("chat messages: " + msg);
        setMessages((msgList) => [...msgList, msg]);
      });
      return () => {
        effectRan.current = true;
      };
    }
  }, [socket]);

  return (
    <Fragment>
      <div className={styles["chat__Message__container"]}>
        <Link to="/chat" className={styles["chat__msg"]}>
          <h2>Back</h2>
        </Link>
        <section className={styles["chat__message__header"]}>
          <div className={styles["image___icon__container"]}>
            {!useSelector((state) => state.users.chatWithUser.image_url) && (
              <IconContext.Provider value={{ size: "2.5em" }}>
                <CgProfile className={styles["image__icon"]} />
              </IconContext.Provider>
            )}
            {useSelector((state) => state.users.chatWithUser.image_url) && (
              <div className={styles["user__image__container"]}>
                <img
                  src={imageUrl}
                  alt="Profile pic"
                  className={styles["user__image"]}
                />
              </div>
            )}
          </div>
          <div className={styles["chat__with__user__name"]}>
            <p>{useSelector((state) => state.users.chatWithUser.user_name)}</p>
          </div>
          <div className={styles["chat__with__calls__container"]}>
            <div className={styles["video__call"]}>
              <IconContext.Provider value={{ size: "1.3em" }}>
                <IoMdVideocam />
              </IconContext.Provider>
            </div>
            <div className={styles["audio__call"]}>
              <IconContext.Provider value={{ size: "1.3em" }}>
                <IoCallSharp />
              </IconContext.Provider>
            </div>
          </div>
        </section>
        <section className={styles["message__container"]}>
          <span>Messages Here</span>
          {messages.map((msgObject) => {
            return (
              <div
                key={new Date(JSON.parse(msgObject.date).date)}
                id={styles["message"]}
                className={
                  currentUserId === msgObject.senderId
                    ? styles["my__message"]
                    : styles["other__message"]
                }
              >
                <span className={styles["msg"]}>{msgObject.message} </span>
                <div className={styles["date__time__container"]}>
                  <span className={styles["date"]}>
                    {getDateString(msgObject.date)}
                  </span>
                  <span className={styles["time"]}>
                    {getTime(msgObject.date)}
                  </span>
                </div>
              </div>
            );
          })}
        </section>
        <form className={styles["form__input"]}>
          <input
            type="text"
            value={text}
            className={styles["form__input__field"]}
            onChange={(event) => handleTextChange(event)}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                sendTextMessage();
              }
            }}
            required
          />
          <div
            onClick={(e) => sendTextMessage(e)}
            className={styles["button__icon__container"]}
          >
            <IconContext.Provider value={{ size: "3em" }}>
              <GiPlayButton />
            </IconContext.Provider>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default ChatMessages;
