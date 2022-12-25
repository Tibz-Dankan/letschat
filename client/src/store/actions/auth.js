import { baseUrl } from "../store";
import { authActions } from "../store";
import { notificationActions } from "../store";
import { log } from "../../utils/consoleLog";

export const logOut = () => {
  localStorage.clear();
  return async (dispatch) => {
    await dispatch(authActions.logout());
  };
};

const saveDataToStorage = (user, token) => {
  localStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      user: user,
    })
  );
};

export const authenticate = (user, token) => {
  return async (dispatch) => {
    await dispatch(authActions.authenticate({ token: token, user: user }));
    //  TODO: dispatch action to update expiry time to the logout timer
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(`${baseUrl}/api/users/login`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      dispatch(
        notificationActions.showCardNotification({
          type: "error",
          message: error.message,
        })
      );
      setTimeout(() => {
        dispatch(notificationActions.hideCardNotification());
      }, [5000]);
      throw new Error(error.message);
    }

    const data = await response.json();

    // get the expiry time  // to be done later
    await dispatch(
      authActions.authenticate({
        token: data.token,
        user: data.user,
      })
    );
    saveDataToStorage(data.user, data.token);
  };
};

export const signup = (userName, email, password) => {
  return async (dispatch) => {
    const response = await fetch(`${baseUrl}/api/users/signup`, {
      method: "POST",
      body: JSON.stringify({
        userName: userName,
        email,
        password,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });

    log(response);

    if (!response.ok) {
      const error = await response.json();
      console.log("error message");
      console.log(error);
      throw new Error(error.message);
    }

    await dispatch(
      notificationActions.showNotification({
        notificationMsg: "Sign up successful, please login",
      })
    );
  };
};
