// global Import
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// local Import
import './index.css';
import App from './App';
import {AuthProvider, AuthErrorEventBus} from './context/AuthConterxt';
import AuthService from './service/auth';
import ChatService from './service/chat';
import HttpClient from './network/http';
import TokenStorage from './db/token';
import Socket from './network/socket';

const baseURL = process.env.REACT_APP_BASE_URL;
const tokenStorage = new TokenStorage();
const httpClient = new HttpClient(baseURL);
const authErrorEventBus = new AuthErrorEventBus();
const authService = new AuthService(httpClient, tokenStorage);
const socketClient = new Socket(baseURL, () => tokenStorage.getToken());
const chatService = new ChatService(httpClient, tokenStorage, socketClient);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider
        authService={authService}
        authErrorEventBus={authErrorEventBus}
      >
        <App authService={authService} chatService={chatService}/>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);