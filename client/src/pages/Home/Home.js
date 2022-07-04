/* eslint-disable no-unused-vars */
import React, { Fragment } from "react";
import styles from "./Home.module.scss";
import LogIn from "../../components/UI/LogIn/LogIn";
import Header from "../../components/layouts/Header/Header";
import Footer from "../../components/layouts/Footer/Footer";
import LogOut from "../../components/UI/LogOut/LogOut";
import { useSelector } from "react-redux";

const Home = () => {
  // const token = useSelector((state) => state.auth.token);
  // const user = useSelector((state) => state.auth.user);
  // console.log("token: " + token + " user: " + JSON.stringify({ user }));
  return (
    <Fragment>
      <div className={styles["home__page"]}>
        <Header />
        <LogOut />
        <LogIn />
        <Footer />
      </div>
    </Fragment>
  );
};

export default Home;
