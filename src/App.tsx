import Topbar from './components/topbar/Topbar';
import Menu from "./components/menu/Menu";
import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState } from "react";

function App() {
  const [menuOpen,setMenuOpen] = useState(true)
  return (
    <div className="App">
      <Topbar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
