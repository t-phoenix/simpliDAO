import React, { useEffect } from "react";
import FormField from "../FormField";
import { ERC20TokenABI } from "../../ContractABIs/ERC20TokenABI";
import "../../styles/proposalstyle.css";
import { readContract } from "@wagmi/core";
import { toETHdenomination } from "../../helper/formatter";


export default function Balance({token}){
    const [tokenAddr, setTokenAddr] = React.useState();
    const [userAddr, setUserAddr] = React.useState('');
    const [result, setResult] = React.useState('');
    console.log("Inside Delegation Component", token)
    
    
    useEffect(()=>{
        if(token){
            setTokenAddr(token.tokenAddr);
        }
    },[])

    async function HandleGetBalance(){
        console.log("-->", tokenAddr, userAddr)

        const data = await readContract({
            address: tokenAddr,
            abi: ERC20TokenABI,
            functionName: 'balanceOf',
            args: [userAddr]
        })
       
        
        console.log("AFTRE Balance ATTEMPT:", data, toETHdenomination(Number(data)));
        setResult(toETHdenomination(Number(data)));
    }  

    return (
        <div className="formContainer">
            <form className="formInputs">
                <h4>Balance of User</h4>
                <FormField 
                    labelName="Token"
                    placeholder="address"
                    inputType="text"
                    value={tokenAddr}
                    handleChange={(e)=> setTokenAddr(e.target.value)}
                />
                <FormField 
                    labelName="User"
                    placeholder="address"
                    inputType="text"
                    value={userAddr}
                    handleChange={(e) => setUserAddr(e.target.value)}
                />                
            </form>

            <button onClick={HandleGetBalance}>
                    Get Balance
            </button>

            <div>
                {result && <p>Result: {result}</p>}
            </div>
        </div>
    )
}