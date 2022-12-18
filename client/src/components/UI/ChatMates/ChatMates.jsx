/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FadeLoader } from "react-spinners";
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
  }, []);

  return (
    <Fragment>
      <div className={styles["users__container"]}>
        {isLoading && (
          // TODO: build custom loading spinner and should be a component
          <div className={styles["fade__loader__container"]}>
            <FadeLoader className={styles["fade__loader"]} />
          </div>
        )}
        <ChatList socket={socket} />
      </div>
    </Fragment>
  );
};

export default ChatMates;
