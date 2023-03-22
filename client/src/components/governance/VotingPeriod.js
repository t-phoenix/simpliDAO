import { prepareWriteContract, writeContract } from "@wagmi/core";
import React from "react";
import { useLocation } from "react-router-dom";
import { useContractRead } from "wagmi";
import { SimpliGovernorABI } from "../../ContractABIs/GovernorABI";
import FormField from "../FormField";


export default function VotingPeriod() {
    const { state } = useLocation();
    console.log("DAO state:", state);

    const [votingPeriod, setVotingPeriod] = React.useState('')
    const [txnResult, setTxnResult] = React.useState('')

    const { data, isLoading, isError } = useContractRead({
        address: state.daoAddr,
        abi: SimpliGovernorABI,
        functionName: 'votingPeriod'
    })

    async function handleUpdateVoting(){
        const config  = await prepareWriteContract({
            address: state.daoAddr,
            abi: SimpliGovernorABI,
            functionName: 'setVotingPeriod',
            args: [votingPeriod]
        })
        const data = await writeContract(config);

        console.log("Updatinmg Votings Period:", data);
        setTxnResult(data);

    }

    return (
        <div className="function-card">
            <h4>Voting Period</h4>
            <p>only owner can change voting period.</p>
            {!isLoading && <div>
                <p>Voting Period: {Number(data)}</p>
            </div>}
            {isError && <p>Could not fetch Voting Period</p>}

            <FormField
                labelName="New Period"
                placeholder="Number(blocks)"
                inputType="number"
                value={votingPeriod}
                handleChange={(e) => setVotingPeriod(e.target.value)}
            />

            <button style={{marginBlock: '30px'}} onClick={handleUpdateVoting}>
                Update Voting Period
            </button>

            <p align='left'>Result: {String(txnResult)}</p>
        </div>
    )
}