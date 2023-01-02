import React, { Fragment } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import styles from "./Image.module.scss";

const Image = (props) => {
  return (
    <Fragment>
      <div className={styles["image"]}>
        <LazyLoadImage
          alt={props.alt}
          effect="blur"
          src={props.src}
          wrapperClassName={props.class}
        />
      </div>
    </Fragment>
  );
};

export default Image;
