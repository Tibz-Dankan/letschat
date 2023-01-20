import React, { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import chatImage from "../../assets/chat-image-one.png";
import styles from "./Home.module.scss";

const Home = () => {
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
            <nav className={styles["home__header-nav"]}>
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
          </div>
          <div className={styles["home__header__content"]}>
            <div className={styles["home__header__content-text"]}>
              <p className={styles["home__header__content-text--title"]}>
                Chat with anyone
              </p>
              <p className={styles["home__header__content-text--detail"]}>
                LetsChat is online messaging platform that lets you chat with
                pretty much anyone available on the platform.
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
          <div className={styles["home__about-text"]}>
            <p>
              LetsChat is online messaging platform that lets you chat with
              pretty much anyone on the platform
            </p>
          </div>
          <div className={styles["home__about-image"]}></div>
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
