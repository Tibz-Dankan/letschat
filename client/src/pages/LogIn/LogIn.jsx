import React, { Fragment, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { login } from "../../store/actions/auth";
import Loading from "../../components/UI/Loading/Loading";
import styles from "./LogIn.module.scss";

const LogIn = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate();
  const dispatch = useDispatch();

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

  const handleLogInSubmit = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (!email || !password) return;
    try {
      setIsLoading(true);
      await dispatch(login(email, password));
      setIsLoading(false);
      navigate("/", { replace: true });
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <div className={styles["login"]}>
        <div className={styles["login__logo"]}>
          <span className={styles["login__logo--text"]}>LetsChat</span>
        </div>
        <form
          className={styles["login__form"]}
          onSubmit={(event) => handleLogInSubmit(event)}
        >
          <h4 className={styles["login__form__heading"]}>
            Log into your account
          </h4>
          <div className={styles["login__form__input"]}>
            <input
              type="email"
              ref={emailRef}
              placeholder="Email"
              className={styles["login__form__input--field"]}
              required
            />
          </div>
          <div className={styles["forgot__password__container"]}>
            <span>
              <Link to="/forgot-password" className={styles["link"]}>
                Forgot Password?
              </Link>
            </span>
          </div>
          <div className={styles["login__form__input"]}>
            <input
              type={showPassword ? "text" : "password"}
              ref={passwordRef}
              placeholder="Password"
              className={styles["login__form__input--field"]}
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
              <button type="submit" className={styles["form-btn"]}>
                Log In
              </button>
            )}
            {isLoading && <Loading event={"on-form-loading"} />}
          </div>
          <div className={styles["dont__have___account__container"]}>
            <span className={styles["dont__have__account"]}>
              <Link to="/signup" className={styles["link"]}>
                Don't have an account
              </Link>
            </span>
          </div>
        </form>
        <footer className={styles["login__footer"]}>
          <span>
            LetsChat &copy; {new Date().getFullYear()}. All rights reserved
          </span>
        </footer>
      </div>
    </Fragment>
  );
};

export default LogIn;
