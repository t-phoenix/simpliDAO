import React, { useEffect, useState } from "react";
import { SimpliFactoryABI } from "../../ContractABIs/FactoryABI";
import FormField from '../FormField';
import '../../styles/proposalstyle.css';
import { useAccount, usePrepareContractWrite, useContractWrite, useProvider } from 'wagmi';
import { prepareWriteContract, writeContract } from "@wagmi/core";
import { Factory1_Addr } from "../../constants/ContractAddress";
import { useLocation, useNavigate } from "react-router-dom";
import { SimpliGovernorABI } from "../../ContractABIs/GovernorABI";
import { ethers } from "ethers";
import { ERC20TokenABI } from "../../ContractABIs/ERC20TokenABI";
import { getLinkedAddress } from "../../helper/formatter";

export default function AdvProposalForm(){
    const { state }= useLocation()
    const DAOdata = state?.data;
    console.log("MY Location DATA:", state.daoAddr, DAOdata);
    const provider = useProvider();
    const account = useAccount();
    console.log("Check Connected Account:", account.address);

    const [proposalForm, setProposalForm] = useState({
        target: '',
        value: '',
        calldata: '',
        description: ''
    });


    const token = new ethers.Contract(DAOdata[3], ERC20TokenABI, provider)
    

    async function CreateProposalButton() {
        
        // const calldata = token.interface.encodeFunctionData('transfer', [proposalForm.target, proposalForm.value]);
        // console.log("USER INPUTS:", calldata);
        const config = await prepareWriteContract({
            address: state.daoAddr,
            abi: SimpliGovernorABI,
            functionName: 'propose',
            args: [proposalForm.target, proposalForm.value, proposalForm.calldata, proposalForm.description]
        })

        const { hash } = await writeContract(config);
        console.log("Propsoal Hash:", hash);

    }


    const handleFormFieldChange = (fieldName, e) => {
        setProposalForm({ ...proposalForm, [fieldName]: e.target.value })
    }
    
    return(
        <div className="formContainer">
            {/* <h2>DAO Address: {state.daoAddr}</h2> */}
            <form className="formInputs">

                <h3 style={{marginBlock: '8px'}}>Advance Proposal Form</h3>
                <a href={getLinkedAddress(DAOdata[3])} target="blank" style={{ fontSize: '14px', marginBlock: '8px' }}>{DAOdata[3]}</a>

                <FormField
                    labelName="Target Contract"
                    placeholder="address[]"
                    inputType="list"
                    value={proposalForm.target}
                    handleChange={(e) => handleFormFieldChange('target', e)}
                />
                <p style={{fontSize: '10px'}}>Example: ["0x1158EE5AC602F9517C8D9C02b5b67B70DD991E66", "0x6C57346BF8255Ea8EA44F001693Ce444A22b17ad"]</p>
                <FormField
                    labelName="Values to send"
                    placeholder="amount[]"
                    inputType="list"
                    value={proposalForm.value}
                    handleChange={(e) => handleFormFieldChange('value', e)}
                />
                <p style={{fontSize: '10px'}}>Example: [0, 450000] in wei</p>


                <FormField
                    labelName="Calldatas"
                    placeholder="encode Function call"
                    inputType="hash"
                    value={proposalForm.calldata}
                    handleChange={(e) => handleFormFieldChange('calldata', e)}
                />
                <p style={{fontSize: '10px', flexWrap: 'initial'}}>Example: ["0xa9059cbb0000000....000000000000000", "0xb40f9cbb000.....000000000000000"]</p>

                <FormField
                    labelName="Description"
                    placeholder="of proposal"
                    inputType="text"
                    value={proposalForm.description}

                    handleChange={(e) => handleFormFieldChange('description', e)}
                />


                <p style={{width: '100%'}}> Make sure you have enough delegated voting power to create proposal. Use Token Screen to delegate votes based on token balance.</p>



            </form>
            <button onClick={CreateProposalButton}>
                Create propsal
            </button>
        </div>
    )
}