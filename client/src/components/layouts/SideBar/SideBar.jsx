import React, { Fragment } from "react";
import styles from "./SideBar.module.scss";

const SideBar = () => {
  return (
    <Fragment>
      <div className={styles["sidebar"]}></div>
      <h1>This is the SideBar</h1>
    </Fragment>
  );
};

export default SideBar;
