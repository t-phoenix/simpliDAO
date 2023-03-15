import React, { useState } from "react";
import { SimpliFactoryABI } from "../ContractABIs/FactoryABI";
import FormField from '../components/FormField';
import '../styles/createstyle.css';
import { useAccount, usePrepareContractWrite, useContractWrite } from 'wagmi';

export default function TimelockForm() {

    const factory1 = "0xD6ff05a3Ef112A5dc5CCc7216414F61fe79e1095";
    const proposers = [];
    const executors = ['0x0000000000000000000000000000000000000000'];

    const [timelockForm, settimelockForm] = useState({
        delay: '',
        admin: ''
    });



    const handleFormFieldChange = (fieldName, e) => {
        settimelockForm({ ...timelockForm, [fieldName]: e.target.value })
    }


    const account = useAccount();
    // console.log("Check Connected Account:", account.address);
    const { config } = usePrepareContractWrite({
        address: factory1,
        abi: SimpliFactoryABI,
        functionName: "createTimeLock",
        args: [timelockForm.delay, proposers, executors, timelockForm.admin]
    })
    const { data, isLoading, isSuccess, write } = useContractWrite(config)


    async function createSimpliTimelock() {
        console.log("Inputs are doing great please:", timelockForm);
        await write().then(timelockAddr => {
            console.log("PLease Deploy new TIMELOCK:", timelockAddr)
        })

    }

    return (
        <form onSubmit={createSimpliTimelock} className="formStyle">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', marginLeft: '15px' }}>
                <h3>Timelock Inputs</h3>

                <FormField
                    labelName="Execution Delay"
                    placeholder="timelock"
                    inputType="numeric"
                    value={timelockForm.delay}
                    handleChange={(e) => handleFormFieldChange('delay', e)}
                />
                {/* <FormField
                    labelName="Proposers"
                    placeholder="address[]"
                    inputType="text"
                    value={timelockForm.proposers}
                    handleChange={(e) => handleFormFieldChange('proposers', e)}
                /> */}
                {/* <FormField
                    labelName="Executors"
                    placeholder="IMMUTABLE"
                    inputType="text"
                    value={timelockForm.executors}
                    handleChange={}
                /> */}
                <p>Anyone can execute</p>
                <FormField
                    labelName="Admin"
                    placeholder="address"
                    inputType="text"
                    value={timelockForm.admin}
                    handleChange={(e) => handleFormFieldChange('admin', e)}
                />

            </div>


            <p style={{ marginLeft: '15px',marginBlock:'10px', width: '400px', textAlign: 'start', }}>Signer will automatically be placed as admin of contracts, while some parameters are set by our protocol and can be customised usign DAO methods</p>
            <button type="submit" className="createButton">
                Create Simpli Timelock
            </button>

        </form>
    )
}