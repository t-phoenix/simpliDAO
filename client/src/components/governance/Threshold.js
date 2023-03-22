import { prepareWriteContract, writeContract } from "@wagmi/core";
import React from "react";
import { useLocation } from "react-router-dom";
import { useContractRead } from "wagmi";
import { SimpliGovernorABI } from "../../ContractABIs/GovernorABI";
import { toETHdenomination } from "../../helper/formatter";
import FormField from "../FormField";


export default function Threshold() {
    const { state } = useLocation();
    console.log("DAO state:", state);

    const [propThreshold, setPropThreshold] = React.useState('')
    const [txnResult, setTxnResult] = React.useState('')

    const { data, isLoading, isError } = useContractRead({
        address: state.daoAddr,
        abi: SimpliGovernorABI,
        functionName: 'proposalThreshold'
    })

    async function handleUpdateVoting(){
        const config  = await prepareWriteContract({
            address: state.daoAddr,
            abi: SimpliGovernorABI,
            functionName: 'setProposalThreshold',
            args: [propThreshold]
        })
        const data = await writeContract(config);

        console.log("Updatinmg Votings Period:", data);
        setTxnResult(data);

    }

    return (
        <div className="function-card">
            <h4>Proposal Threshold</h4>
            <p>only owner can change proposal Threshold.</p>
            {!isLoading && <div>
                <p>Proposal Threshold { toETHdenomination(Number(data))}</p>
            </div>}
            {isError && <p>Could not fetch Voting Period</p>}

            <FormField
                labelName="Threshold"
                placeholder="use wei denomination"
                inputType="number"
                value={propThreshold}
                handleChange={(e) => setPropThreshold(e.target.value)}
            />
            <p align='left' style={{fontSize: '12px', marginBlock: '8px'}}>Based on absolute number: If you have total supply of 2000 tokens only and want to set proposal creation threshold to 40% (800 token) then you need to set Prop threshold to 800000000000000000000 (800 * 10**18) </p>

            <button style={{marginBlock: '15px'}} onClick={handleUpdateVoting}>
                Update Threshold
            </button>

            <p align='left'>Result: {String(txnResult)}</p>
        </div>
    )
}