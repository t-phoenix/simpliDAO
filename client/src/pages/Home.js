// import { Token } from '@thirdweb-dev/sdk';
import React from 'react';
// import DisplayCards from '../components/DisplayCards';
import { cards } from '../constants';
import '../styles/homestyle.css';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    
    return (
        <div className='main-content'>
            {/* <h1>Governance Kit </h1>
            <p>by Equistart DAO Suite</p> */}
            <div className='sub-content'>
                <h1 className='home-heading'>Hello HODLers !!</h1>
                <h2 className='home-subheading'>Welcome to the Simpli DAO</h2>
                <div>
                    <button className='home-button' onClick={()=>{navigate('/create')}}>Create your DAO</button>
                    <button className='home-button' onClick={()=>{navigate('/token')}}>Join a DAO</button>
                </div>
            </div>
            <div className='sub-content home-content'>
                <p>We help you create your Decentralised Autonomous Organisations in easy steps and help your friends Join your DAO Journey with simple interface. </p>
                <p>Now critical World problems can be solved using DAO mechanism, <br /> by operating the organisations which needs transparency and decentralisation at its core.</p>
                <p>Climate, poverty, finance, media, donations and more such problems can now be solved with higher degree of efficiency <br /> with the help of Blockchain, crypto-assets, smart-contracts, and Equistart.  </p>
                <p>And we at EquiLabs develop simple user friendly tools to bridge the gap between technology and users. </p>
            </div>

            {/* <DisplayCards

                title="DApp Features"
                cards={cards}
            /> */}

        </div>
    );
};


