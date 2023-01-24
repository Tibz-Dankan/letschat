import { chatActions } from "../store";
import { notificationActions } from "../store";
import { baseUrl } from "../store";
import { log } from "../../utils/consoleLog";

export const updateAllChatMatesData = (chatMatesArr) => {
  return async (dispatch) => {
    await dispatch(
      chatActions.updateAllChatMatesData({ allChatMates: chatMatesArr })
    );
  };
};

export const clearAllChatMatesData = () => {
  return async (dispatch) => {
    await dispatch(chatActions.clearAllChatMatesData());
  };
};

export const updateChatMateData = (chatMateObj) => {
  return async (dispatch) => {
    await dispatch(chatActions.updateChatMateData({ chatMate: chatMateObj }));
  };
};

export const clearChatMateData = () => {
  return async (dispatch) => {
    await dispatch(chatActions.clearChatMateData());
  };
};

export const updateChatMessages = (mgsActionObject) => {
  return async (dispatch) => {
    await dispatch(chatActions.chatMessages({ messages: mgsActionObject }));
  };
};

export const clearMessages = () => {
  return async (dispatch) => {
    await dispatch(chatActions.clearChatMessages());
  };
};

export const getChatMates = (userId, token) => {
  return async (dispatch) => {
    const response = await fetch(`${baseUrl}/api/chats/chat-mates/${userId}`, {
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
    await dispatch(chatActions.updateAllChatMatesData({ allChatMates: data }));
  };
};

export const getChatMessages = async (chatRoomId, token) => {
  const response = await fetch(
    `${baseUrl}/api/chats/chat-messages/${chatRoomId}`,
    {
      method: "GET",
      headers: new Headers({
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      }),
    }
  );
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  const data = await response.json();
  console.log("data in the fetching function");
  console.log(data.data);
  return data.data;
};

export const getExploreChatMates = (userId, token) => {
  return async (dispatch) => {
    const response = await fetch(
      `${baseUrl}/api/chats/explore-chat-mates/${userId}`,
      {
        method: "GET",
        headers: new Headers({
          Authorization: "Bearer " + token,
        }),
      }
    );

    console.log("Explore chatMates response");
    console.log(response);
    if (!response.ok) {
      const error = await response.json();
      console.log("error");
      console.log(error);

      throw new Error(error.message);
    }
    const data = await response.json();
    console.log("Response data");
    console.log(data);
    await dispatch(
      chatActions.updateExploreChatMates({ exploreChatMates: data })
    );
  };
};
