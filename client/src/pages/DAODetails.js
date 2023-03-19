import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/homestyle.css';
import { getLinkedAddress, toETHdenomination } from '../helper/formatter';
import { proposals } from '../constants';
import { useContractReads } from 'wagmi';
import { SimpliGovernorABI } from '../ContractABIs/GovernorABI';
import Balance from '../components/Balance';

export default function DAODetails() {

    const { state } = useLocation();
    const navigate = useNavigate();

    const dao = state


    // const [transferForm, setTransferForm] = useState({
    //     amount: ''
    // });


    // const handleFormFieldChange = (fieldName, e) => {
    //     setTransferForm({ ...transferForm, [fieldName]: e.target.value })
    // }
    const daoContract = {
        address: state.daoAddr,
        abi: SimpliGovernorABI,
    }


    const {data, isError, isLoading } = useContractReads({
        contracts: [
            {...daoContract, functionName: 'name'},
            {...daoContract, functionName: 'owner'},
            {...daoContract, functionName: 'proposalThreshold'},
            {...daoContract, functionName: 'token'},
            {...daoContract, functionName: 'timelock'},
            {...daoContract, functionName: 'votingDelay'},
            {...daoContract, functionName: 'votingPeriod'},
        ]
    })

    console.log("DAO Data fetched: ", String(data[2]));



    return (
        <div className='trxn-content'>
            <div className='heading-container'>
                <div>
                    <h2>{state.daoName}</h2>
                    <p>Address: <a href={getLinkedAddress(state.daoAddr)} target="blank" style={{ fontSize: '14px' }}>{state.daoAddr}</a></p>
                    <p>Token: <a href={getLinkedAddress(data[3])} target="blank" style={{ fontSize: '14px' }}>{data[3]}</a></p>
                    <p>Timelock (Treasury): <a href={getLinkedAddress(data[4])} target="blank" style={{ fontSize: '14px' }}>{data[4]}</a></p>
                </div>
                <div>
                    <button onClick={()=>navigate(`/dao-settings/${dao.daoName}`, {state: dao} )}>
                        Settings
                    </button>
                    <button onClick={()=>navigate(`/create-proposal/${dao.daoAddr}`, {state: {...dao, data}})}>
                        Create Proposal
                    </button>
                    <div>
                        <p>Owner: <a href={getLinkedAddress(data[1])} target="blank" style={{ fontSize: '14px' }}>{data[1]}</a></p>
                        <p>Proposal Threshold: {toETHdenomination(Number(data[2]))} Token</p>
                        <p>voting Period: {String(data[6])} Blocks</p>
                        <Balance token={data[3]} user={data[4]}/>
                    </div>
                    
                </div>
                
            </div>

            


            <h2>All Proposals</h2>
            <div className='cards-container'>
                
                {proposals.map((proposal)=>
                    <div key={proposal.id} className='token-card'>
                        <h4>{proposal.id}</h4>
                        <p>Description: {proposal.description}</p>
                        <p>Start: {proposal.start}</p>
                        <p>End: {proposal.end}</p>
                        <p>Status: {proposal.status}</p>
                    </div>
                )}

            </div>

            


            


        </div>
    );
}