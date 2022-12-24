import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ChatList.module.scss";
import { IconContext } from "react-icons";
import { IoPersonCircleSharp } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { updateChatMateData } from "../../../store/actions/chat";
import { generateChatRoomId } from "../../../utils/generateChatRoomId";

const ChatList = ({ socket }) => {
  const chatMates = useSelector((state) => state.chat.allChatMates);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUserIndex = useSelector((state) => state.auth.user.userIndex);

  // Join chat room
  const joinRoom = async (chatMate) => {
    const chatRoomId = generateChatRoomId(currentUserIndex, chatMate.userIndex);
    await dispatch(updateChatMateData(chatMate));
    socket.emit("joinRoom", chatRoomId);
    navigate("/chat-room", { replace: false });
  };

  return (
    <Fragment>
      <div className={styles["chat__list"]}>
        <div className={styles["chat__list__heading"]}>
          <h5>CHATS</h5>
          <h5>EXPLORE</h5>
        </div>
        {chatMates.map((chatMate) => {
          return (
            <div
              key={chatMate.userId}
              className={styles["chat__list__chat-mate"]}
            >
              {!chatMate.imageUrl && (
                <span
                  className={styles["chat__list__chat-mate--image-placeholder"]}
                >
                  <IconContext.Provider value={{ size: "4rem" }}>
                    <IoPersonCircleSharp />
                  </IconContext.Provider>
                </span>
              )}
              {chatMate.imageUrl && (
                <div className={styles["chat__list__chat-mate--image"]}>
                  <img src={chatMate.imageUrl} alt="Profile pic" />
                </div>
              )}
              <div
                onClick={() => joinRoom(chatMate)}
                className={styles["chat__list__chat-mate__data"]}
              >
                <span className={styles["chat__list__chat-mate__data--name"]}>
                  {chatMate.userName}
                </span>
                <span
                  className={
                    styles["chat__list__chat-mate__data--last-message"]
                  }
                >
                  last message text
                </span>
                <span
                  className={
                    styles["chat__list__chat-mate__data--message-date"]
                  }
                >
                  Date Or Time
                </span>
              </div>
            </div>
          );
        })}
        <footer className={styles["chat__list__footer"]}>
          <span>LetsChat &copy; {new Date().getFullYear()}</span>
        </footer>
      </div>
    </Fragment>
  );
};

export default ChatList;
