import React, { Fragment } from "react";
import ChatInBox from "../../components/UI/ChatInBox/ChatInBox";
import styles from "./ChatRoom.module.scss";

const ChatRoom = ({ socket }) => {
  return (
    <Fragment>
      <div className={styles["chat__room__container"]}>
        <ChatInBox socket={socket} />
      </div>
    </Fragment>
  );
};

export default ChatRoom;
