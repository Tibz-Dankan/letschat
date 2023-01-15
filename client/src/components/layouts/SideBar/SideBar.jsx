import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../../store/actions/auth";
import { NavLink } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaWindowClose } from "react-icons/fa";
import { IoPersonCircleSharp } from "react-icons/io5";
import { GoPerson } from "react-icons/go";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { MdSettings } from "react-icons/md";
import { BsFillChatTextFill } from "react-icons/bs";
import { MdExplore } from "react-icons/md";
import { closeSideBar } from "../../../store/actions/sideBar";
import styles from "./SideBar.module.scss";

const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const logOutHandler = async () => {
    await dispatch(logOut());
    navigate("/login", { replace: true });
  };

  const sideBarSectionStyles = {
    height: "100vh",
    width: "0",
    boxShadow: "0rem 0rem 0.2rem 0.2rem hsla(0, 0%, 0%, 0.15)",
    position: "fixed",
    zIndex: "1200",
    top: "0",
    left: "0",
    overflowX: "hidden",
    transition: "0.5s",
  };

  const closeSideBarHandler = async () => {
    await dispatch(closeSideBar());
  };

  return (
    <Fragment>
      <section id="sidebar-section" style={sideBarSectionStyles}>
        <div className={styles["sidebar"]}>
          <span
            className={styles["sidebar--close"]}
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
          <div className={styles["sidebar__user"]}>
            {user.imageUrl && (
              <span className={styles["sidebar__user--image"]}>
                <img src={user.imageUrl} alt={user.userName} />
              </span>
            )}
            {!user.imageUrl && (
              <span className={styles["sidebar__user--image-icon"]}>
                <IconContext.Provider
                  value={{
                    size: "4.6rem",
                  }}
                >
                  <IoPersonCircleSharp />
                </IconContext.Provider>
              </span>
            )}
            <span className={styles["sidebar__user--name"]}>
              {user.userName}
            </span>
          </div>
          <nav className={styles["sidebar__nav"]}>
            <li className={styles["sidebar__nav__list"]}>
              <NavLink
                to="explore"
                className={styles["sidebar__nav__list__link"]}
                onClick={() => closeSideBarHandler()}
              >
                <span className={styles["sidebar__nav__list__link--icon"]}>
                  <IconContext.Provider
                    value={{
                      size: "2rem",
                    }}
                  >
                    <MdExplore />
                  </IconContext.Provider>
                </span>
                <span className={styles["sidebar__nav__list__link--text"]}>
                  Explore
                </span>
              </NavLink>
            </li>
            <li className={styles["sidebar__nav__list"]}>
              <NavLink
                to="chat"
                className={styles["sidebar__nav__list__link"]}
                onClick={() => closeSideBarHandler()}
              >
                <span className={styles["sidebar__nav__list__link--icon"]}>
                  <IconContext.Provider
                    value={{
                      size: "1.8rem",
                    }}
                  >
                    <BsFillChatTextFill />
                  </IconContext.Provider>
                </span>
                <span className={styles["sidebar__nav__list__link--text"]}>
                  Chat
                </span>
              </NavLink>
            </li>
            <li className={styles["sidebar__nav__list"]}>
              <NavLink
                to="profile"
                className={styles["sidebar__nav__list__link"]}
                onClick={() => closeSideBarHandler()}
              >
                <span className={styles["sidebar__nav__list__link--icon"]}>
                  <IconContext.Provider
                    value={{
                      size: "2rem",
                    }}
                  >
                    <GoPerson />
                  </IconContext.Provider>
                </span>
                <span className={styles["sidebar__nav__list__link--text"]}>
                  Profile
                </span>
              </NavLink>
            </li>
            <li className={styles["sidebar__nav__list"]}>
              <NavLink
                to="settings"
                className={styles["sidebar__nav__list__link"]}
                onClick={() => closeSideBarHandler()}
              >
                <span className={styles["sidebar__nav__list__link--icon"]}>
                  <IconContext.Provider
                    value={{
                      size: "2rem",
                    }}
                  >
                    <MdSettings />
                  </IconContext.Provider>
                </span>
                <span className={styles["sidebar__nav__list__link--text"]}>
                  Settings
                </span>
              </NavLink>
            </li>
          </nav>
          <div className={styles["sidebar__logout"]}>
            <button
              onClick={() => logOutHandler()}
              className={styles["sidebar__logout-btn"]}
            >
              <span className={styles["sidebar__logout-btn--icon"]}>
                <IconContext.Provider
                  value={{
                    size: "1.6rem",
                  }}
                >
                  <RiLogoutCircleRLine />
                </IconContext.Provider>
              </span>
              <span className={styles["sidebar__logout-btn--text"]}>
                Log out
              </span>
            </button>
          </div>
          <footer className={styles["sidebar__footer"]}>
            <span>LetsChat &copy; {new Date().getFullYear()}</span>
          </footer>
        </div>
      </section>
    </Fragment>
  );
};

export default SideBar;
