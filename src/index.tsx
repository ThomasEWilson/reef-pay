import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App";
import "antd/dist/antd.css";
import "./global.scss";

import Home from "./pages/home";
import StoreSettings from "./pages/store-settings";
import PaymentsPage from "./pages/payments.page";
import Registration from "./pages/registration";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="store-settings" element={<StoreSettings />} />
        <Route path="payments" element={<PaymentsPage />} />
        <Route path="registration" element={<Registration />} />
        {/* <Route path="login" element={<Login />} /> */}
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
