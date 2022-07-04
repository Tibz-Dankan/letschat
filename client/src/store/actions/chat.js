import { chatActions } from "../reducers/chat";
import axios from "axios";
import { baseUrl } from "../appStore";
import { log } from "../../utils/consoleLog";

export const getChatMessages = (ChatRoomId) => {
  return async (dispatch) => {
    const response = await axios.get(`${baseUrl}/chat-messages/${ChatRoomId}`);
    log(response);
    if (response.data.errorMessage) {
      //   Dispatch an alert msg in the model
      throw new Error(response.data.errorMessage);
    }
    await dispatch(
      chatActions.chatMessages({
        messages: response.data.data,
      })
    );
  };
};
