import React, { Fragment } from "react";
import ExploreChatMates from "../../components/UI/ExploreChatMates/ExploreChatMates";
import styles from "./Explore.module.scss";

const Explore = ({ socket }) => {
  return (
    <Fragment>
      <div className={styles["explore"]}>
        <ExploreChatMates socket={socket} />
      </div>
    </Fragment>
  );
};

export default Explore;
