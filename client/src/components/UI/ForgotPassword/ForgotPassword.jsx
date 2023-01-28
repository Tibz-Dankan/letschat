import React, { Fragment, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../../store/actions/auth";
import Loading from "../Loading/Loading";
import styles from "./ForgotPassword.module.scss";

const ForgotPassword = () => {
  const emailRef = useRef("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const submitEmailHandler = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    if (!email) return;
    try {
      setIsLoading(true);
      await dispatch(forgotPassword(email));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <div className={styles["forgot-password"]}>
        <div className={styles["forgot-password__logo"]}>
          <span className={styles["forgot-password__logo--text"]}>
            LetsChat
          </span>
        </div>
        <form
          className={styles["forgot-password__form"]}
          onSubmit={(event) => submitEmailHandler(event)}
        >
          <h4 className={styles["forgot-password__form__heading"]}>
            Provide your email to get password reset token
          </h4>
          <div className={styles["forgot-password__form__input"]}>
            <input
              type="email"
              ref={emailRef}
              placeholder="Email"
              className={styles["forgot-password__form__input--field"]}
              required
            />
          </div>
          <div className={styles["button__container"]}>
            {!isLoading && (
              <button type="submit" className={styles["form-btn"]}>
                Submit
              </button>
            )}
            {isLoading && <Loading event={"on-form-loading"} />}
          </div>
        </form>
        <footer className={styles["forgot-password__footer"]}>
          <span>
            LetsChat &copy; {new Date().getFullYear()}. All rights reserved
          </span>
        </footer>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
