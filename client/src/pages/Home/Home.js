import React, { Fragment } from "react";
import styles from "./Home.module.scss";
import LogInForm from "../../components/UI/LogInForm/LogInForm";
import Header from "../../components/layouts/Header/Header";
import Footer from "../../components/layouts/Footer/Footer";

const Home = () => {
  return (
    <Fragment>
      <div className={styles["home-page"]}>
        <Header />
        <h1 className={styles["home-page-heading"]}>This is the Home page</h1>
        <p className={styles["home-page-content"]}>
          Happy to see the sass working
        </p>
        <p className={styles["home-page-content"]}>
          Happy to see the sass working
        </p>
        <p className={styles["home-page-content"]}>
          Happy to see the sass working
        </p>
        <LogInForm />
        <Footer />
      </div>
    </Fragment>
  );
};

export default Home;
