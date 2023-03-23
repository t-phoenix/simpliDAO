import React, { useEffect, useState } from "react";
import { Factory2_Addr } from "../../constants/ContractAddress";
import { SimpliFactory2ABI } from "../../ContractABIs/FactoryABI";
import FormField from '../FormField';
import '../../styles/createstyle.css';
import { useAccount, usePrepareContractWrite, useContractWrite } from 'wagmi';


export default function GovernorForm() {



    // const factory2 = "0x5eCAa778B2E7352d83a51148aFB38e1890951192";
    const { address } = useAccount();


    const [governorForm, setGovernorForm] = useState({
        daoName: '',
        tokenAddr: '',
        timelockAddr: '',
        admin: ''
    });

    useEffect(() => {
        if (address) {
            setGovernorForm({ ...governorForm, admin: address });
        }
    }, [])



    const account = useAccount();
    console.log("Check Connected Account:", account.address);
    const { config } = usePrepareContractWrite({
        address: Factory2_Addr,
        abi: SimpliFactory2ABI,
        functionName: "createGovernor",
        args: [governorForm.daoName, governorForm.tokenAddr, governorForm.timelockAddr, governorForm.admin]
    })
    const { data, isLoading, isSuccess, write } = useContractWrite(config)



    const handleFormFieldChange = (fieldName, e) => {
        setGovernorForm({ ...governorForm, [fieldName]: e.target.value })
    }

    async function createSimpliDAO() {
        console.log("Inputs Should reflect:", governorForm.tokenAddr)
        // TODO:
        // Deploy Token Contract with input
        await write().then(governorAddr => {
            console.log("PLease Deploy new token:", governorAddr)
        })
    }
    return (
        <form onSubmit={createSimpliDAO} className="formStyle">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', marginLeft: '15px' }}>
                <h3> Governor Inputs (Manual)</h3>
                <FormField
                    labelName="DAO Name"
                    placeholder="name"
                    inputType="text"
                    value={governorForm.daoName}
                    handleChange={(e) => handleFormFieldChange('daoName', e)}
                />

                <FormField
                    labelName="Token"
                    placeholder="address"
                    inputType="text"
                    value={governorForm.tokenAddr}
                    handleChange={(e) => handleFormFieldChange('tokenAddr', e)}
                />

                <FormField
                    labelName="Timelock"
                    placeholder="address"
                    inputType="text"
                    value={governorForm.timelockAddr}
                    handleChange={(e) => handleFormFieldChange('timelockAddr', e)}
                />

                <FormField
                    labelName="Admin "
                    placeholder="address"
                    inputType="text"
                    value={governorForm.admin}
                    handleChange={(e) => handleFormFieldChange('admin', e)}
                />

            </div>

            <button type="submit" className="createButton">
                Create Simpli DAO
            </button>
        </form>
    )
}