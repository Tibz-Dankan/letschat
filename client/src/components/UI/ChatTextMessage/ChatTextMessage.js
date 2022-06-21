import React, { Fragment } from "react";
import styles from "./ChatTextMessage.module.scss";

const ChatTextMessage = () => {
  return (
    <Fragment>
      <div className={styles["chat-text-msg"]}>
        <h3>Am the chat message</h3>
      </div>
    </Fragment>
  );
};

export default ChatTextMessage;
