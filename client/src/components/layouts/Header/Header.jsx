import React, { Fragment } from "react";
import styles from "./Header.module.scss";

const Header = () => {
  // TODO: Dynamic data rendering basing on the title
  // TODO: convert each title to lowercase using javascript
  return (
    <Fragment>
      <div className={styles["header"]}>Header</div>
    </Fragment>
  );
};

export default Header;
