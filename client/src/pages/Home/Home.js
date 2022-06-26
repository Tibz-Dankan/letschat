import React, { Fragment } from "react";
import styles from "./Home.module.scss";
import LogIn from "../../components/UI/LogIn/LogIn";
import Header from "../../components/layouts/Header/Header";
import Footer from "../../components/layouts/Footer/Footer";

const Home = () => {
  return (
    <Fragment>
      <div className={styles["home__page"]}>
        <Header />
        <LogIn />
        <Footer />
      </div>
    </Fragment>
  );
};

export default Home;
