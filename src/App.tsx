// import Topbar from './components/topbar/Topbar';
import "antd/dist/antd.css";
import Menu from "./components/menu/Menu";
import MerchTable from "./components/merchTable/MerchTable";
import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState } from "react";


function App() {
  const [menuOpen,setMenuOpen] = useState(false)
  return (
    <div className="App">
      {/* <Topbar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/> */}
      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>

      <div className= "Table">
      <MerchTable />
      </div>
    
    </div>
      
  );
}

export default App;
