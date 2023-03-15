import React, { useState } from "react";
import { SimpliFactoryABI } from "../ContractABIs/FactoryABI";
import FormField from '../components/FormField';
import '../styles/createstyle.css';
import { useAccount, usePrepareContractWrite, useContractWrite } from 'wagmi';


export default function TokenForm(){


    const factory1 = "0xD6ff05a3Ef112A5dc5CCc7216414F61fe79e1095";



    const [tokenForm, setTokenForm] = useState({
        token: '',
        symbol: '',
        supply: 10000,
    });

    const account = useAccount();
    console.log("Check Connected Account:", account.address);
    const { config } = usePrepareContractWrite({
        address: factory1,
        abi: SimpliFactoryABI,
        functionName: "createToken",
        args: [tokenForm.token, tokenForm.symbol, tokenForm.supply, account.address]
    })
    const { data, isLoading, isSuccess, write } = useContractWrite(config)



    const handleFormFieldChange = (fieldName, e) => {
        setTokenForm({ ...tokenForm, [fieldName]: e.target.value })
    }

    async function createSimpliToken() {
        console.log("Inputs Should reflect:", tokenForm.token)
        // TODO:
        // Deploy Token Contract with input
        await write().then(tokenAddr => {
            console.log("PLease Deploy new token:", tokenAddr)
        })
    }




    return(
        <form onSubmit={createSimpliToken} className="formStyle">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', marginLeft: '15px' }}>
                    <h3> Token Inputs</h3>
                    <FormField
                        labelName="Your Project Name"
                        placeholder="token"
                        inputType="text"
                        value={tokenForm.token}
                        handleChange={(e) => handleFormFieldChange('token', e)}
                    />

                    <FormField
                        labelName="symbol"
                        placeholder="initials"
                        inputType="text"
                        value={tokenForm.symbol}
                        handleChange={(e) => handleFormFieldChange('symbol', e)}
                    />

                    <FormField
                        labelName="Initial supply"
                        placeholder="of token"
                        inputType="numeric"
                        value={tokenForm.supply}

                        handleChange={(e) => handleFormFieldChange('supply', e)}
                    />

                </div>






                <button type="submit" className="createButton">
                    Create Simpli Token
                </button>
            </form>
    )

}