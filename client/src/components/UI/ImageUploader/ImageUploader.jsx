import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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

  const onPhotoSelect = (selectedPhoto) => {
    setPhoto(selectedPhoto);
    setIsDoneSelect(true);
  };

  const uploadPhotoHandler = async (event) => {
    event.preventDefault();
    if (!photo || !userId) return;
    try {
      setIsLoading(true);
      await dispatch(uploadPhoto(userId, photo, token));
      setIsLoading(false);
      setPhoto("");
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <div className={styles["image-uploader"]}>
        <Modal open={props.open}>
          {!isDoneSelect && <ImagePicker onSave={onPhotoSelect} />}
          {isDoneSelect && (
            // TODO: image here
            <form
              onSubmit={(event) => uploadPhotoHandler(event)}
              className={styles["image-uploader__form"]}
            >
              {!isLoading && (
                <button
                  type="submit"
                  className={styles["image-uploader__form--btn"]}
                >
                  Upload Photo
                </button>
              )}
              {isLoading && <Loading event={"on-form-submit"} />}
            </form>
          )}
        </Modal>
      </div>
    </Fragment>
  );
};

export default ImageUploader;
