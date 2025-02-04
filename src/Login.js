import React, { useState, useEffect } from 'react';
import { useToken } from './TokenContext.js';
import './main.css';
//import { useNavigate  } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import axios from 'axios/dist/browser/axios.cjs';
import axios from 'axios';
import { toast } from 'react-toastify';

const LoginComponent = (probs) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //const { token, setToken } = useToken();
  const navigate = useNavigate();
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  const showErrorToast = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  //const history = useNavigate ();
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    }
  }, [token]); // Run when `token` changes
  const Login = async () => {
    // Imagine you got a token from an API
    const newToken = probs.username;
    var userData = await postData();
    console.log('userss', userData);
    if (userData.status == 200) {
      console.log('userData', userData.data);
      localStorage.setItem('token', userData.data.mail);
      setToken(userData.data.mail)
      navigate('/dashboard');
    } else {
      showErrorToast(userData.data.message);
    }
  };
  const postData = async () => {
    const url = 'https://newapi-5y5y.onrender.com/api/login';
    const payload = {
      username: username,
      password: password,
    };

    try {
      const response = await axios.post(url, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('response', response);
      return response;
    } catch (error) {
      console.log('error', error);
      return error;
    } finally {
    }
  };
  const LoginME = () => {
    // Imagine you got a token from an API
    const newToken = probs.username;
    setToken(newToken);
  };
  return (
    <div>
      <div class="container">
        <div class="screen">
          <div class="screen__content">
            <form class="login">
              <div class="login__field">
                <i class="login__icon fas fa-user"></i>
                <input
                  type="text"
                  class="login__input"
                  placeholder="User name / Email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                ></input>
              </div>
              <div class="login__field">
                <i class="login__icon fas fa-lock"></i>
                <input
                  type="password"
                  class="login__input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  Login();
                }}
                class="button login__submit"
              >
                <span class="button__text">Log In Now</span>
                <i class="button__icon fas fa-chevron-right"></i>
              </button>
            </form>
            <div class="social-login">
              <h3>log in via</h3>
              <div class="social-icons">
                <a href="#" class="social-login__icon fab fa-instagram"></a>
                <a href="#" class="social-login__icon fab fa-facebook"></a>
                <a href="#" class="social-login__icon fab fa-twitter"></a>
              </div>
            </div>
          </div>
          <div class="screen__background">
            <span class="screen__background__shape screen__background__shape4"></span>
            <span class="screen__background__shape screen__background__shape3"></span>
            <span class="screen__background__shape screen__background__shape2"></span>
            <span class="screen__background__shape screen__background__shape1"></span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginComponent;
