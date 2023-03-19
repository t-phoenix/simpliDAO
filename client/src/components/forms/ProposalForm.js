import React, { useEffect, useState } from "react";
import { SimpliFactoryABI } from "../../ContractABIs/FactoryABI";
import FormField from '../FormField';
import '../../styles/proposalstyle.css';
import { useAccount, usePrepareContractWrite, useContractWrite, useProvider } from 'wagmi';
import { Factory1_Addr } from "../../constants/ContractAddress";
import { useLocation, useNavigate } from "react-router-dom";
import { SimpliGovernorABI } from "../../ContractABIs/GovernorABI";
import { ethers } from "ethers";
import { ERC20TokenABI } from "../../ContractABIs/ERC20TokenABI";
import { getLinkedAddress } from "../../helper/formatter";





export default function ProposalForm() {

    // const location = useLocation();
    // const { state }= useLocation()
    // const data = location.state?.data;
    // const navigate = useNavigate();
    // console.log("Current Location State:", state);
    // console.log("Use Location Data:", data)
    // const daoContract = location.daoAddr;
    // const tokenAddr = location.state.data[3];
    const provider = useProvider();
    const account = useAccount();
    console.log("Check Connected Account:", account.address);

    const [proposalForm, setProposalForm] = useState({
        daoAddr: '',
        tokenAddr: '',
        sendTo: '',
        amount: '',
        description: ''
    });


    const token = new ethers.Contract('0x1158EE5AC602F9517C8D9C02b5b67B70DD991E66', ERC20TokenABI, provider)
    // console.log("Proposal Form sendto:", proposalForm.sendTo);

    const calldata = token.interface.encodeFunctionData('transfer', ['0x2F15F9c7C7100698E10A48E3EA22b582FA4fB859', 6600]);
    // const calldata = token.interface.encodeFunctionData('transfer', [proposalForm.sendTo, proposalForm.amount]);
    console.log("Call data from ethers;", calldata);

    const { config } = usePrepareContractWrite({
        address: '0xBC7Bf8FF8a67c274fA161326696D32C7bB8Fc3bf',
        abi: SimpliGovernorABI,
        functionName: "propose",
        args: [['0x1158EE5AC602F9517C8D9C02b5b67B70DD991E66'], [0], [calldata], 'fund clone troopers'],
    })

    // console.log("Prepare contract write config:", config);
    const { data, isLoading, isSuccess, write } = useContractWrite(config)




    const handleFormFieldChange = (fieldName, e) => {
        setProposalForm({ ...proposalForm, [fieldName]: e.target.value })
    }

    async function CreateProposalButton() {


        // console.log("Contract Write data:", data);
        await write().then(result => {
            console.log("Deployed new token:", result);
        }).catch(err => {
            console.log("Error while deploying token Contract:", err);
        })

        // navigate(`/create-proposal/${location.state.daoName}`, {state: location.state})
    }




    return (
        <form onSubmit={CreateProposalButton} className="newForm">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', marginLeft: '15px' }}>
                <h4>DAO Token Expense form</h4>
                {/* <a href={getLinkedAddress(tokenAddr)} target="blank" style={{ fontSize: '14px' }}>{tokenAddr}</a> */}
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

                {/* <FormField
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
                /> */}

            </div>

            <button type="submit" className="createButton">
                Create Simpli Token
            </button>
        </form>
    )

}