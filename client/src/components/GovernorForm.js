import React, { useState } from "react";
import { SimpliFactory2ABI } from "../ContractABIs/FactoryABI";
import FormField from '../components/FormField';
import '../styles/createstyle.css';
import { useAccount, usePrepareContractWrite, useContractWrite } from 'wagmi';


export default function GovernorForm(){


    const factory2 = "0x5eCAa778B2E7352d83a51148aFB38e1890951192";


    const [governorForm, setGovernorForm] = useState({
        tokenAddr: '',
        timelockAddr: '',
    });

    const account = useAccount();
    console.log("Check Connected Account:", account.address);
    const { config } = usePrepareContractWrite({
        address: factory2,
        abi: SimpliFactory2ABI,
        functionName: "createGovernor",
        args: [governorForm.tokenAddr, governorForm.timelockAddr]
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
                        labelName="Token Addr"
                        placeholder="address"
                        inputType="text"
                        value={governorForm.tokenAddr}
                        handleChange={(e) => handleFormFieldChange('tokenAddr', e)}
                    />

                    <FormField
                        labelName="Timelock Addr"
                        placeholder="address"
                        inputType="text"
                        value={governorForm.timelockAddr}
                        handleChange={(e) => handleFormFieldChange('timelockAddr', e)}
                    />

                </div>

                <button type="submit" className="createButton">
                    Create Simpli DAO
                </button>
            </form>
    )
}