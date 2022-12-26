import React, { useState, Fragment, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";
import { signup } from "../../store/actions/auth";
import Loading from "../../components/UI/Loading/Loading";
import styles from "./SignUp.module.scss";

const SignUp = () => {
  const userNameRef = useRef("");
  const emailRef = useRef("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordLength, setPasswordLength] = useState(0);
  const [confirmPasswordLength, setConfirmPasswordLength] = useState(0);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordLength(event.target.value.length);
  };

  const correctPassWordLength = passwordLength != 0 && passwordLength >= 6;
  const wrongPassWordLength = passwordLength != 0 && passwordLength < 6;
  const correctPassWordMatch =
    confirmPasswordLength != 0 && password === confirmPassword;
  const wrongPassWordMatch =
    confirmPasswordLength != 0 && password !== confirmPassword;

  const handleConfirmPasswordChange = (event) => {
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

  const navigateToLogin = () => {
    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 5000);
  };

  const signUpSubmitHandler = async (event) => {
    event.preventDefault();
    const userName = userNameRef.current.value;
    const email = emailRef.current.value;
    if (
      !userName ||
      !email ||
      !password ||
      password < 6 ||
      password !== confirmPassword
    ) {
      return;
    }
    try {
      setIsLoading(true);
      await dispatch(signup(userName, email, password));
      setIsLoading(false);
      navigateToLogin();
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
            Sign Up for an account
          </h4>
          <div className={styles["signup__form__input"]}>
            <input
              type="text"
              ref={userNameRef}
              placeholder="User name"
              className={styles["signup__form__input--field"]}
              required
            />
          </div>
          <div className={styles["signup__form__input"]}>
            <input
              type="email"
              ref={emailRef}
              placeholder="Email"
              className={styles["signup__form__input--field"]}
              required
            />
          </div>
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
              onChange={(event) => handlePasswordChange(event)}
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
              onChange={(event) => handleConfirmPasswordChange(event)}
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
                Sign Up
              </button>
            )}
            {isLoading && <Loading event={"on-form-submit"} />}
          </div>
          <div className={styles["have__account__container"]}>
            <span className={styles["have__account"]}>
              <Link to="/login" className={styles["link"]}>
                Already have an account?
              </Link>
            </span>
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

export default SignUp;
