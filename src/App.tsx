import React, { useState } from "react";
import "antd/dist/antd.css";
import "./App.scss";
import { Outlet } from "react-router-dom";

import Menu from "./components/menu/Menu";

function App() {
  const [menuOpen, setMenuOpen] = useState(true);
  return (
    <div className="App">
      {/* <Topbar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/> */}
      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <div className="col flex-container">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
