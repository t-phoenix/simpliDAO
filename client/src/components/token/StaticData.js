import React from "react";
import { readContracts } from "@wagmi/core";
import { ERC20TokenABI } from "../../ContractABIs/ERC20TokenABI";
import "../../styles/proposalstyle.css";
import FormField from "../FormField";
import { toETHdenomination } from "../../helper/formatter";

export default function StaticData({ token }) {
    const [tokenAddr, setTokenAddr] = React.useState();
    const [result, setResult] = React.useState([]);

    React.useEffect(() => {
        FetchTokenData()
        if (token) {
            setTokenAddr(token.tokenAddr);
        }
        
    }, [])



    async function FetchTokenData() {
        const tokenContract = {
            address: tokenAddr,
            abi: ERC20TokenABI
        }
        const tokenData = await readContracts({
            contracts: [
                {
                    ...tokenContract,
                    functionName: 'name'
                },
                {
                    ...tokenContract,
                    functionName: 'symbol'
                },
                {
                    ...tokenContract,
                    functionName: 'owner'
                },
                {
                    ...tokenContract,
                    functionName: 'totalSupply'
                },
                {
                    ...tokenContract,
                    functionName: 'decimals'
                },
            ]
        })
        console.log("Token Data:", tokenData)
        setResult(tokenData)

    }

    return (
        <div className="formContainer">
            <form className="formInputs">
                <h4>General Data</h4>
                <FormField
                    labelName="Token"
                    placeholder="address"
                    inputType="text"
                    value={tokenAddr}
                    handleChange={(e) => setTokenAddr(e.target.value)}
                />
            </form>

            <button onClick={FetchTokenData}>
                Get Data
            </button>

            <div>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <p>Name: {result[0]}</p>
                    <p>Symbol: {result[1]}</p>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <p>Supply: {toETHdenomination(Number(result[3]))}</p>
                    <p>Decimals: {result[4]}</p>

                </div>
                <p>Onwer: {result[2]}</p>
            </div>
        </div>
    )
}