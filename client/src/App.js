import logo from './logo.svg';
import './App.css';
import { Web3Button } from '@web3modal/react';
import { Route, Routes } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

import Home from './pages/Home.js';
import TokenScreen from './pages/Token.js';
import CreateScreen from './pages/CreateScreen';
import { ConnectButton } from '@rainbow-me/rainbowkit';


function App() {
  return (
    <div className="App">
      {/* <Web3Button /> */}
      {/* <ConnectButton/> */}

      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>


      <div className="content">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateScreen />} />
          <Route path="/token" element={<TokenScreen />} />
        </Routes>
      </div>

      {/* <header style={{fontSize: '20px', fontStyle: 'bold'}}>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
