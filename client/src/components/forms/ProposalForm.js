import React, { useState } from "react";
import { SimpliFactoryABI } from "../../ContractABIs/FactoryABI";
import FormField from '../FormField';
import '../../styles/createstyle.css';
import { useAccount, usePrepareContractWrite, useContractWrite } from 'wagmi';
import { Factory1_Addr } from "../../constants/ContractAddress";
import { useLocation } from "react-router-dom";
import { SimpliGovernorABI } from "../../ContractABIs/GovernorABI";
import { ethers } from "ethers";
// import { getProvider } from "@wagmi/core";
import { ERC20TokenABI } from "../../ContractABIs/ERC20TokenABI";




export default function ProposalForm({ props, provider }) {

    const { state } = useLocation();
    console.log("DAO Contract Address:", state.daoAddr)
    console.log("Component Passed DATA:", props[0])
    const daoContract = state.daoAddr;
    const tokenContract = props[0]
    const token = new ethers.Contract(tokenContract, ERC20TokenABI, provider)


    const [proposalForm, setProposalForm] = useState({
        sendTo: '',
        amount: '',
        description: ''
    });



    const account = useAccount();
    console.log("Check Connected Account:", account.address);



    const handleFormFieldChange = (fieldName, e) => {
        setProposalForm({ ...proposalForm, [fieldName]: e.target.value })
    }

    async function CreateProposal() {
        //const calldata = token.interface.encodeFunctionData('transfer', [daoContract, '10000']);
        const calldata = token.interface.encodeFunctionData('transfer', [proposalForm.sendTo, proposalForm.amount]);

        const { config } = usePrepareContractWrite({
            address: daoContract,
            abi: SimpliGovernorABI,
            functionName: "propose",
            args: [[tokenContract], [0], [calldata], proposalForm.description]
        })
        const { data, isLoading, isSuccess, write } = useContractWrite(config)
        // console.log("Inputs Should reflect:", tokenForm.token)
        // // TODO:
        // // Deploy Token Contract with input
        await write().then(result => {
            console.log("Deployed new token:", result);
        }).catch(err=>{
            console.log("Error while deploying token Contract:", err);
        })
    }




    return (
        <form onSubmit={CreateProposal} className="formStyle">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', marginLeft: '15px' }}>
                <h4>DAO Token Expense form</h4>

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

            </div>

            <button type="submit" className="createButton">
                Create Simpli Token
            </button>
        </form>
    )

}