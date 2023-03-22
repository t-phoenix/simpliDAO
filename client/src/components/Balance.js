import React from "react"
import { useContractReads } from "wagmi"
import { ERC20TokenABI } from "../ContractABIs/ERC20TokenABI"
import { toETHdenomination } from "../helper/formatter"

export default function Balance({token, user}){
    const tokenContract = {
        address: token,
        abi: ERC20TokenABI
    }

    console.log("Balance Props:", user)

    const {data, isError, isLoading } = useContractReads({
        contracts: [
            {...tokenContract, functionName: 'balanceOf', args: [user]},
            {...tokenContract, functionName: 'name'}
            
        ]
    })

    console.log("Balance of user: ", data);

    return(
        <div>
            {!isLoading  && <p>Treasury Balance: {toETHdenomination(Number(data[0]))} {data[1]}</p>}
        </div>
    )
}