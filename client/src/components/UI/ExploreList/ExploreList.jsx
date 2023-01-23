import React, { Fragment } from "react";
import styles from "./ExploreList.module.scss";
import { IconContext } from "react-icons";
import { IoPersonCircleSharp } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateChatMateData } from "../../../store/actions/chat";
import { generateChatRoomId } from "../../../utils/generateChatRoomId";

const ExploreList = ({ socket }) => {
  const exploreChatMates = useSelector((state) => state.chat.exploreChatMates);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUserIndex = useSelector((state) => state.auth.user.userIndex);

  // Join chat room
  const joinRoom = async (exploreChatMate) => {
    const chatRoomId = generateChatRoomId(
      currentUserIndex,
      exploreChatMate.userIndex
    );
    await dispatch(updateChatMateData(exploreChatMate));
    socket.emit("joinRoom", chatRoomId);
    navigate("/chat-room", { replace: false });
  };
  return (
    <Fragment>
      <div className={styles["explore-list"]}>
        <div className={styles["explore-list"]}>
          <div className={styles["explore-list__heading"]}>
            <h5>CHATS</h5>
            <h5>EXPLORE</h5>
          </div>
          {exploreChatMates.map((exploreChatMate) => {
            return (
              <div
                key={exploreChatMate.userId}
                className={styles["explore-list__chat-mate"]}
              >
                {!exploreChatMate.imageUrl && (
                  <span
                    className={
                      styles["explore-list__chat-mate--image-placeholder"]
                    }
                  >
                    <IconContext.Provider value={{ size: "4rem" }}>
                      <IoPersonCircleSharp />
                    </IconContext.Provider>
                  </span>
                )}
                {exploreChatMate.imageUrl && (
                  <div className={styles["explore-list__chat-mate--image"]}>
                    <img src={exploreChatMate.imageUrl} alt="Profile pic" />
                  </div>
                )}
                <div
                  onClick={() => joinRoom(exploreChatMate)}
                  className={styles["explore-list__chat-mate__data"]}
                >
                  <span
                    className={styles["explore-list__chat-mate__data--name"]}
                  >
                    {exploreChatMate.userName}
                  </span>
                  <span
                    className={
                      styles["explore-list__chat-mate__data--last-message"]
                    }
                  >
                    last message text
                  </span>
                  <span
                    className={
                      styles["explore-list__chat-mate__data--message-date"]
                    }
                  >
                    Date Or Time
                  </span>
                </div>
              </div>
            );
          })}
          <footer className={styles["explore-list__footer"]}>
            <span>LetsChat &copy; {new Date().getFullYear()}</span>
          </footer>
        </div>
      </div>
    </Fragment>
  );
};

export default ExploreList;

// Now things are very different with shades of purple extension
