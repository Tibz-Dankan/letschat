import { baseUrl } from "../store";
import { authActions } from "../store";
import { notificationActions } from "../store";
import { log } from "../../utils/consoleLog";

export const logOut = () => {
  localStorage.removeItem("userData");
  return authActions.logout();
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

    console.log(response);

    if (!response.ok) {
      const error = await response.json();
      console.log("error ");
      console.log(error);
      // dispatch message here
    }

    const data = await response.json();
    console.log("response data");
    console.log(data);

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
        notificationMsg: "Sign up successful",
      })
    );
  };
};
