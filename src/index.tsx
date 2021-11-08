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
