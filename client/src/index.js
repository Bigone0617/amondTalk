/** global Import */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

/** local Import*/
import './index.css';
import App from './App';
import {AuthProvider, AuthErrorEventBus} from './context/AuthConterxt';
// user api 연결 로직
import AuthService from './service/auth';
// chat api 연결 로직
import ChatService from './service/chat';
import HttpClient from './network/http';
// token 관련 로직
import TokenStorage from './db/token';
import Socket from './network/socket';

const baseURL = process.env.REACT_APP_BASE_URL;
const tokenStorage = new TokenStorage();
const httpClient = new HttpClient(baseURL);
const authErrorEventBus = new AuthErrorEventBus();
const socketClient = new Socket(baseURL, () => tokenStorage.getToken());
const authService = new AuthService(httpClient, tokenStorage, socketClient);
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