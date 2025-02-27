// index.js
import React from 'react';
import App from './App';
import { TokenProvider } from './TokenContext';
//import { BrowserRouter } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom/client';
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TokenProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </TokenProvider>
);

