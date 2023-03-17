
import { useNavigate, useLocation } from "react-router-dom";
import { useContractReads } from "wagmi";
import ProposalForm from "../components/forms/ProposalForm";
import { SimpliGovernorABI } from "../ContractABIs/GovernorABI";
import { getLinkedAddress } from "../helper/formatter";
import {getProvider} from "@wagmi/core";


export default function CreateProposal(){

    const provider = getProvider();
    const {state} = useLocation();
    const daoContract = {
        address: state.daoAddr,
        abi: SimpliGovernorABI,
    }

    const {data, isError, isLoading } = useContractReads({
        contracts: [
            {...daoContract, functionName: 'token'},
            {...daoContract, functionName: 'timelock'},
        ]
    })

    console.log("Data from DAO Contract:", data)

    return (
        <div className="trxn-container">
            <div style={{display: 'flex', flexDirection: 'row',alignItems: 'center'}}>
                <h2>{state.daoName}</h2>
                <p>Address: <a href={getLinkedAddress(state.daoAddr)} target="blank" style={{ fontSize: '14px' }}>{state.daoAddr}</a></p>
            </div>
            <h2>Create your proposal here</h2>

            <ProposalForm props={data} provider={provider}/>
            
        </div>
    )

}