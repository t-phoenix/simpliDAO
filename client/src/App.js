import logo from './logo.svg';
import './App.css';
import { Web3Button } from '@web3modal/react';
import { Route, Routes } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

import Home from './pages/Home.js';
import TokenScreen from './pages/Token.js';
import Dashboard from './pages/Dashboard';


function App() {
  return (
    <div className="App">
      {/* <Web3Button /> */}

      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>


      <div className="content">
        <Navbar />
        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/token" element={<TokenScreen />}/>
            {/* <Route path="/token" element={<TokenScreen />}/>
            <Route path="/create-token" element={<CreateToken/>}/>
            <Route path="/token-details/:id" element={<TokenDetails/>}/>
            <Route path="/crowdsale" element={<CrowdsaleScreen />}/>
            <Route path="/crowdsale-details/:id" element={<CrowdsaleDetails />} />
            <Route path='/create-crowdsale' element={<CreateCrowdsale />} />
            <Route path="/dao" element={<DAOScreen />} />
            <Route path="/dao-details/:id" element={<DAODetails />}/>
            <Route path="/create-dao" element={<CreateDAO />}/>
            <Route path="/create-proposal" element={<CreateProposal />}/>
            <Route path="dao-settings" element={<DAOSettings/>}/> */}
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
