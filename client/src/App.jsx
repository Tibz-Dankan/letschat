import React, { Fragment } from "react";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "./store/actions/auth";
import { io } from "socket.io-client";
import { baseUrl } from "./store/store";
import Home from "./pages/Home/Home";
import Chat from "./pages/Chat/Chat";
import About from "./pages/About/About";
import SignUp from "./pages/SignUp/SignUp";
import LogIn from "./pages/LogIn/LogIn";
import Header from "./components/layouts/Header/Header";
import SideBar from "./components/layouts/SideBar/SideBar";
import ChatRoom from "./pages/ChatRoom/ChatRoom";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";
import Explore from "./pages/Explore/Explore";
import Notification from "./components/UI/Notification/Notification";
import { hideCardNotification } from "./store/actions/notification";
import "./App.scss";

function App() {
  const dispatch = useDispatch();
  const socket = io.connect(baseUrl);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const notification = useSelector((state) => state.notification);

  const closeCardHandler = () => {
    dispatch(hideCardNotification());
  };

  useEffect(() => {
    const tryLogin = async () => {
      const userData = localStorage.getItem("userData");
      const parsedData = JSON.parse(userData);
      if (!userData) {
        console.log("no data found");
        return <Route path="/" element={<Navigate to="/login" replace />} />;
      }
      const { user, token } = parsedData;

      if (!token || !user) {
        // console.log("token expired already");;
        return <Route path="/" element={<Navigate to="/login" replace />} />;
      }
      await dispatch(authenticate(user, token));
    };
    tryLogin();
  }, [dispatch]);

  return (
    <div className="app">
      <BrowserRouter>
        {!isLoggedIn && (
          <Routes>
            <Fragment>
              <Route
                path="/"
                element={
                  <div>
                    <Home />
                  </div>
                }
              />
              <Route
                path="signup"
                element={
                  <div>
                    {notification.showCardNotification && (
                      <Notification
                        type={notification.cardNotificationType}
                        message={notification.cardMessage}
                        onClose={closeCardHandler}
                      />
                    )}
                    <SignUp />
                  </div>
                }
              />
              <Route
                path="login"
                element={
                  <div>
                    {notification.showCardNotification && (
                      <Notification
                        type={notification.cardNotificationType}
                        message={notification.cardMessage}
                        onClose={closeCardHandler}
                      />
                    )}
                    <LogIn />
                  </div>
                }
              />
              <Route
                path="about"
                element={
                  <div>
                    <About />
                  </div>
                }
              />
              <Route
                path="register"
                element={<Navigate to="/signup" replace />}
              />
              <Route path="signin" element={<Navigate to="/login" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Fragment>
          </Routes>
        )}

        {isLoggedIn && (
          <Fragment>
            <div className="pages">
              {notification.showCardNotification && (
                <Notification
                  type={notification.cardNotificationType}
                  message={notification.cardMessage}
                  onClose={closeCardHandler}
                />
              )}
              <SideBar />
              <Routes>
                <Route
                  path="chat"
                  element={
                    <div className="pages__component">
                      <Header title={"Chat"} />
                      <Chat socket={socket} />
                    </div>
                  }
                />
                <Route
                  path="chat-room"
                  element={
                    <div className="pages__component">
                      {/* <Header title={"ChatRoom"} /> */}
                      <ChatRoom socket={socket} />
                    </div>
                  }
                />
                <Route
                  path="explore"
                  element={
                    <div className="pages__component">
                      <Header title={"Explore"} />
                      <Explore socket={socket} />
                    </div>
                  }
                />
                <Route
                  path="profile"
                  element={
                    <div className="pages__component">
                      <Header title={"Profile"} />
                      <Profile />
                    </div>
                  }
                />
                <Route
                  path="settings"
                  element={
                    <div className="pages__component">
                      <Header title={"Settings"} />
                      <Settings />
                    </div>
                  }
                />
                <Route path="/" element={<Navigate to="/chat" replace />} />
                <Route path="*" element={<Navigate to="/chat" replace />} />
              </Routes>
            </div>
          </Fragment>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
