import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../../store/actions/auth";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaWindowClose } from "react-icons/fa";
import { IoPersonCircleSharp } from "react-icons/io5";
import { GoPerson } from "react-icons/go";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { MdSettings } from "react-icons/md";
import { closeSideBar } from "../../../store/actions/sideBar";
import styles from "./SideBar.module.scss";

const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector((state) => state.auth.user.userName);

  const logOutHandler = async () => {
    await dispatch(logOut());
    navigate("/login", { replace: true });
  };

  const sideBarSectionStyles = {
    height: "100vh",
    width: "0",
    position: "fixed",
    zIndex: "1000",
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
            <span className={styles["sidebar__user--image"]}>
              <IconContext.Provider
                value={{
                  size: "4rem",
                }}
              >
                <IoPersonCircleSharp />
              </IconContext.Provider>
            </span>
            <span className={styles["sidebar__user--name"]}>{userName}</span>
          </div>
          <nav className={styles["sidebar__nav"]}>
            <li className={styles["sidebar__nav__list"]}>
              <Link to="profile" className={styles["sidebar__nav__list__link"]}>
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
              </Link>
            </li>
            <li className={styles["sidebar__nav__list"]}>
              <Link
                to="settings"
                className={styles["sidebar__nav__list__link"]}
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
              </Link>
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
