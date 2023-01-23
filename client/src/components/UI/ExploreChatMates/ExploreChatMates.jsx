import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getExploreChatMates } from "../../../store/actions/chat";
import ExploreList from "../ExploreList/ExploreList";
import Loading from "../Loading/Loading";
import styles from "./ExploreChatMates.module.scss";
const ExploreChatMates = ({ socket }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.userId);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const getAllChatMates = async () => {
      if (!userId) return;
      try {
        setIsLoading(true);
        await dispatch(getExploreChatMates(userId, token));
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error.message);
      }
    };
    getAllChatMates();
  }, [dispatch, token, userId]);
  return (
    <Fragment>
      <div className={styles["explore-chat-mates"]}>
        {isLoading && <Loading event={"on-loading-users"} />}
        <ExploreList socket={socket} />
      </div>
    </Fragment>
  );
};

export default ExploreChatMates;
