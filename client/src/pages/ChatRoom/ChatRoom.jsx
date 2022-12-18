import React, { Fragment, useEffect } from "react";
import { Route, Navigate } from "react-router-dom";
// import { usersActions } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { updateChatMateData } from "../../store/actions/chat";
// import { log } from "../../utils/consoleLog";
import { generateChatRoomId } from "../../utils/generateChatRoomId";
import ChatInBox from "../../components/UI/ChatInBox/ChatInBox";
import styles from "./ChatRoom.module.scss";

const ChatRoom = ({ socket }) => {
  const dispatch = useDispatch();
  // const effectRan = useRef(false);

  const chatMateUserIndex = useSelector(
    (state) => state.chat.chatMate.userIndex
  );
  const currentUserIndex = useSelector((state) => state.auth.user.userIndex);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const tryReconnect = async () => {
    const chatMateData = localStorage.getItem("chatMateData");
    if (!chatMateData) {
      console.log("no  chatMate data");
      return (
        <Route path="/chat-room" element={<Navigate to="/chat" replace />} />
      );
    }
    const parsedData = JSON.parse(chatMateData);
    const { chatMate } = parsedData;
    const chatRoomId = generateChatRoomId(currentUserIndex, chatMateUserIndex);
    if (!chatRoomId) {
      console.log("no chat room id");
      return (
        <Route path="/chat-room" element={<Navigate to="/chat" replace />} />
      );
    }
    socket.emit("joinRoom", chatRoomId);
    await dispatch(updateChatMateData(chatMate));
  };
  // update redux store and reconnect user to room on page reload
  if (performance.getEntriesByType("navigation")[0].type === "reload") {
    tryReconnect();
    // updateChatMateInfo();
    // socket.emit(
    //   "joinRoom",
    //   generateChatRoomId(currentUserIndex, chatMateUserIndex)
    // );
    // log("Reloading...  Reconnecting user to the Room");
  }

  useEffect(() => {
    tryReconnect();
  }, [tryReconnect]);

  return (
    <Fragment>
      <div className={styles["chat__room__container"]}>
        <ChatInBox socket={socket} />
      </div>
    </Fragment>
  );
};

export default ChatRoom;
