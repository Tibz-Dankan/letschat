import React, { Fragment } from "react";
import styles from "./LogInForm.module.scss";

const LogInForm = () => {
  return (
    <Fragment>
      <form className={styles["login-form"]}>
        <h5>Am the login form</h5>
      </form>
    </Fragment>
  );
};

export default LogInForm;
