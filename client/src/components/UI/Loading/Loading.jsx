import React, { Fragment } from "react";
import styles from "./Loading.module.scss";

const Loading = (props) => {
  let onFormSubmit, OnLoadingUsers, OnLoadingMessages;
  let userSkeletons;

  if (props.event === "on-form-submit") {
    onFormSubmit = props.event;
  } else if (props.event === "on-loading-users") {
    OnLoadingUsers = props.event;
    userSkeletons = [1, 2, 3, 4, 5, 6, 7];
  } else if (props.event === "on-loading-messages") {
    OnLoadingMessages = props.event;
  } else {
    onFormSubmit = props.event;
  }

  return (
    <Fragment>
      {onFormSubmit && <div className={styles["loading-spinner"]}></div>}
      {OnLoadingUsers &&
        userSkeletons.map((_, __) => {
          return (
            <div className={styles["user-skeleton"]}>
              <div className={styles["user-skeleton__content"]}>
                <div className={styles["image-placeholder"]}></div>
                <div className={styles["user__data-placeholder"]}></div>
              </div>
            </div>
          );
        })}
      {OnLoadingMessages && (
        <div className={styles["messages-skeleton"]}>
          Loading message Skeleton
        </div>
      )}
    </Fragment>
  );
};

export default Loading;
