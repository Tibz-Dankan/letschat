import React, { Fragment, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaWindowClose } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import styles from "./Home.module.scss";

const Home = () => {
  const [showNavLinks, setShowNavLinks] = useState(false);

  const showNavHandler = () => {
    const nav = document.querySelector("#nav-links");
    setShowNavLinks(true);
    nav.style.display = "block";
  };

  const closeNavHandler = () => {
    const nav = document.querySelector("#nav-links");
    setShowNavLinks(false);
    nav.style.display = "none";
  };

  const windowWidth = () => {
    const width = window.innerWidth;
    return width;
  };

  const [browserWindowWidth, setBrowserWindowWidth] = useState(windowWidth());

  useEffect(() => {
    const widthResizeHandler = () => {
      setBrowserWindowWidth(windowWidth());
    };
    window.addEventListener("resize", widthResizeHandler);

    if (window.matchMedia("(min-width: 600px)").matches) {
      showNavHandler();
    }
    if (window.matchMedia("(max-width: 600px)").matches) {
      closeNavHandler();
    }
    return () => window.removeEventListener("resize", widthResizeHandler);
  }, [browserWindowWidth]);

  const viewAbout = () => {
    const about = document.querySelector("#about");
    about.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <Fragment>
      <div className={styles["home"]}>
        <header className={styles["home__header"]}>
          <div>
            <span className={styles["home__header-logo"]}>LetsChat</span>
            <nav className={styles["home__header-nav"]} id="nav-links">
              <ul>
                <li onClick={() => viewAbout()}>
                  <NavLink to="#" className={styles["link"]}>
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink to="login" className={styles["link"]}>
                    LogIn
                  </NavLink>
                </li>
                <li>
                  <NavLink to="signup" className={styles["link"]}>
                    Create account
                  </NavLink>
                </li>
              </ul>
            </nav>
            {!showNavLinks && (
              <span
                className={styles["menu-icon"]}
                onClick={() => showNavHandler()}
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
            {showNavLinks && (
              <span
                className={styles["menu-icon"]}
                onClick={() => closeNavHandler()}
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
          <div className={styles["home__header__content"]}>
            <div className={styles["home__header__content-text"]}>
              <h1 className={styles["home__header__content-text--title"]}>
                Chat with anyone
              </h1>
              <p className={styles["home__header__content-text--detail"]}>
                Start a conversation with just about anyone on the platform and
                build your friendship from there.
              </p>
              <button>
                <Link to="signup" className={styles["link"]}>
                  Get started
                </Link>
              </button>
            </div>
            <div className={styles["home__header__content-image"]}></div>
          </div>
        </header>
        <section id="about" className={styles["home__about"]}>
          <div className={styles["home__about-image"]}></div>
          <div className={styles["home__about-text"]}>
            <h3 className={styles["home__about-text--title"]}>About</h3>
            <p>
              LetsChat is a messaging platform that allows users to communicate
              with anyone in real-time. It is designed for both personal and
              professional use, with a focus on simplicity and speed. The
              platform is easy to use, with an intuitive interface that makes it
              easy to navigate and find the features you need. Whether you're
              keeping in touch with friends and family or collaborating with
              colleagues, LetsChat is a reliable and user-friendly messaging
              platform that makes it easy to stay in touch with the people that
              matter most.
            </p>
          </div>
        </section>
        <footer className={styles["home__footer"]}>
          <span>
            LetsChat &copy; {new Date().getFullYear()}. All rights reserved |
          </span>
          <span> LetsChat is a product of Tibz</span>
        </footer>
      </div>
    </Fragment>
  );
};

export default Home;
