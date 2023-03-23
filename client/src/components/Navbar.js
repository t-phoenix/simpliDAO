import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import logo from '../assets/logo.svg';
// import { ConnectWallet } from "@thirdweb-dev/react";
import { Web3Button } from "@web3modal/react";
import { ConnectButton } from '@rainbow-me/rainbowkit';



export default function Navbar(){
    return(
        <div className='navbar'>
            
            <div className='title-container'>
                <p></p>
                <h1 className='title'>SimpliDAO</h1>
                <p className='icon-title'>by EquiLabs</p>
            </div>
            <div>
                <p></p>
                <Web3Button />

            </div>
            
            {/* <ConnectButton/> */}
        </div>
    )
}