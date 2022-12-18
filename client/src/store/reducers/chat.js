import { createSlice } from "@reduxjs/toolkit";

const theInitialState = {
  allChatMates: [],
  chatMate: {},
  messages: [],
};
export const chatSlice = createSlice({
  name: "chat",
  initialState: theInitialState,
  reducers: {
    updateAllChatMatesData(state, action) {
      state.allChatMates = action.payload.allChatMates;
    },
    clearAllChatMatesData(state) {
      state.allChatMates = [];
    },
    updateChatMateData(state, action) {
      state.chatMate = action.payload.chatMate;
    },
    clearChatMateData(state) {
      state.chatMate = {};
    },
    chatMessages(state, action) {
      state.messages = action.payload.messages;
    },
    clearChatMessages(state) {
      state.messages = [];
    },
  },
});

export default chatSlice;
