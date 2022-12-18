import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ChatList.module.scss";
import { IconContext } from "react-icons";
import { CgProfile } from "react-icons/cg";
import { SiGooglemessages } from "react-icons/si";
import { useSelector, useDispatch } from "react-redux";
import { updateChatMateData } from "../../../store/actions/chat";
import { generateChatRoomId } from "../../../utils/generateChatRoomId";

const ChatList = ({ socket }) => {
  const chatMates = useSelector((state) => state.chat.allChatMates);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUserIndex = useSelector((state) => state.auth.user.userId);

  // Join chat room
  const joinRoom = async (chatMate) => {
    const chatRoomId = generateChatRoomId(currentUserIndex, chatMate.userIndex);
    await dispatch(updateChatMateData(chatMate));
    socket.emit("joinRoom", chatRoomId);
    navigate("/chat-room", { replace: false });
  };

  return (
    <Fragment>
      <div className={styles["chat__list__wrapper"]}>
        {chatMates.map((chatMate) => {
          return (
            <div key={chatMate.userId} className={styles["chat__list"]}>
              {!chatMate.imageUrl && (
                <IconContext.Provider value={{ size: "2.5em" }}>
                  <div className={styles["image__icon__container"]}>
                    <CgProfile className={styles["image__icon"]} />
                  </div>
                </IconContext.Provider>
              )}
              {chatMate.imageUrl && (
                <div className={styles["user__image"]}>
                  <img src={chatMate.imageUrl} alt="Profile pic" />
                </div>
              )}
              <div className={styles["user__name"]}>{chatMate.userName}</div>
              <div
                onClick={() => joinRoom(chatMate)}
                className={styles["message__icon"]}
              >
                <IconContext.Provider value={{ size: "1.5em" }}>
                  <SiGooglemessages />
                </IconContext.Provider>
              </div>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default ChatList;
