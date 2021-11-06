import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import "antd/dist/antd.css";
import "./global.scss";

import Dashboard from "./pages/dashboard";
import StoreSettings from "./pages/store-settings";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        {/* <Route path="store-settings" element={<StoreSettings />} /> */}
        <Route index element={<StoreSettings />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
