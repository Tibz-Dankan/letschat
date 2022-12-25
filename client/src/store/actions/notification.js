import { notificationActions } from "../store";

export const showCardNotification = (type, message) => {
  return async (dispatch) => {
    await dispatch(
      notificationActions.showCardNotification({
        type: type,
        message: message,
      })
    );
  };
};

export const hideCardNotification = () => {
  return async (dispatch) => {
    await dispatch(notificationActions.hideCardNotification());
  };
};
