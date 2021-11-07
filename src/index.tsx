import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App";
import "antd/dist/antd.css";
import "./global.scss";

import Dashboard from "./pages/dashboard";
import StoreSettings from "./pages/store-settings";
import PaymentsPage from "./pages/payments.page";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<StoreSettings />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="payments" element={<PaymentsPage />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
