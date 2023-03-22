import React, { useEffect, useState } from 'react';
import { getProvider } from "@wagmi/core";
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/homestyle.css';
import { getLinkedAddress, toETHdenomination } from '../helper/formatter';
// import { proposals } from '../constants';
import { useContractReads } from 'wagmi';
import { SimpliGovernorABI } from '../ContractABIs/GovernorABI';
import Balance from '../components/Balance';
import { ethers } from 'ethers';
import ProposalList from '../components/ProposalList';

export default function DAODetails() {

    const { state } = useLocation();
    const navigate = useNavigate();


    const dao = state;

    const daoContract = {
        address: state.daoAddr,
        abi: SimpliGovernorABI,
    }


    const { data, isError, isLoading } = useContractReads({
        contracts: [
            { ...daoContract, functionName: 'name' },
            { ...daoContract, functionName: 'owner' },
            { ...daoContract, functionName: 'proposalThreshold' },
            { ...daoContract, functionName: 'token' },
            { ...daoContract, functionName: 'timelock' },
            { ...daoContract, functionName: 'votingDelay' },
            { ...daoContract, functionName: 'votingPeriod' },
        ]
    })

    console.log("DAO Data fetched: ", data);

    return (
        <div>
        {!isLoading && <div className='trxn-content'>
            <div className='heading-container'>
                <div>
                    <h2>{state.daoName}</h2>
                    <p>Address: <a href={getLinkedAddress(state.daoAddr)} target="blank" style={{ fontSize: '14px' }}>{state.daoAddr}</a></p>
                    <p>Token: <a href={getLinkedAddress(data[3])} target="blank" style={{ fontSize: '14px' }}>{data[3]}</a></p>
                    <p>Timelock: <a href={getLinkedAddress(data[4])} target="blank" style={{ fontSize: '14px' }}>{data[4]}</a></p>
                </div>
                <div>
                    <div style={{width: '70%', display: 'flex', flexDirection: 'row', justifyContent:'space-evenly'}}>
                        <button onClick={() => navigate(`/dao-settings/${dao.daoAddr}`, { state: {...dao, data} })}>
                            Settings
                        </button>
                        <button onClick={() => navigate(`/create-proposal/${dao.daoAddr}`, { state: { ...dao, data } })}>
                            Create Proposal
                        </button>
                    </div>
                    <div>
                        <p>Owner: <a href={getLinkedAddress(data[1])} target="blank" style={{ fontSize: '14px' }}>{data[1]}</a></p>
                        <p>Proposal Threshold: {toETHdenomination(Number(data[2]))} Token</p>
                        <p>voting Period: {String(data[6])} Blocks</p>
                        <Balance token={data[3]} user={data[4]} />
                    </div>

                </div>
                

            </div>
            <div>
                <p>Timelock Contract Acts as Treasury for your DAO. Send funds to timelock controller contract address of your DAO.</p>
                <p>Native ETH is not supported, so you can always use WETH to manage your DAO Treasury</p>
            </div>
            <h2>All Proposals</h2>
            {data && <ProposalList daoData={data} />}
        </div>}
        </div>
    );
}