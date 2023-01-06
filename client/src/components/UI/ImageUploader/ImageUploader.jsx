import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IconContext } from "react-icons";
import { BsFillCloudArrowUpFill } from "react-icons/bs";
import { FaWindowClose } from "react-icons/fa";
import { uploadPhoto } from "../../../store/actions/auth";
import Modal from "../Modal/Modal";
import ImagePicker from "../ImagePicker/ImagePicker";
import Loading from "../Loading/Loading";
import styles from "./ImageUploader.module.scss";

const ImageUploader = (props) => {
  const [photo, setPhoto] = useState("");
  const [isDoneSelect, setIsDoneSelect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.user.userId);
  const dispatch = useDispatch();
  const [isModalClosed, setIsModalClosed] = useState(false);

  const onPhotoSelect = (selectedPhoto) => {
    setPhoto(selectedPhoto);
    setIsDoneSelect(true);
  };

  const closeUploadForm = () => {
    setIsDoneSelect(false);
    setPhoto("");
  };

  const uploadPhotoHandler = async (event) => {
    event.preventDefault();
    if (!photo || !userId) return;
    try {
      setIsLoading(true);
      await dispatch(uploadPhoto(userId, photo, token));
      setIsLoading(false);
      setPhoto("");
      setIsModalClosed(true);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    closeUploadForm();
  }, [isModalClosed]);

  return (
    <Fragment>
      <div className={styles["image-uploader"]}>
        <Modal open={props.open} onClose={isModalClosed}>
          {!isDoneSelect && <ImagePicker onSave={onPhotoSelect} />}
          {isDoneSelect && (
            <div className={styles["image-uploader__group"]}>
              <img
                className={styles["image-uploader__group--photo"]}
                src={photo}
                alt="user-photo"
              />
              <span
                onClick={() => closeUploadForm()}
                className={styles["image-uploader__group--close"]}
              >
                <IconContext.Provider value={{ size: "2rem" }}>
                  <FaWindowClose />
                </IconContext.Provider>
              </span>
              <form
                onSubmit={(event) => uploadPhotoHandler(event)}
                className={styles["image-uploader__group__form"]}
              >
                {!isLoading && (
                  <button
                    type="submit"
                    className={styles["image-uploader__group__form__btn"]}
                  >
                    <span
                      className={
                        styles["image-uploader__group__form__btn--icon"]
                      }
                    >
                      <IconContext.Provider value={{ size: "2rem" }}>
                        <BsFillCloudArrowUpFill />
                      </IconContext.Provider>
                    </span>
                    <span
                      className={
                        styles["image-uploader__group__form__btn--title"]
                      }
                    >
                      Upload Photo
                    </span>
                  </button>
                )}
                {isLoading && <Loading event={"on-form-submit"} />}
              </form>
            </div>
          )}
        </Modal>
      </div>
    </Fragment>
  );
};

export default ImageUploader;
