import React, { Fragment } from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openSideBar, closeSideBar } from "../../../store/actions/sideBar";
import { IconContext } from "react-icons";
import { FaWindowClose } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoPersonCircleSharp } from "react-icons/io5";
import { IoArrowBackOutline } from "react-icons/io5";

const Header = ({ title }) => {
  const dispatch = useDispatch();
  const isOpenSideBar = useSelector((state) => state.sidebar.isOpenSideBar);
  const userImage = useSelector((state) => state.auth.user.userImageUrl);
  const userName = useSelector((state) => state.auth.user.userName);
  const chatMateName = useSelector((state) => state.chat.chatMate.userName);

  const closeSideBarHandler = async () => {
    await dispatch(closeSideBar());
  };

  const openSideBarHandler = async () => {
    await dispatch(openSideBar());
  };
  // TODO: Dynamic data rendering basing on the title
  // TODO: convert each title to lowercase using javascript
  if (title.toLowerCase() === "chatroom")
    return (
      <Fragment>
        <div className={styles["header"]}>
          <nav className={styles["header__nav"]}>
            <Link to="chat" className={styles["header__nav__link"]}>
              <span className={styles["header__nav__link--icon"]}>
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
          <div className={styles["header__user"]}>
            {userImage && <img alt="my pic here" />}
            {!userImage && (
              <span className={styles["header__user-image--placeholder"]}>
                <IconContext.Provider
                  value={{
                    size: "4rem",
                  }}
                >
                  <IoPersonCircleSharp />
                </IconContext.Provider>
              </span>
            )}
            <span className={styles["header__user--username"]}>
              {chatMateName}
            </span>
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
      </Fragment>
    );

  return (
    <Fragment>
      <div className={styles["header"]}>
        <div className={styles["header__logo"]}>
          <span className={styles["header__logo--text"]}>LetsChat</span>
        </div>
        <div className={styles["header__user"]}>
          {userImage && <img alt="my pic here" />}
          {!userImage && (
            <span className={styles["header__user-image--placeholder"]}>
              <IconContext.Provider
                value={{
                  size: "4rem",
                }}
              >
                <IoPersonCircleSharp />
              </IconContext.Provider>
            </span>
          )}
          <span className={styles["header__user--username"]}>{userName}</span>
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
    </Fragment>
  );
};

export default Header;
