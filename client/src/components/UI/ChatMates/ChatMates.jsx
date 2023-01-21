import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatList from "../ChatList/ChatList";
import styles from "./ChatMates.module.scss";
import { getChatMates } from "../../../store/actions/chat";
import { log } from "../../../utils/consoleLog";

const ChatMates = ({ socket }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.userId);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const getAllChatMates = async () => {
      if (!userId) return;
      try {
        setIsLoading(true);
        await dispatch(getChatMates(userId, token));
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        log(error.message);
      }
    };
    getAllChatMates();
  }, [dispatch, token, userId]);

  return (
    <Fragment>
      <div className={styles["chat-mates"]}>
        <ChatList socket={socket} isLoading={isLoading} />
      </div>
    </Fragment>
  );
};

export default ChatMates;
