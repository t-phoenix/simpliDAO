import { prepareWriteContract, readContract, writeContract } from "@wagmi/core";
import React from "react";
import { useLocation } from "react-router-dom";
import { TimelockControllerABI } from "../../ContractABIs/TimelockControllerABI";


export default function Roles() {

    const { state } = useLocation();
    console.log("State:", state)

    const [roleHash, setRoleHash] = React.useState('');
    const [userAddr, setUserAddr] = React.useState('');
    // const [checkRole, setCheckRole] = React.useState('');
    const [result, setResult] = React.useState('');
    const [grantRole, setGrantRole] = React.useState('');


    const timelock = {
        address: state.data[4],
        abi: TimelockControllerABI
    }

    async function fetchRoleResult() {
        const roleResult = await readContract({
            ...timelock,
            functionName: 'hasRole',
            args: [roleHash, userAddr]
        })
        console.log("Has Role:", roleResult);
        setResult(roleResult);
        console.log("Checking Role:", result)
    }

    async function handleGrantRole() {
        const config = await prepareWriteContract({
            ...timelock,
            functionName: 'grantRole',
            args: [roleHash, userAddr]
        })

        const data = await writeContract(config)
        console.log("After Granting Role:", data);
        setGrantRole(data);
    }


    return (
        <>
            <div className="function-card">
                <h3>Role permissions/Grant roles</h3>
                <p>only owner can change roles</p>
                <label style={{ margin: '10px' }}>
                    Role Hash:
                    <input
                        value={roleHash}
                        onChange={(e) => setRoleHash(e.target.value)}
                        type='text'
                        step="0.1"
                        placeholder='hash'

                    />
                </label>
                <label style={{ margin: '10px' }}>
                    Account:
                    <input
                        value={userAddr}
                        onChange={(e) => setUserAddr(e.target.value)}
                        type='text'
                        step="0.1"
                        placeholder='address'

                    />
                </label>
                <div style={{ width: '90%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: '15px', marginBottom: '10px' }}>
                    <button onClick={fetchRoleResult}>
                        Check Role
                    </button>
                    <button onClick={handleGrantRole}>
                        Grant Role
                    </button>

                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                    <p style={{ marginBlock: '8px' }}>Result: {String(result)}</p>
                    <p style={{ marginBlock: '8px' }}>Grant Role Result: {String(grantRole)}</p>
                </div>

            </div>
        </>
    )
}