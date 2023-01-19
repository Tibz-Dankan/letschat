import React, { Fragment } from "react";
import styles from "./Home.module.scss";

const Home = () => {
  return (
    <Fragment>
      <div className={styles["home"]}>
        <header className={styles["home__header"]}>
          <div className={styles["home__header-logo"]}>LetsChat</div>
          <nav className={styles["home__header-nav"]}>
            <ul>
              <li>About</li>
              <li>Login</li>
              <li>Signup</li>
            </ul>
          </nav>
          <div className={styles["home__header-content"]}>
            <div className={styles["home__header-text"]}>
              <p>Get started</p>
              <button>Click here</button>
            </div>
            <div className={styles["home__header-image"]}></div>
          </div>
        </header>
        <section className={styles["home__about"]}>
          <div className={styles["home__about-text"]}>
            <p>About text goes here</p>
          </div>
          <div className={styles["home__about-image"]}></div>
        </section>
        <footer className={styles["home__footer"]}>
          <p>LetsChat &copy; {new Date().getFullYear()}. All rights reserved</p>
        </footer>
      </div>
    </Fragment>
  );
};

export default Home;
