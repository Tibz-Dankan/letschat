import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth";
import usersSlice from "./reducers/users";
import chatSlice from "./reducers/chat";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    users: usersSlice.reducer,
    chat: chatSlice.reducer,
  },
});

let baseUrl;
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  baseUrl = "http://localhost:5000";
} else {
  baseUrl = "some production url here";
}

export { baseUrl };
export default store;
