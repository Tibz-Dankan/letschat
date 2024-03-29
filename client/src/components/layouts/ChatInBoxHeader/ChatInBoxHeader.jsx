import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openSideBar, closeSideBar } from "../../../store/actions/sideBar";
import { IconContext } from "react-icons";
import { FaWindowClose } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoPersonCircleSharp } from "react-icons/io5";
import { IoArrowBackOutline } from "react-icons/io5";
import Image from "../../UI/Image/Image";
import styles from "./ChatInBoxHeader.module.scss";

const ChatInBoxHeader = () => {
  const dispatch = useDispatch();
  const isOpenSideBar = useSelector((state) => state.sidebar.isOpenSideBar);
  const userImage = useSelector((state) => state.chat.chatMate.imageUrl);
  const chatMateName = useSelector((state) => state.chat.chatMate.userName);

  const closeSideBarHandler = async () => {
    await dispatch(closeSideBar());
  };

  const openSideBarHandler = async () => {
    await dispatch(openSideBar());
  };

  return (
    <Fragment>
      <header className={styles["header-section"]}>
        <div className={styles["header"]}>
          <div className={styles["header__chat-mate"]}>
            <nav className={styles["header__chat-mate__nav"]}>
              <Link
                to="chat"
                className={styles["header__chat-mate__nav__link"]}
              >
                <span className={styles["header__chat-mate__nav__link--icon"]}>
                  <IconContext.Provider
                    value={{
                      size: "2rem",
                    }}
                  >
                    <IoArrowBackOutline />
                  </IconContext.Provider>
                </span>
              </Link>
            </nav>
            <div className={styles["header__chat-mate__data"]}>
              {userImage && (
                <div className={styles["image-container"]}>
                  <Image
                    src={userImage}
                    alt="photo"
                    class={styles["image-container--image"]}
                  />
                </div>
              )}
              {!userImage && (
                <span
                  className={
                    styles["header__chat-mate__data-image--placeholder"]
                  }
                >
                  <IconContext.Provider
                    value={{
                      size: "4.8rem",
                    }}
                  >
                    <IoPersonCircleSharp />
                  </IconContext.Provider>
                </span>
              )}
              <span className={styles["header__chat-mate__data--name"]}>
                {chatMateName}
              </span>
            </div>
          </div>
          <div className={styles["header__sidebar-actions"]}>
            {!isOpenSideBar && (
              <span
                className={styles["header__sidebar-actions--open"]}
                onClick={() => openSideBarHandler()}
              >
                <IconContext.Provider
                  value={{
                    size: "2rem",
                  }}
                >
                  <GiHamburgerMenu />
                </IconContext.Provider>
              </span>
            )}
            {isOpenSideBar && (
              <span
                className={styles["header__sidebar-actions--close"]}
                onClick={() => closeSideBarHandler()}
              >
                <IconContext.Provider
                  value={{
                    size: "2rem",
                  }}
                >
                  <FaWindowClose />
                </IconContext.Provider>
              </span>
            )}
          </div>
        </div>
      </header>
    </Fragment>
  );
};

export default ChatInBoxHeader;
