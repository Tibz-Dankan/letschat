import { notificationActions } from "../store";

export const hideNotificationModal = () => {
  return async (dispatch) => {
    await dispatch(notificationActions.hideNotification());
  };
};
