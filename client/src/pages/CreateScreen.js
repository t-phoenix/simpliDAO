import React, { useState } from "react";

import '../styles/createstyle.css';
import TokenForm from "../components/forms/TokenForm";
import TimelockForm from "../components/forms/TimelockForm";
import GovernorForm from "../components/forms/GovernorForm";
import { Factory1_Addr, Factory2_Addr } from "../constants/ContractAddress";

export default function CreateScreen() {

    const factory1 = Factory1_Addr;
    const factory2 = Factory2_Addr;
    const fact1Link = `https://mumbai.polygonscan.com/address/${factory1}`
    const fact2Link = `https://mumbai.polygonscan.com/address/${factory2}`


    // const abi = SimpliFactoryABI
    // const components = ComponentFromABI(abi);
    return (
        <div >
            <h1 style={{marginBlock: '10px'}}>Simpli Forms</h1>
            <h3 style={{marginBottom: '40px'}}>Deploying your smart-contracts easily with Simpli Factories. </h3>
            
            <p>Factory1 Contract: <a href={fact1Link} target="blank">{factory1}</a></p>
            <p>Factory2 Contract: <a href={fact2Link} target="blank">{factory2}</a></p>
            {/* {components.map((Component, compIndex) => (
                <div key={compIndex}>
                    <Component abi={abi} index={compIndex} />
                </div>
            ))} */}

            



            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start',  marginLeft: '30px',borderStyle: 'solid', borderWidth: '2px', borderColor: '#000000', borderRadius: '16px', padding: '20px'}}>
                    
                    <h3>Steps to start your DAO</h3>
                    
                    <ul className="ulStyle">1. Deploy your ERC20 Token Contract</ul>
                    <ul className="ulStyle">2. Deploy Timelock to be used for Governor</ul>
                    <ul className="ulStyle">3. Deploy Governor Contract which acts as DAO</ul>
                    <ul className="ulStyle">4. Grant PROPOSER_ROLE to your Governance contract (usually denoted by dao) </ul>
                    <ul className="ulStyle">Configure contract settings to use best practises</ul>
                    <ul className="ulStyle">Use TimelockContract as DAO Treasury and store funds there</ul>
                    
                    
                </div>
                <TokenForm />
                <GovernorForm />
                <TimelockForm />
                
                
            </div>

        </div>
    )
}