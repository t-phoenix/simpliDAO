import React from 'react';
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
import TxnScreen from './pages/TxnScreen';
import DAOexplorer from './pages/DAOexplorer';
import DAODetails from './pages/DAODetails';
import CreateProposal from './pages/CreateProposal';
import ProposalDetails from './pages/ProposalDetails';
import DAOSettings from './pages/DAOSettings';
import UseCases from './pages/UseCases';


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
          <Route path="/explorer" element={<DAOexplorer />}/>
          <Route path="/dao-details/:id" element={<DAODetails />}/>
          <Route path="/create-proposal/:id" element={<CreateProposal />} />
          <Route path="/proposal-details/:id" element ={<ProposalDetails />} />
          <Route path="/dao-settings/:id" element={<DAOSettings />}/>
          <Route path="/create" element={<CreateScreen />} />
          <Route path="/token" element={<TokenScreen />} />
          <Route path="/transaction" element={<TxnScreen/>}/>
          <Route path="/cases" element={<UseCases />} />
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
