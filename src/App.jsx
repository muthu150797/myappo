import React, { useState, useEffect } from 'react';
import { useToken } from './TokenContext.js';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import DataTable from './Common.jsx';
import MyComponent from './MyComponent.jsx';
import LoginComponent from './Login.js';
import Home from './Home';
import ReactDOM from 'react-dom';
import VerifyUser from './VerifyUser.js';
import {
  BrowserRouter,
  Route,
  Routes,
  Switch,
  Redirect,
  Navigate,
} from 'react-router-dom';
import Dashboard from './Dashboard.js';
import PrivateRoute from './PrivateRoute.js';
const Profile = () => <h2>Profile Page</h2>;
const Settings = () => <h2>Settings Page</h2>;
const Welcome = () => <h2>Welcome</h2>;
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './Layout.jsx';
import ChangePassword from './ChangePassword.js';
import MyMap from './MyMap.js';
import Chat from './Chat.js';
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

import {config} from "./firebase.js"
const app = initializeApp(config);
const messaging = getMessaging(app);

export default function App() {
  const [isLogin, Login] = useState(false);
  const [code, setCode] = useState(`function Test () { return "hello"}`);
  // const { token, setToken } = useToken();
  const { count, setCount } = useState(1);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log("Service Worker registered2:", registration);
        })
        .catch((error) => {
          console.error("Service Worker registration failed2:", error);
        });
    }

    // Handle foreground messages
    onMessage(messaging, (payload) => {
      alert("Foreground notification received2")
      console.log("Foreground notification received2:", payload);
      new Notification(payload.notification.title, {
        body: payload.notification.body,
        //icon: "/logo192.png",
      });
    });
  }, []);
  // return (
  //   <div>{token ? <Dashboard /> : <LoginComponent username="muthu" />}</div>
  // );
  return (

    <div class="App">
            <ToastContainer />
      <Routes>
      <Route path="/verify" element={<VerifyUser />} />

      <Route path="/change-password" element={<ChangePassword />} />

        <Route path="/" element={<LoginComponent />} />
        {/* <Route path="/layout" element={<Layout />} /> */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Welcome />} /> {/* Default route */}
          <Route path="home" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="open-map" element={<MyMap />} />
          <Route path="chat-with-me" element={<Chat />} />

        </Route>
        <Route
          path="/dashboard2"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<Welcome />} /> {/* Default route */}
          <Route path="home" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/login" element={<LoginComponent />} />
      </Routes>
    </div>
  );
  // return <div>{token ? <Dashboard /> : <LoginComponent username="muthu" />}</div>;
}
