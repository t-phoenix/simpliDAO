import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import logo from '../assets/logo.svg';
// import { ConnectWallet } from "@thirdweb-dev/react";
import { Web3Button } from "@web3modal/react";



export default function Navbar(){
    return(
        <div className='navbar'>
            <div className='title-container'>
            <h3 className='title'>SimpliDAO</h3>
            <p className='icon-title'>by EquiLabs</p>
            </div>
            <Web3Button />
        </div>
    )
}