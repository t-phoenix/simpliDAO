import { getProvider } from "@wagmi/core";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { Factory2_Addr } from "../constants/ContractAddress";
import { SimpliFactory2ABI } from "../ContractABIs/FactoryABI";

export default function DAOexplorer(){
    const fact2Link = `https://mumbai.polygonscan.com/address/${Factory2_Addr}`
    const [daos, setDaos] = useState([]);
    const provider = getProvider();
    const factory2 = new ethers.Contract(Factory2_Addr, SimpliFactory2ABI, provider);

    useEffect(()=>{
        fetchDAOContracts();
    }, [])

    function fetchDAOContracts(){

        let daoEventFilter = factory2.filters.GovernorCreated();
        factory2.queryFilter(daoEventFilter).then((myevents) => {
            // console.log("My Events", myevents);
            let daoList = []
            for (let index = 0; index < myevents.length; index++) {
                const singleEvent = myevents[index];
                console.log("Single Event ", index, ":", singleEvent);
                // setEvents((prevEvents)=> [...prevEvents, {singleEvent.}]);
                let obj = {
                    daoAddr: singleEvent.args.governorAddress,
                    creationTrxn: singleEvent.transactionHash
                }
                daoList.push(obj);
            }
            setDaos(daoList)

        }).catch((err) => {
            console.log("Error while fetching Token Creation events:", err);
        });

    }

    function getLinkedAddress(address) {
        return `https://mumbai.polygonscan.com/address/${address}`

    }

    return (
        <div className="trxn-content">
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '80%'}}>
                <div >
                    <h1>DAO Explorer</h1>
                    <p>All DAO created with Simpli Protocol are listed here</p>
                </div>
                <button style={{marginBlock: '40px'}} onClick={fetchDAOContracts}>Refresh</button>
                
                
            </div>
            <p>Factory2 Factory: <a href={fact2Link} target="blank">{Factory2_Addr}</a></p>

            <div>
            {daos.map((dao) => (
                        // <div key={}>{JSON.stringify(token)}</div>
                        <div key={dao.daoAddr} className="content-container">
                            <h3>DAO Contract Address: <a href={getLinkedAddress(dao.daoAddr)} target="blank" style={{ fontSize: '14px' }}>{dao.daoAddr}</a></h3>
                            <p>Created At: <a href={getLinkedAddress(dao.creationTrxn)} target="blank" style={{ fontSize: '14px' }}>{dao.creationTrxn}</a></p>
                        </div>
                    ))}
            </div>


            

        </div>
    )
}