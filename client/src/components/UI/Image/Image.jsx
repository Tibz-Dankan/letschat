import React, { Fragment } from "react";
import LazyLoad from "react-lazyload";
import styles from "./Image.module.scss";

const Image = (props) => {
  return (
    <Fragment>
      <div className={styles["image"]}>
        <LazyLoad height={props.height}>
          <img src={props.src} alt={props.alt} className={props.class} />
        </LazyLoad>
      </div>
    </Fragment>
  );
};

export default Image;
