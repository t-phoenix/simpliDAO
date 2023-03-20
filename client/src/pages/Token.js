import React from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import FormField from "../components/FormField";
import { ERC20TokenABI } from "../ContractABIs/ERC20TokenABI";

export default function TokenScreen(){


    const [tokenAddr, setTokenAddr] = React.useState('');
    const [delegate, setDelegate] = React.useState('');

    
    const { config } = usePrepareContractWrite({
        address: tokenAddr,
        abi: ERC20TokenABI,
        functionName: 'delegate',
        args: [delegate]
    })
    const {data, write} = useContractWrite(config)
    

    async function HandleDelegation(){
        console.log("-->", tokenAddr, delegate)
       
        
        const delegation = await write();
        console.log("AFTRE DELEGATION ATTEMPT:", delegation);
    }   

    

    return (
        <div>
            <h1> TokenScreen</h1>
            <form className="newForm">
                <h2>Delegate Votes based on Tokens</h2>
                <FormField 
                    labelName="token"
                    placeholder="address"
                    inputType="text"
                    value={tokenAddr}
                    handleChange={(e)=> setTokenAddr(e.target.value)}
                />
                <FormField 
                    labelName="Delegate to"
                    placeholder="address"
                    inputType="text"
                    value={delegate}
                    handleChange={(e) => setDelegate(e.target.value)}
                />

                
            </form>

            <button onClick={HandleDelegation}>
                    Submit Transaction
            </button>

        </div>
    )
}