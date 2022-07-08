import { createSlice } from "@reduxjs/toolkit";

const theInitialState = {
  value: false,
};
export const notificationSlice = createSlice({
  name: "notification",
  initialState: theInitialState,
  reducers: {
    showNotification(state) {
      state.value = !state.value;
    },
    hideNotification(state) {
      state.value = !state.value;
    },
  },
});

export const notificationActions = notificationSlice.actions;
export default notificationSlice;
