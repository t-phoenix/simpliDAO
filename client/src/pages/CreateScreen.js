import React, { useState } from "react";
import ComponentFromABI from "../components/ComponentFromABI";
import { SimpliFactoryABI } from "../ContractABIs/FactoryABI";
import FormField from '../components/FormField';
import '../styles/dashstyle.css';
import {createToken} from '../services/factoryServices';
import { useAccount, usePrepareContractWrite, useContractWrite } from 'wagmi';


export default function CreateScreen() {

    const factory1 = "0xD6ff05a3Ef112A5dc5CCc7216414F61fe79e1095";
    const factory2 = "0x5eCAa778B2E7352d83a51148aFB38e1890951192";
    const fact1Link = `https://mumbai.polygonscan.com/address/${factory1}`
    const fact2Link = `https://mumbai.polygonscan.com/address/${factory2}`

    

    const [tokenForm, setTokenForm] = useState({
        token: '',
        symbol: '',
        supply: '',
        delay: '',
        proposers: ''
    });

    const account = useAccount();
    // const { config } = usePrepareContractWrite({
    //     address: factory1,
    //     abi: SimpliFactoryABI,
    //     functionName: "createToken",
    //     args: [tokenForm.token, tokenForm.symbol, tokenForm.symbol, account]
    // })
    // const { data, isLoading, isSuccess, write } = useContractWrite(config)



    const handleFormFieldChange = (fieldName, e) => {
        setTokenForm({ ...tokenForm, [fieldName]: e.target.value })
    }

    async function createSimpliDAO() {
        console.log("Inputs Should reflect:", tokenForm.token)
        // TODO:
        // Deploy Token Contract with input
        // await write().then(tokenAddr=>{
        //     console.log("PLease Deploy new token:", tokenAddr)
        // })
        

        // Deploy Timelock Contract With inputs
        // Deploy Governor using above two contract address.
        //

    }


    const abi = SimpliFactoryABI
    const components = ComponentFromABI(abi);
    return (
        <div>
            <h1> DASHBOARD screen</h1>
            <p>Factory1 Contract: <a href={fact1Link} target="blank">{factory1}</a></p>
            <p>Factory2 Contract: <a href={fact2Link} target="blank">{factory2}</a></p>
            {/* {components.map((Component, compIndex) => (
                <div key={compIndex}>
                    <Component abi={abi} index={compIndex} />
                </div>
            ))} */}

            <h1>Simple form</h1>

            <form onSubmit={createSimpliDAO} className="formStyle">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', marginLeft: '15px' }}>
                    <p> Token Inputs</p>
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

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', marginLeft: '15px' }}>
                    <p>Timelock Inputs</p>

                    {/* <FormField
                        labelName="Execution Delay"
                        placeholder="timelock"
                        inputType="numeric"
                        value={tokenForm.delay}

                        handleChange={(e) => handleFormFieldChange('delay', e)}
                    />
                    <FormField
                        labelName="Proposers"
                        placeholder="address[]"
                        inputType="text"
                        value={tokenForm.proposers}

                        handleChange={(e) => handleFormFieldChange('proposers', e)}
                    /> */}
                </div>

                <p style={{margin: '5px', width: '400px'}}>Signer will automatically be placed as admin of contracts, while some parameters are set by our protocol and can be customised usign DAO methods</p>





                <button type="submit" style={{marginLeft: '100px'}}>
                    Create Simpli DAO
                </button>
            </form>
        </div>
    )
}