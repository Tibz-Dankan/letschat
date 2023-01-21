import React, { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
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
                LetsChat is an online messaging platform that allows you to
                connect and communicate with a diverse group of users who are
                available on the platform at any given time. It offers a
                convenient and easy way to engage in conversations with people
                from all over the world. With its user-friendly interface, it
                makes it easy for anyone to join and start chatting in a matter
                of minutes.
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
            <p className={styles["home__about-text--title"]}>About</p>
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
