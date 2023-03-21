import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useContractReads } from "wagmi";
import AdvProposalForm from "../components/forms/AdvProposalForm";
import ProposalForm from "../components/forms/ProposalForm";
import { SimpliGovernorABI } from "../ContractABIs/GovernorABI";
import { getLinkedAddress } from "../helper/formatter";


export default function CreateProposal(){

    
    // const {state} = useLocation();

    React.useEffect(()=>{
        console.log("NEW USE EFFECT 1 ")

        return()=>{
            console.log("NEW USE EFFECT 2")
        }
    }, [])

    return (
        <div className="trxn-container">
            <div style={{display: 'flex', flexDirection: 'row',alignItems: 'center'}}>
                {/* <h2>{state.daoName}</h2> */}
                {/* <p>Address: <a href={getLinkedAddress(state.daoAddr)} target="blank" style={{ fontSize: '14px' }}>{state.daoAddr}</a></p> */}
            </div>
            <h2>Create your proposal here</h2>

            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                <ProposalForm />
                <AdvProposalForm />
            </div>
        </div>
    )

}