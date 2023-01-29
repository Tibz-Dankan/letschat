import React, { Fragment } from "react";
import styles from "./Chat.module.scss";
import ChatMates from "../../components/UI/ChatMates/ChatMates";

const Chat = ({ socket }) => {
  return (
    <Fragment>
      <div className={styles["chat"]}>
        <ChatMates socket={socket} />
        <div className={styles["chat__welcome-bg"]}>
          <h3>LetsChat</h3>
        </div>
      </div>
    </Fragment>
  );
};

export default Chat;
