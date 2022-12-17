import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store";
import "./index.css";
import App from "./App";

// const isLoggedIn = localStorage.getItem("userData");
// const dispatch = useDispatch();

// if (
//   performance.getEntriesByType("navigation")[0].type === "reload" &&
//   isLoggedIn
// ) {
//   //  dispatch actions to update the redux store
//   console.log("the navigation type is reload");
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
