import React, { useState } from "react";
import "antd/dist/antd.css";
import "./App.scss";
import { Outlet } from "react-router-dom";

import SideBar from "./components/sidebar/sidebar";

function App() {
  const [isSidebarOpenParam, setSidebarOpenParam] = useState(true);

  return (
    <div className="App">
      <SideBar
        isSidebarOpen={isSidebarOpenParam}
        setSidebarOpen={setSidebarOpenParam}
      />

      <div className="col flex-container">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
