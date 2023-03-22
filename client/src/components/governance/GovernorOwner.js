import { prepareWriteContract, writeContract } from "@wagmi/core";
import React from "react";
import { useLocation } from "react-router-dom";
import { useContractRead } from "wagmi";
import { SimpliGovernorABI } from "../../ContractABIs/GovernorABI";
import FormField from "../FormField";


export default function GovernorOwner(){

    const {state} = useLocation();
    const [owner, setOwner] = React.useState('');
    const [txnResult, setTxnResult] = React.useState('');


    const { data, isLoading, isError } = useContractRead({
        address: state.daoAddr,
        abi: SimpliGovernorABI,
        functionName: 'owner'
    })

    async function handleUpdateOwner(){
        const config  = await prepareWriteContract({
            address: state.daoAddr,
            abi: SimpliGovernorABI,
            functionName: 'transferOwnership',
            args: [owner]
        })
        const data = await writeContract(config);

        console.log("Updatinmg Governor Owner:", data);
        setTxnResult(data);
    }


    return(
        <div className="function-card">
            <h4>Governor Owner</h4>
            <p>only owner can change governor's owner.</p>
            {!isLoading && <div>
                <p align='left'>Owner: {data}</p>
            </div>}
            {isError && <p>Could not fetch Voting Period</p>}

            <FormField
                labelName="New Period"
                placeholder="Number(blocks)"
                inputType="number"
                value={owner}
                handleChange={(e) => setOwner(e.target.value)}
            />

            <button style={{marginBlock: '30px'}} onClick={handleUpdateOwner}>
                New Owner
            </button>

            <p align='left'>Result: {String(txnResult)}</p>
        </div>
    )
}