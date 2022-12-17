import { chatActions } from "../store";
import { baseUrl } from "../store";
import { log } from "../../utils/consoleLog";

export const updateChatMessages = (mgsActionObject) => {
  return async (dispatch) => {
    await dispatch(chatActions.chatMessages(mgsActionObject));
  };
};

export const clearMessages = () => {
  return async (dispatch) => {
    await dispatch(chatActions.clearChatMessages());
  };
};
