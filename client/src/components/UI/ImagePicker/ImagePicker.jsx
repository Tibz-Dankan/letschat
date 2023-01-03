import React, { useEffect, useState, Fragment } from "react";
import { useFilePicker } from "use-file-picker";
import { BsFillCloudArrowUpFill } from "react-icons/bs";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { FaWindowClose } from "react-icons/fa";
import { IconContext } from "react-icons";
import styles from "./ImagePicker.module.scss";

const ImagePicker = (props) => {
  const [photo, setPhoto] = useState("");

  const [openFileSelector, { filesContent }] = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: false,
    limitFilesConfig: { max: 1 },

    maxFileSize: 50,
  });
  useEffect(() => {
    filesContent.map((file) => {
      return setPhoto(file.content);
    });
  }, [filesContent]);

  const saveHandler = () => {
    props.onSave(photo);
  };

  return (
    <Fragment>
      <div className={styles["image-picker"]}>
        {!photo && (
          <button
            onClick={() => openFileSelector()}
            className={styles["image-picker__btn"]}
          >
            <span className={styles["image-picker__btn--icon"]}>
              <IconContext.Provider value={{ size: "2rem" }}>
                <BsFillCloudArrowUpFill />
              </IconContext.Provider>
            </span>
            <span className={styles["image-picker--label"]}>Select Photo</span>
          </button>
        )}
        {photo && (
          <div className={styles["image-picker__preview"]}>
            <img
              className={styles["image-picker__preview--photo"]}
              src={photo}
              alt="user-photo"
            />
            <div className={styles["image-picker__preview__actions"]}>
              <button
                onClick={() => setPhoto("")}
                className={styles["image-picker__preview__actions__btn"]}
              >
                <span
                  className={
                    styles["image-picker__preview__actions__btn--icon"]
                  }
                >
                  <IconContext.Provider value={{ size: "2rem" }}>
                    <FaWindowClose />
                  </IconContext.Provider>
                </span>
                <span
                  className={
                    styles["image-picker__preview__actions__btn--label"]
                  }
                >
                  Cancel
                </span>
              </button>
              <button
                onClick={() => saveHandler()}
                className={styles["image-picker__preview__actions__btn"]}
              >
                <span
                  className={
                    styles["image-picker__preview__actions__btn--icon"]
                  }
                >
                  <IconContext.Provider value={{ size: "2rem" }}>
                    <IoCheckmarkDoneSharp />
                  </IconContext.Provider>
                </span>
                <span
                  className={
                    styles["image-picker__preview__actions__btn--label"]
                  }
                >
                  Done
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default ImagePicker;
