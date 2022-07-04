import React, { Fragment, useEffect, useRef } from "react";
import { usersActions } from "../../store/reducers/users";
import { useSelector, useDispatch } from "react-redux";
import { log } from "../../utils/consoleLog";
import { generateChatRoomId } from "../../utils/generateChatRoomId";
import { getChatMessages } from "../../store/actions/chat";
import ChatMessages from "../../components/UI/ChatMessages/ChatMessages";
import styles from "./ChatRoom.module.scss";

const ChatRoom = ({ socket }) => {
  const dispatch = useDispatch();
  const effectRan = useRef(false);

  const chatWithUserId = useSelector(
    (state) => state.users.chatWithUser.user_id
  );
  const currentUserId = useSelector((state) => state.auth.user.userId);

  // update redux store and reconnect user to room on page reload
  if (performance.getEntriesByType("navigation")[0].type === "reload") {
    dispatch(
      usersActions.chatWithUser({
        chatWithUser: JSON.parse(localStorage.getItem("chatWithUser")),
      })
    );
    socket.emit("joinRoom", generateChatRoomId(currentUserId, chatWithUserId));
    log("Reloading...  Reconnecting user to the Room");
  }

  const getMessages = async () => {
    const ChatRoomId = generateChatRoomId(currentUserId, chatWithUserId);
    try {
      await dispatch(getChatMessages(ChatRoomId));
    } catch (error) {
      log("Error msg:" + error.message);
    }
  };

  // Get chat messages on first render and on reload
  useEffect(() => {
    if (effectRan.current === false) {
      getMessages();
      return () => {
        effectRan.current = true;
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <div className={styles["chat__room__container"]}>
        <ChatMessages socket={socket} />
      </div>
    </Fragment>
  );
};

export default ChatRoom;
