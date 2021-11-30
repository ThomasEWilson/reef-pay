import React, { useState } from "react";
import "antd/dist/antd.css";
import "./App.scss";
import { Outlet } from "react-router-dom";
import { withAuthenticator } from "@aws-amplify/ui-react";

import SideBar from "./components/sidebar/sidebar";

function App() {
  const [isSidebarOpenParam, setSidebarOpenParam] = useState(true);

  return (
    <div className="App">
      <SideBar
        isSidebarOpen={isSidebarOpenParam}
        setSidebarOpen={setSidebarOpenParam}
      />

      <main className="col flex-container scrollable">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
