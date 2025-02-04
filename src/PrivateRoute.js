import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { useToken } from './TokenContext.js';
import { createContext, useContext, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import LoginComponent from './Login.js';

// ProtectedRoute.js

const PrivateRoute = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  if (token == '' || token == null) {
    return <Navigate to="/login" />;
  }
  return children;
};
export default PrivateRoute;
