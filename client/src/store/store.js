import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth";
import usersSlice from "./reducers/users";
import chatSlice from "./reducers/chat";
import notificationSlice from "./reducers/notification";
import sideBarSlice from "./reducers/sideBar";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    users: usersSlice.reducer,
    chat: chatSlice.reducer,
    notification: notificationSlice.reducer,
    sidebar: sideBarSlice.reducer,
  },
});

let baseUrl;
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  baseUrl = "http://localhost:5000";
} else {
  baseUrl = "https://letschat-backend.onrender.com";
}

export { baseUrl };
export default store;
export const authActions = authSlice.actions;
export const usersActions = usersSlice.actions;
export const chatActions = chatSlice.actions;
export const notificationActions = notificationSlice.actions;
export const sideBarActions = sideBarSlice.actions;
