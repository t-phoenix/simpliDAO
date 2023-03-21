import { prepareWriteContract, readContract, writeContract } from "@wagmi/core";
import React from "react"
import { useLocation } from "react-router-dom"
import { useContractReads } from "wagmi";
import { TimelockControllerABI } from "../ContractABIs/TimelockControllerABI";
import { getLinkedAddress } from "../helper/formatter";

export default function DAOSettings() {
    const { state } = useLocation();
    console.log("State:", state)

    const [roleHash, setRoleHash] = React.useState('');
    const [userAddr, setUserAddr] = React.useState('');
    const [checkRole, setCheckRole] = React.useState('');

    const timelock = {
        address: state.data[4],
        abi: TimelockControllerABI
    }

    const { data } = useContractReads({
        contracts: [
            {
                ...timelock,
                functionName: 'TIMELOCK_ADMIN_ROLE'
            },
            {
                ...timelock,
                functionName: 'EXECUTOR_ROLE'
            },
            {
                ...timelock,
                functionName: 'PROPOSER_ROLE'
            }
        ]
    })

    // console.log("Timelock Data:", data)
    // hasRole, grantRole

    async function fetchRoleResult(){
        const result = await readContract({
            ...timelock,
            functionName: 'hasRole',
            args: [roleHash, userAddr] 
        })
        console.log("Has Role:", result);
        setCheckRole(result);
    }

    return (
        <div>
            <h3>Settings</h3>
            <div>
                <p>{state.daoName}</p>
                <p>DAO: <a href={getLinkedAddress(state.daoAddr)} target="blank" style={{ fontSize: '14px' }}>{state.daoAddr}</a></p>
                <p>Timelock: <a href={getLinkedAddress(state.data[4])} target="blank" style={{ fontSize: '14px' }}>{state.data[4]}</a></p>
            </div>
            <div>

                <p>ADMIN_ROLE: {data[0]}</p>
                <p>EXECUTOR_ROLE: {data[1]}</p>
                <p>PROPOSER_ROLE: {data[2]}</p>

                <div className="single-card">
                    <label>
                        Role Hash:
                        <input
                            value={roleHash}
                            onChange={(e) => setRoleHash(e.target.value)}
                            type='text'
                            step="0.1"
                            placeholder='hash'
                            style={{ margin: '5px' }}
                        />
                    </label>
                    <label>
                        Account:
                        <input
                            value={userAddr}
                            onChange={(e) => setUserAddr(e.target.value)}
                            type='text'
                            step="0.1"
                            placeholder='address'
                            style={{ margin: '5px' }}
                        />
                    </label>

                    <button onClick={fetchRoleResult}>
                        Check Role
                    </button>
                    <p>Result: {checkRole}</p>


                </div>

            </div>
        </div>
    )
}