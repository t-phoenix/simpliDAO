import React, { useEffect } from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import FormField from "../FormField";
import { ERC20TokenABI } from "../../ContractABIs/ERC20TokenABI";
import "../../styles/proposalstyle.css";

export default function Delegate({token}){

    const [tokenAddr, setTokenAddr] = React.useState('');

    const [delegate, setDelegate] = React.useState('');
    console.log("Inside Delegation Component", token)
    
    const { config } = usePrepareContractWrite({
        address: tokenAddr,
        abi: ERC20TokenABI,
        functionName: 'delegate',
        args: [delegate]
    })
    const {data, write} = useContractWrite(config)
    

    useEffect(()=>{
        if(token){
            setTokenAddr(token.tokenAddr)
        }
        
    },[])


    async function HandleDelegation(){
        console.log("-->", tokenAddr, delegate)
       
        const delegation = await write();
        console.log("AFTRE DELEGATION ATTEMPT:", delegation);
    }  
    return(
        <div className="formContainer">
            <form className="formInputs">
                <h4>Delegate Votes</h4>
                <p align="left" >Delegate votes to yourself or another address to initialise voting power.</p>
                <FormField 
                    labelName="Token"
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