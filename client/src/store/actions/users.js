/* eslint-disable no-unused-vars */
import { baseUrl } from "../store";
import { usersActions } from "../store";
import { log } from "../../utils/consoleLog";

export const getUsers = (user_id, token) => {
  return async (dispatch) => {
    const response = await fetch(`${baseUrl}/api/chats/users/${user_id}`, {
      method: "GET",
      headers: new Headers({
        Authorization: "Bearer " + token,
      }),
    });

    log(response);
    if (!response.ok) {
      const error = await response.json();
      console.log("error");
      console.log(error);
      // dispatch message here
      throw new Error(error.message);
    }
    const data = await response.json();
    console.log("Response data");
    console.log(data);
    // update user info in the global state
    await dispatch(usersActions.registeredUsers({ users: data }));
  };
};

const saveChatWithUserToStorage = (userObj) => {
  localStorage.setItem("chatWithUser", JSON.stringify(userObj));
};
const clearLocalStorage = () => {
  localStorage.removeItem("chatWithUser");
};

export const updateChatWithUserData = (userObject) => {
  return async (dispatch) => {
    await dispatch(usersActions.chatWithUser({ chatWithUser: userObject }));
    saveChatWithUserToStorage(userObject);
  };
};

export const clearChatRoomAndLocalStorage = () => {
  return async (dispatch) => {
    await dispatch(usersActions.clearUserData());
    clearLocalStorage();
  };
};
