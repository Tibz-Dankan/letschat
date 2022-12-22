import React, { Fragment } from "react";
import ChatInBox from "../../components/UI/ChatInBox/ChatInBox";
import ChatMates from "../../components/UI/ChatMates/ChatMates";
import styles from "./ChatRoom.module.scss";

const ChatRoom = ({ socket }) => {
  return (
    <Fragment>
      <div className={styles["chat-room"]}>
        <section className={styles["chat-room__chat-mates"]}>
          <ChatMates socket={socket} />
        </section>
        <section className={styles["chat-room__chat-in-box"]}>
          <ChatInBox socket={socket} />
        </section>
      </div>
    </Fragment>
  );
};

export default ChatRoom;
