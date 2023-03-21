import React, { useEffect } from "react";
import FormField from "../FormField";
import { ERC20TokenABI } from "../../ContractABIs/ERC20TokenABI";
import "../../styles/proposalstyle.css";
import { readContract, prepareWriteContract, writeContract } from "@wagmi/core";
import { toETHdenomination } from "../../helper/formatter";

export default function TransferOwner({ token }) {

    const [tokenAddr, setTokenAddr] = React.useState();
    const [newOwner, setNewOwner] = React.useState('');
    const [result, setResult] = React.useState('');

    useEffect(()=>{
        if(token){
            setTokenAddr(token.tokenAddr);
        }
    },[])

    async function ChangeOwner(){
        const config = await prepareWriteContract({
            address: tokenAddr,
            abi: ERC20TokenABI,
            functionName: 'transferOwnership',
            args: [newOwner]
        })
        const data = await writeContract(config)
        console.log("Changing Ownership:", data);
        setResult(data);
    }
    
    
    return (
        <div className="formContainer">
            <form className="formInputs">
                <h4>Transfer Owner</h4>
                <p>Only owner can access this.</p>
                <FormField
                    labelName="Token"
                    placeholder="address"
                    inputType="text"
                    value={tokenAddr}
                    handleChange={(e) => setTokenAddr(e.target.value)}
                />
                <FormField
                    labelName="New Owner"
                    placeholder="address"
                    inputType="text"
                    value={newOwner}
                    handleChange={(e) => setNewOwner(e.target.value)}
                />
            </form>

            <button >
                Change Owner
            </button>

            <div onClick={ChangeOwner}>
                {result && <p>Result: {String(result)}</p>}
            </div>
        </div>
    )
}