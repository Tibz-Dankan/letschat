/* eslint-disable no-unused-vars */
import { baseUrl } from "../appStore";
import axios from "axios";
import { usersActions } from "../reducers/users";
import { log } from "../../utils/consoleLog";

export const getUsers = (user_id) => {
  return async (dispatch) => {
    const response = await axios.get(`${baseUrl}/chat/${user_id}`); // consider adding to this request
    log(response);
    if (response.data.errorMessage) {
      //   Dispatch an alert msg in the model when user data is not fetched
      throw new Error(response.data.errorMessage);
    }
    // data the data in the state here
    console.log(response.data);
    // update user info in the global state
    await dispatch(usersActions.registeredUsers({ users: response.data }));
  };
};

const saveChatWithUserToStorage = (userObj) => {
  localStorage.setItem("chatWithUser", JSON.stringify(userObj));
};

export const updateChatWithUserData = (userObject) => {
  return async (dispatch) => {
    await dispatch(usersActions.chatWithUser({ chatWithUser: userObject }));
    saveChatWithUserToStorage(userObject);
  };
};
