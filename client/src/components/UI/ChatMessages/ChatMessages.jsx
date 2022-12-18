import React, { useState, useEffect, Fragment, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { log } from "../../../utils/consoleLog";
import { baseUrl } from "../../../store/store";
import { generateChatRoomId } from "../../../utils/generateChatRoomId";
import { clearChatRoomAndLocalStorage } from "../../../store/actions/users";
import { IoMdVideocam } from "react-icons/io";
import { IoCallSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { GiPlayButton } from "react-icons/gi";
import { IconContext } from "react-icons";
import styles from "./ChatMessages.module.scss";

const ChatMessages = ({ socket }) => {
  const textRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const imageUrl = useSelector((state) => state.chat.chatMate.imageUrl);
  const chatMateUserIndex = useSelector(
    (state) => state.chat.chatMate.userIndex
  );
  const chatMateUserId = useSelector((state) => state.chat.chatMate.userId);
  const currentUserIndex = useSelector((state) => state.auth.user.userIndex);
  const currentUserId = useSelector((state) => state.auth.user.userId);
  const chatRoomId = generateChatRoomId(chatMateUserIndex, currentUserIndex);
  log("chat room Id: " + chatRoomId); // to be removed
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navigateToChat = () => {
    if (!chatRoomId) {
      return navigate("/chat", { replace: true });
    }
  };
  navigateToChat();

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

  // Getting the text message from the server(backend)
  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      log("chat messages: " + msg);
      setMessages((msgList) => [...msgList, msg]);
    });
  }, [socket]);

  return (
    <Fragment>
      <div className={styles["chat__Message__container"]}>
        <Link
          to="/chat"
          onClick={() => dispatch(clearChatRoomAndLocalStorage())}
          className={styles["chat__msg"]}
        >
          <h2>Back</h2>
        </Link>
        <section className={styles["chat__message__header"]}>
          <div className={styles["image___icon__container"]}>
            {!useSelector((state) => state.chat.chatMate.imageUrl) && (
              <IconContext.Provider value={{ size: "2.5em" }}>
                <CgProfile className={styles["image__icon"]} />
              </IconContext.Provider>
            )}
            {useSelector((state) => state.chat.chatMate.imageUrl) && (
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
            <p>{useSelector((state) => state.chat.chatMate.userName)}</p>
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
                  currentUserIndex === msgObject.senderId
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
            ref={textRef}
            className={styles["form__input__field"]}
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
