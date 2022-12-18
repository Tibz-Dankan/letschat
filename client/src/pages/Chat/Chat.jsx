import React, { Fragment } from "react";
import styles from "./Chat.module.scss";
import ChatMates from "../../components/UI/ChatMates/ChatMates";

const Chat = ({ socket }) => {
  return (
    <Fragment>
      <div className={styles["chat-page"]}>
        <ChatMates socket={socket} />
      </div>
    </Fragment>
  );
};

export default Chat;
