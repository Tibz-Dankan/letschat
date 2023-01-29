import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ChatList.module.scss";
import styledScrollbar from "../../../styles/scrollbar.module.scss";
import Loading from "../Loading/Loading";
import { IconContext } from "react-icons";
import { IoPersonCircleSharp } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { updateChatMateData } from "../../../store/actions/chat";
import { generateChatRoomId } from "../../../utils/generateChatRoomId";
import Image from "../Image/Image";

const ChatList = ({ socket, isLoading }) => {
  const chatMates = useSelector((state) => state.chat.allChatMates);
  const chatMateUserId = useSelector((state) => state.chat.chatMate.userId);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const currentUserIndex = user.userIndex;
  const userImage = user.imageUrl;
  const userName = user.userName;

  // Join chat room
  const joinRoom = async (chatMate) => {
    const chatRoomId = generateChatRoomId(currentUserIndex, chatMate.userIndex);
    await dispatch(updateChatMateData(chatMate));
    socket.emit("joinRoom", chatRoomId);
    navigate("/chat-room", { replace: false });
  };

  const isClicked = (chatMateId) => {
    if (!chatMateId) return;
    return chatMateId === chatMateUserId;
  };

  const isLetter = (str) => {
    const alphabetRegex = /^[a-zA-Z]$/;
    return alphabetRegex.test(str);
  };

  const isSpace = (str) => {
    const spaceRegex = /\s/;
    return spaceRegex.test(str);
  };

  const nameFirstLettersHandler = (name) => {
    let firstLetters;
    let nextCharIndex;
    const nameStr = name.toString();

    for (let index = 0; index < nameStr.length; index++) {
      const charStr = nameStr[index].toString();
      if (index === 0 && isLetter(charStr)) {
        firstLetters = charStr.toString();
      }
      if (isSpace(charStr)) {
        nextCharIndex = index + 1;
      }
      const isALetter = isLetter(nameStr[nextCharIndex]?.toString());
      if (isALetter) {
        firstLetters = firstLetters + name[nextCharIndex].toString();
        break;
      }
    }
    return firstLetters.toUpperCase();
  };

  return (
    <Fragment>
      <div className={styles["chat__list"]}>
        <div className={styles["chat__list__header"]}>
          <div className={styles["chat__list__header__logo"]}>
            <span className={styles["chat__list__header__logo--text"]}>
              LetsChat
            </span>
          </div>
          <div className={styles["chat__list__header__user"]}>
            {!userImage && (
              <span
                className={
                  styles["chat__list__header__user--image-placeholder"]
                }
              >
                <IconContext.Provider value={{ size: "4.8rem" }}>
                  <IoPersonCircleSharp />
                </IconContext.Provider>
              </span>
            )}
            {userImage && (
              <div className={styles["chat__list__header__user--image"]}>
                <Image src={userImage} alt={"photo"} class={styles["image"]} />
              </div>
            )}
            <span
              className={styles["chat__list__header__user--name-first-letters"]}
            >
              {nameFirstLettersHandler(userName)}
            </span>
          </div>
        </div>
        <div
          className={`${styles["chat__list__content"]} ${styledScrollbar["scroll-bar"]}`}
        >
          {isLoading && <Loading event={"on-loading-users"} />}
          {chatMates.map((chatMate) => {
            return (
              <div
                key={chatMate.userId}
                className={`${styles["chat__list__chat-mate"]} ${isClicked(
                  chatMate.userId
                ) && styles["chat__list--is-clicked"]}`}
              >
                {!chatMate.imageUrl && (
                  <span
                    className={
                      styles["chat__list__chat-mate--image-placeholder"]
                    }
                  >
                    <IconContext.Provider value={{ size: "4.8rem" }}>
                      <IoPersonCircleSharp />
                    </IconContext.Provider>
                  </span>
                )}
                {chatMate.imageUrl && (
                  <div className={styles["chat__list__chat-mate--image"]}>
                    <Image
                      src={chatMate.imageUrl}
                      alt={"photo"}
                      class={styles["image"]}
                    />
                  </div>
                )}
                <div
                  onClick={() => joinRoom(chatMate)}
                  className={styles["chat__list__chat-mate__data"]}
                >
                  <span className={styles["chat__list__chat-mate__data--name"]}>
                    {chatMate.userName}
                  </span>
                  {/* <span
                    className={
                      styles["chat__list__chat-mate__data--last-message"]
                    }
                  >
                    last message text
                  </span> */}
                  {/* <span
                    className={
                      styles["chat__list__chat-mate__data--message-date"]
                    }
                  >
                    Date Or Time
                  </span> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default ChatList;
