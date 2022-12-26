import React, { Fragment } from "react";
import styles from "./Loading.module.scss";

const Loading = (props) => {
  let onFormSubmit, OnLoadingUsers, OnLoadingMessages;
  if (props.event === "on-form-submit") {
    onFormSubmit = props.event;
  } else if (props.event === "on-loading-users") {
    OnLoadingUsers = props.event;
  } else if (props.event === "on-loading-messages") {
    OnLoadingMessages = props.event;
  } else {
    onFormSubmit = props.event;
  }

  return (
    <Fragment>
      {onFormSubmit && <div className={styles["loading-spinner"]}></div>}
      {OnLoadingUsers && (
        <div className={styles["users-skeleton"]}>Loading user skeleton</div>
      )}
      {OnLoadingMessages && (
        <div className={styles["messages-skeleton"]}>
          Loading message Skeleton
        </div>
      )}
    </Fragment>
  );
};

export default Loading;
