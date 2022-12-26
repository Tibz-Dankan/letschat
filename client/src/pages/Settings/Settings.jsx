import React, { useState, Fragment, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";
import { updatePassword } from "../../store/actions/auth";
import { logOut } from "../../store/actions/auth";
import Loading from "../../components/UI/Loading/Loading";
import styles from "./Settings.module.scss";

const Settings = () => {
  const currentPasswordRef = useRef("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [newPasswordLength, setNewPasswordLength] = useState(0);
  const [confirmNewPasswordLength, setConfirmNewPasswordLength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const userId = useSelector((state) => state.auth.user.userId);
  const token = useSelector((state) => state.auth.token);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const correctPassWordLength =
    newPasswordLength != 0 && newPasswordLength >= 6;
  const wrongPassWordLength = newPasswordLength != 0 && newPasswordLength < 6;
  const correctPassWordMatch =
    confirmNewPasswordLength != 0 && newPassword === confirmNewPassword;
  const wrongPassWordMatch =
    confirmNewPasswordLength != 0 && newPassword !== confirmNewPassword;

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
    setNewPasswordLength(event.target.value.length);
  };
  const handleConfirmNewPasswordChange = (event) => {
    setConfirmNewPassword(event.target.value);
    setConfirmNewPasswordLength(event.target.value.length);
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

  const showHideCurrentPassword = () => {
    switch (showCurrentPassword) {
      case true:
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case false:
        setShowCurrentPassword(!showCurrentPassword);
        break;
      default:
    }
  };

  const logOutHandler = () => {
    setTimeout(async () => {
      await dispatch(logOut());
      navigate("/login", { replace: true });
    }, 5000);
  };

  const updatePasswordHandler = async (event) => {
    event.preventDefault();
    const currentPassword = currentPasswordRef.current.value;
    if (!currentPassword || !newPassword) return;
    try {
      setIsLoading(true);
      await dispatch(
        updatePassword(userId, currentPassword, newPassword, token)
      );
      setIsLoading(false);
      logOutHandler();
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <div className={styles["settings"]}>
        <div className={styles["settings__title"]}>
          <span className={styles["settings__title--text"]}>Settings</span>
        </div>
        <div className={styles["settings__note"]}>
          <span className={styles["settings__note--text"]}>
            Please note that when you successfully update your password, you
            will be automatically logged out
          </span>
        </div>
        <form
          className={styles["settings__form"]}
          onSubmit={(event) => updatePasswordHandler(event)}
        >
          <h4 className={styles["settings__form__heading"]}>
            Update your password
          </h4>

          <div className={styles["settings__form__input"]}>
            <input
              type={showCurrentPassword ? "text" : "password"}
              ref={currentPasswordRef}
              placeholder="Current password"
              className={styles["settings__form__input--field"]}
              required
            />
            {showCurrentPassword && (
              <span
                onClick={() => showHideCurrentPassword()}
                className={styles["eye-icon"]}
              >
                <IconContext.Provider value={{ size: "2rem" }}>
                  <AiOutlineEyeInvisible />
                </IconContext.Provider>
              </span>
            )}
            {!showCurrentPassword && (
              <span
                onClick={() => showHideCurrentPassword()}
                className={styles["eye-icon"]}
              >
                <IconContext.Provider value={{ size: "2rem" }}>
                  <AiOutlineEye />
                </IconContext.Provider>
              </span>
            )}
          </div>
          <div className={styles["settings__form__input"]}>
            {correctPassWordLength && (
              <span className={styles["settings__form__input--length-ok"]}>
                <IconContext.Provider value={{ size: "1.5rem" }}>
                  <AiOutlineCheck />
                </IconContext.Provider>
              </span>
            )}
            {wrongPassWordLength && (
              <span className={styles["settings__form__input--length-error"]}>
                Password must be at least 6 characters
              </span>
            )}
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New password"
              className={styles["settings__form__input--field"]}
              value={newPassword}
              onChange={(event) => handleNewPasswordChange(event)}
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
          <div className={styles["settings__form__input"]}>
            {correctPassWordMatch && (
              <span className={styles["settings__form__input--match-ok"]}>
                <IconContext.Provider value={{ size: "1.5rem" }}>
                  <AiOutlineCheck />
                </IconContext.Provider>
              </span>
            )}
            {wrongPassWordMatch && (
              <span className={styles["settings__form__input--match-error"]}>
                Passwords don't match
              </span>
            )}
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm new password"
              className={styles["settings__form__input--field"]}
              value={confirmNewPassword}
              onChange={(event) => handleConfirmNewPasswordChange(event)}
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
                Update
              </button>
            )}
            {isLoading && <Loading event={"on-form-submit"} />}
          </div>
        </form>
        <footer className={styles["settings__footer"]}>
          <span>
            LetsChat &copy; {new Date().getFullYear()}. All rights reserved
          </span>
        </footer>
      </div>
    </Fragment>
  );
};

export default Settings;
