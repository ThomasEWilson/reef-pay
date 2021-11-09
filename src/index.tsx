import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App";
import "antd/dist/antd.css";
import "./global.scss";

import Home from "./pages/home";
import StoreSettings from "./pages/store-settings";
import PaymentsPage from "./pages/payments.page";
import RegistrationPage from "./pages/registration-page";
import LoginPage from "./pages/login-page";

import Amplify, { Auth } from 'aws-amplify';

Amplify.configure({
  Auth: {
      
      // REQUIRED - Amazon Cognito Region
      region: 'us-east-2',

      // OPTIONAL - Amazon Cognito User Pool ID
      userPoolId: 'us-east-2_Aw3C1ge27',

      // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
      userPoolWebClientId: '758nl5mpr3ojopa5neuvcrphqs',

      // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
      mandatorySignIn: true,

      // OPTIONAL - Configuration for cookie storage
      // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
      cookieStorage: {
      // REQUIRED - Cookie domain (only required if cookieStorage is provided)
          domain: '.yourdomain.com',
      // OPTIONAL - Cookie path
          path: '/',
      // OPTIONAL - Cookie expiration in days
          expires: 365,
      // OPTIONAL - Cookie secure flag
      // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
          secure: true
      },

      // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
      authenticationFlowType: 'USER_PASSWORD_AUTH',
  }
});

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="store-settings" element={<StoreSettings />} />
        <Route path="payments" element={<PaymentsPage />} />
        <Route path="registration-page" element={<RegistrationPage />} />
        <Route path="login-page" element={<LoginPage />} />
        {/* <Route path="login" element={<Login />} /> */}
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
