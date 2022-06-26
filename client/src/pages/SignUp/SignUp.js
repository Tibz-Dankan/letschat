import React, { useState, Fragment } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FadeLoader } from "react-spinners";
import { signup } from "../../store/actions/auth";
import { disableEnableButton } from "../../utils/disableEnableButton";
import styles from "./SignUp.module.scss";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
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

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();
    if (!userName || !email || !password) return;
    try {
      setIsLoading(true);
      disableEnableButton("button", true);
      await dispatch(signup(userName, email, password));
      setIsLoading(false);
      disableEnableButton("button", false);
      // dispatch an alert msg here
      navigate("/", { replace: true });
    } catch (error) {
      setIsLoading(false);
      disableEnableButton("button", false);
      console.log("error msg: ", error.message);
      // throw new Error(error.message);
      // console.log(new Error(error.message));
    }
  };

  return (
    <Fragment>
      <div className={styles["signup__container"]}>
        <div className={styles["fade__loader__container"]}>
          {isLoading && <FadeLoader size={5} />}
        </div>
        <form
          className={styles["signup__form"]}
          onSubmit={(event) => handleSignUpSubmit(event)}
        >
          <p className={styles["signup__form__heading"]}>Sign Up</p>
          <div className={styles["signup__form__input__container"]}>
            <input
              type="text"
              placeholder="UserName"
              className={styles["signup__form__input"]}
              value={userName}
              onChange={(event) => handleUserNameChange(event)}
              required
            />
          </div>
          <div className={styles["signup__form__input__container"]}>
            <input
              type="email"
              placeholder="Email"
              className={styles["signup__form__input"]}
              value={email}
              onChange={(event) => handleEmailChange(event)}
              required
            />
          </div>
          <div className={styles["signup__form__input__container"]}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={styles["signup__form__input"]}
              value={password}
              onChange={(event) => handlePasswordChange(event)}
              required
            />
            {showPassword && (
              <IconContext.Provider
                value={{ color: "black", className: "global-class-name" }}
              >
                <div onClick={() => showHidePassword()}>
                  <AiOutlineEyeInvisible />
                </div>
              </IconContext.Provider>
            )}
            {!showPassword && (
              <IconContext.Provider
                value={{ color: "black", className: "global-class-name" }}
              >
                <div onClick={() => showHidePassword()}>
                  <AiOutlineEye />
                </div>
              </IconContext.Provider>
            )}
          </div>
          <div className={styles["signup__form__input__container"]}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={styles["signup__form__input"]}
              value={confirmPassword}
              onChange={(event) => handleConfirmPasswordChange(event)}
              required
            />
            {showPassword && (
              <IconContext.Provider
                value={{ color: "black", className: "global-class-name" }}
              >
                <div onClick={() => showHidePassword()}>
                  <AiOutlineEyeInvisible />
                </div>
              </IconContext.Provider>
            )}
            {!showPassword && (
              <IconContext.Provider
                value={{ color: "black", className: "global-class-name" }}
              >
                <div onClick={() => showHidePassword()}>
                  <AiOutlineEye />
                </div>
              </IconContext.Provider>
            )}
          </div>
          <button
            type="submit"
            id="button"
            className={styles["signup__form__btn"]}
            // disabled="disabled" //some testing here
          >
            Sign Up
          </button>
        </form>
        <div className={styles["have___account__container"]}>
          <p className={styles["have__account"]}>
            Already have account <Link to="/">Login</Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default SignUp;
