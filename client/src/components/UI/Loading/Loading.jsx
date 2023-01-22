import React, { Fragment } from "react";
import styles from "./Loading.module.scss";

const Loading = (props) => {
  let onFormSubmit, OnLoadingUsers, OnLoadingMessages;
  let userSkeletons, messageSkeletons;

  if (props.event === "on-form-submit") {
    onFormSubmit = props.event;
  } else if (props.event === "on-loading-users") {
    OnLoadingUsers = props.event;
    userSkeletons = [1, 2, 3, 4, 5, 6, 7];
  } else if (props.event === "on-loading-messages") {
    OnLoadingMessages = props.event;
    messageSkeletons = [1, 2, 3];
  } else {
    onFormSubmit = props.event;
  }

  return (
    <Fragment>
      {onFormSubmit && <div className={styles["loading-spinner"]}></div>}
      {OnLoadingUsers &&
        userSkeletons.map((_, index) => {
          return (
            <div key={index} className={styles["user-skeleton"]}>
              <div className={styles["user-skeleton__content"]}>
                <div className={styles["image-placeholder"]}></div>
                <div className={styles["user__data-placeholder"]}></div>
              </div>
            </div>
          );
        })}
      {OnLoadingMessages && (
        <div className={styles["messages-skeleton"]}>
          {messageSkeletons.map((_, index) => {
            return (
              <section key={index} className={styles["messages"]}>
                <div className={styles["messages__recipient"]}>
                  <div
                    className={styles["messages__recipient--recipient"]}
                  ></div>
                </div>
                <div className={styles["messages__sender"]}>
                  <div className={styles["messages__sender--sender"]}></div>
                </div>
              </section>
            );
          })}
        </div>
      )}
    </Fragment>
  );
};

export default Loading;
