import React, { Fragment, useRef, useState } from "react";
import Loading from "../../components/UI/Loading/Loading";
import { IconContext } from "react-icons";
import { IoPersonCircleSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../store/actions/auth";
import styles from "./Profile.module.scss";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const [email, setEmail] = useState(user.email);
  const [userName, setUserName] = useState(user.userName);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const showHideEditForm = () => {
    switch (showEditForm) {
      case true:
        setShowEditForm(!showEditForm);
        break;
      case false:
        setShowEditForm(!showEditForm);
        break;
      default:
        setShowEditForm(false);
    }
  };

  const updateProfileHandler = async (event) => {
    event.preventDefault();
    const userId = user.userId;
    if (!userId || !userName || !email) return;
    try {
      setIsLoading(true);
      // dispatch an action
      await dispatch(updateProfile(userId, userName, email, token));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <div className={styles["profile"]}>
        <div className={styles["profile__title"]}>
          <span className={styles["profile__title--text"]}>Profile</span>
        </div>
        <div className={styles["profile__user-data"]}>
          <div className={styles["profile__user-data__image"]}>
            {user.imageUrl && (
              <div className={styles["profile__user-data__image--image"]}>
                {/* Actual user image */}
              </div>
            )}
            {!user.imageUrl && (
              <span
                className={styles["profile__user-data__image--placeholder"]}
              >
                <IconContext.Provider
                  value={{
                    size: "4rem",
                  }}
                >
                  <IoPersonCircleSharp />
                </IconContext.Provider>
              </span>
            )}

            <div className={styles["profile__user-data__image--actions"]}>
              {user.imageUrl && (
                <button
                  className={
                    styles["profile__user-data__image--actions--upload-btn"]
                  }
                >
                  Update Image
                </button>
              )}
              {!user.imageUrl && (
                <button
                  className={
                    styles["profile__user-data__image--actions--upload-btn"]
                  }
                >
                  Add Image
                </button>
              )}
            </div>
          </div>
        </div>
        <form
          className={styles["profile__form"]}
          onSubmit={(event) => updateProfileHandler(event)}
        >
          <h4 className={styles["profile__form__heading"]}>
            Edit your Profile
          </h4>
          <div className={styles["profile__form__input"]}>
            <label>User name*</label>
            <input
              type="text"
              placeholder="User name"
              className={styles["profile__form__input--field"]}
              value={userName}
              onChange={(event) => handleUserNameChange(event)}
              required
            />
          </div>
          <div className={styles["profile__form__input"]}>
            <label>Email address*</label>
            <input
              type="email"
              placeholder="Email"
              className={styles["profile__form__input--field"]}
              value={email}
              onChange={(event) => handleEmailChange(event)}
              required
            />
          </div>
          <div className={styles["button__container"]}>
            {!isLoading && (
              <button type="submit" id="button" className={styles["form-btn"]}>
                Update
              </button>
            )}
            {isLoading && <Loading event={"on-form-submit"} />}
          </div>
        </form>
        <footer className={styles["profile__footer"]}>
          <span>
            LetsChat &copy; {new Date().getFullYear()}. All rights reserved
          </span>
        </footer>
      </div>
    </Fragment>
  );
};

export default Profile;
