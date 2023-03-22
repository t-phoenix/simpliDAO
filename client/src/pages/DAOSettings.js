import React from "react"
import { useLocation } from "react-router-dom"
import { useContractReads } from "wagmi";
import GovernorOwner from "../components/governance/GovernorOwner";
import Roles from "../components/governance/Roles";
import Threshold from "../components/governance/Threshold";
import VotingPeriod from "../components/governance/VotingPeriod";
import { TimelockControllerABI } from "../ContractABIs/TimelockControllerABI";
import { getLinkedAddress } from "../helper/formatter";
import '../styles/daostyle.css';


export default function DAOSettings() {
    const { state } = useLocation();
    console.log("State:", state)


    const timelock = {
        address: state.data[4],
        abi: TimelockControllerABI
    }

    const { data, isLoading, isError } = useContractReads({
        contracts: [
            {
                ...timelock,
                functionName: 'TIMELOCK_ADMIN_ROLE'
            },
            {
                ...timelock,
                functionName: 'EXECUTOR_ROLE'
            },
            {
                ...timelock,
                functionName: 'PROPOSER_ROLE'
            }
        ]
    })

    // console.log("Timelock Data:", data)
    // hasRole, grantRole



    return (
        <div style={{width: '90%'}}>
            <div style={{width:'100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <div>
                    <h3>Settings</h3>
                    <p>{state.daoName}</p>
                </div>
                <div>
                    <p>DAO: <a href={getLinkedAddress(state.daoAddr)} target="blank" style={{ fontSize: '14px' }}>{state.daoAddr}</a></p>
                    <p>Timelock: <a href={getLinkedAddress(state.data[4])} target="blank" style={{ fontSize: '14px' }}>{state.data[4]}</a></p>
                </div>
            </div>
            <div>
                {!isLoading && <div>
                    <p>ADMIN_ROLE: {data[0]}</p>
                    <p>EXECUTOR_ROLE: {data[1]}</p>
                    <p>PROPOSER_ROLE: {data[2]}</p>
                </div>}
                {isError && <div>
                    <p>Error While loading role hash</p>
                </div>}

                <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                    <Roles />
                    <GovernorOwner />
                    <VotingPeriod />
                    <Threshold />
                </div>
                



            </div>
        </div>
    )
}