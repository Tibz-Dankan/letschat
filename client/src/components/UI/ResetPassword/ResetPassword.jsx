import React, { useState, Fragment } from "react";
import { useDispatch } from "react-redux";
import { IconContext } from "react-icons";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { resetPassword } from "../../../store/actions/auth";
import Loading from "../Loading/Loading";
import styles from "./ResetPassword.module.scss";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordLength, setPasswordLength] = useState(0);
  const [confirmPasswordLength, setConfirmPasswordLength] = useState(0);
  const dispatch = useDispatch();

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
    setPasswordLength(event.target.value.length);
  };

  const correctPassWordLength = passwordLength != 0 && passwordLength >= 6;
  const wrongPassWordLength = passwordLength != 0 && passwordLength < 6;
  const correctPassWordMatch =
    confirmPasswordLength != 0 && password === confirmPassword;
  const wrongPassWordMatch =
    confirmPasswordLength != 0 && password !== confirmPassword;

  const confirmPasswordChangeHandler = (event) => {
    setConfirmPassword(event.target.value);
    setConfirmPasswordLength(event.target.value.length);
  };

  const showHidePassword = () => {
    switch (showPassword) {
      case true:
        setShowPassword(!showPassword);
        break;
      case false:
        setShowPassword(!showPassword);
        break;
      default:
    }
  };

  const { passwordResetToken } = useParams();

  const signUpSubmitHandler = async (event) => {
    event.preventDefault();
    if (!password || password < 6 || password !== confirmPassword) {
      return;
    }
    try {
      setIsLoading(true);
      await dispatch(resetPassword(password, passwordResetToken));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <div className={styles["signup"]}>
        <div className={styles["signup__logo"]}>
          <span className={styles["signup__logo--text"]}>LetsChat</span>
        </div>
        <form
          className={styles["signup__form"]}
          onSubmit={(event) => signUpSubmitHandler(event)}
        >
          <h4 className={styles["signup__form__heading"]}>
            Provide new password for your account
          </h4>
          <div className={styles["signup__form__input"]}>
            {correctPassWordLength && (
              <span className={styles["signup__form__input--length-ok"]}>
                <IconContext.Provider value={{ size: "1.5rem" }}>
                  <AiOutlineCheck />
                </IconContext.Provider>
              </span>
            )}
            {wrongPassWordLength && (
              <span className={styles["signup__form__input--length-error"]}>
                Password must be at least 6 characters
              </span>
            )}
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={styles["signup__form__input--field"]}
              value={password}
              onChange={(event) => passwordChangeHandler(event)}
              required
            />
            {showPassword && (
              <span
                onClick={() => showHidePassword()}
                className={styles["eye-icon"]}
              >
                <IconContext.Provider value={{ size: "2rem" }}>
                  <AiOutlineEyeInvisible />
                </IconContext.Provider>
              </span>
            )}
            {!showPassword && (
              <span
                onClick={() => showHidePassword()}
                className={styles["eye-icon"]}
              >
                <IconContext.Provider value={{ size: "2rem" }}>
                  <AiOutlineEye />
                </IconContext.Provider>
              </span>
            )}
          </div>
          <div className={styles["signup__form__input"]}>
            {correctPassWordMatch && (
              <span className={styles["signup__form__input--match-ok"]}>
                <IconContext.Provider value={{ size: "1.5rem" }}>
                  <AiOutlineCheck />
                </IconContext.Provider>
              </span>
            )}
            {wrongPassWordMatch && (
              <span className={styles["signup__form__input--match-error"]}>
                Passwords don't match
              </span>
            )}
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm password"
              className={styles["signup__form__input--field"]}
              value={confirmPassword}
              onChange={(event) => confirmPasswordChangeHandler(event)}
              required
            />
            {showPassword && (
              <span
                onClick={() => showHidePassword()}
                className={styles["eye-icon"]}
              >
                <IconContext.Provider value={{ size: "2rem" }}>
                  <AiOutlineEyeInvisible />
                </IconContext.Provider>
              </span>
            )}
            {!showPassword && (
              <span
                onClick={() => showHidePassword()}
                className={styles["eye-icon"]}
              >
                <IconContext.Provider value={{ size: "2rem" }}>
                  <AiOutlineEye />
                </IconContext.Provider>
              </span>
            )}
          </div>
          <div className={styles["button__container"]}>
            {!isLoading && (
              <button type="submit" id="button" className={styles["form-btn"]}>
                Reset
              </button>
            )}
            {isLoading && <Loading event={"on-form-submit"} />}
          </div>
        </form>

        <footer className={styles["signup__footer"]}>
          <span>
            LetsChat &copy; {new Date().getFullYear()}. All rights reserved
          </span>
        </footer>
      </div>
    </Fragment>
  );
};

export default ResetPassword;
