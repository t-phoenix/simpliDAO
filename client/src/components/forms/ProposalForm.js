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





export default function ProposalForm() {

    const { state }= useLocation()
    const DAOdata = state?.data;
    console.log("MY Location DATA:", state.daoAddr, DAOdata);
    const provider = useProvider();
    const account = useAccount();
    console.log("Check Connected Account:", account.address);

    const [proposalForm, setProposalForm] = useState({
        sendTo: '',
        amount: '',
        description: ''
    });


    const token = new ethers.Contract(DAOdata[3], ERC20TokenABI, provider)
    

    async function CreateProposalButton() {
        console.log("USER INPUTS:", proposalForm);
        const calldata = token.interface.encodeFunctionData('transfer', [proposalForm.sendTo, proposalForm.amount]);

        const config = await prepareWriteContract({
            address: state.daoAddr,
            abi: SimpliGovernorABI,
            functionName: 'propose',
            args: [[DAOdata[3]], [0], [calldata], proposalForm.description]
        })

        const { hash } = await writeContract(config);
        console.log("Propsoal Hash:", hash);

    }


    const handleFormFieldChange = (fieldName, e) => {
        setProposalForm({ ...proposalForm, [fieldName]: e.target.value })
    }

    return (
        <div className="formContainer">
            {/* <h2>DAO Address: {state.daoAddr}</h2> */}
            <form className="formInputs">

                <h3 style={{marginBlock: '8px'}}>DAO Token Expense form</h3>
                <a href={getLinkedAddress(DAOdata[3])} target="blank" style={{ fontSize: '14px', marginBlock: '8px' }}>{DAOdata[3]}</a>

                <FormField
                    labelName="Receiver"
                    placeholder="address"
                    inputType="text"
                    value={proposalForm.sendTo}
                    handleChange={(e) => handleFormFieldChange('sendTo', e)}
                />

                <FormField
                    labelName="Amount"
                    placeholder="in wei denomination"
                    inputType="numeric"
                    value={proposalForm.amount}
                    handleChange={(e) => handleFormFieldChange('amount', e)}
                />

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