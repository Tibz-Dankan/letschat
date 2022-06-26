/* eslint-disable no-unused-vars */
import { baseUrl } from "../appStore";
import axios from "axios";
import { authenticate, logout } from "../reducers/auth";

// export const logOut = () => {
//   clearLogoutTimer();  // removing the logout timer
//   localStorage.removeItem("userData"); // save data to storage
//   return authActions.logout(); // return the logout action
// };

// export const authenticate = (user, token, devices, expiryTime) => {
//   return async (dispatch) => {
//     await dispatch(authActions.authenticate({ token: token, user: user }));
//     dispatch(setLogoutTimer(expiryTime));
//   };
// };
// const setLogoutTimer = (expirationTime) => {
//   return (dispatch) => {
//     timer = setTimeout(() => {
//       dispatch(logout());
//     }, expirationTime);
//   };
// };
// const clearLogoutTimer = () => {
//   if (timer) {
//     clearTimeout(timer);
//   }
// };

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
    const response = await axios.post(`${baseUrl}/login`, {
      email: email,
      password: password,
    });
    console.log(response);
    if (response.data.errorMessage) {
      //   Dispatch an alert msg in the model
      throw new Error(response.data.errorMessage);
    }
    // get the expiry time  // to be done later
    // dispatch authenticate action
    // dispatch an alert msg  // to be done later
    // save data to local storage
    saveDataToStorage(response.data.user, response.data.token);
  };
};

export const signup = (userName, email, password) => {
  return async (dispatch) => {
    const response = await axios.post(`${baseUrl}/signup`, {
      userName: userName,
      email: email,
      password: password,
    });
    console.log(response);
    if (response.data.errorMessage) {
      // alert msg with the user via a modal
      throw new Error(response.data.errorMessage);
    }
    if (response.data.status === "success") {
      // dispatch an alert msg via a  modal
    }
  };
};
