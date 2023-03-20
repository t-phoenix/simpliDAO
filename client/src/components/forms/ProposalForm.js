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

    // const location = useLocation();
    const { state }= useLocation()
    const DAOdata = state?.data;
    // const navigate = useNavigate();
    console.log("MY Location DATA:", state.daoAddr, DAOdata);
    // console.log("Use Location Data:", data)
    // const daoContract = location.daoAddr;
    // const tokenAddr = location.state.data[3];
    const provider = useProvider();
    const account = useAccount();
    console.log("Check Connected Account:", account.address);

    const [proposalForm, setProposalForm] = useState({
        sendTo: '',
        amount: '',
        description: ''
    });


    const token = new ethers.Contract(DAOdata[3], ERC20TokenABI, provider)
    // console.log("Proposal Form sendto:", proposalForm.sendTo);

    // const calldata = token.interface.encodeFunctionData('transfer', [proposalForm.sendTo, proposalForm.amount]);
    // const calldata = token.interface.encodeFunctionData('transfer', [proposalForm.sendTo, proposalForm.amount]);
    // console.log("Call data from ethers;", calldata);

    
    // const { config } = usePrepareContractWrite({
    //     address: state.daoAddr,
    //     abi: SimpliGovernorABI,
    //     functionName: "propose",
    //     args: [['0x1158EE5AC602F9517C8D9C02b5b67B70DD991E66'], [0], [token.interface.encodeFunctionData('transfer', [proposalForm.sendTo, proposalForm.amount])], 'fund clone troopers'],

    // })

    // // console.log("Prepare contract write config:", config);
    // const { data, isLoading, isSuccess, write } = useContractWrite(config)

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

        // await write().then(result => {
        //     console.log("Deployed new token:", result);
        // }).catch(err => {
        //     console.log("Error while deploying token Contract:", err);
        // })

        // navigate(`/create-proposal/${location.state.daoName}`, {state: location.state})
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
                {/* <FormField 
                    labelName="Governor"
                    placeholder="address"
                    inputType="text"
                    value={proposalForm.daoAddr}
                    handleChange={(e) => handleFormFieldChange('daoAddr', e)}
                
                />
                <FormField 
                    labelName="Token"
                    placeholder="address"
                    inputType="text"
                    value={proposalForm.tokenAddr}
                    handleChange={(e) => handleFormFieldChange('tokenAddr', e)}
                
                /> */}

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