import React, { useEffect } from "react";
import '../styles/txnstyle.css';
import { getProvider } from "@wagmi/core";
import { ethers } from "ethers";

import { Factory1_Addr, Factory2_Addr } from "../constants/ContractAddress";
import { SimpliFactoryABI } from "../ContractABIs/FactoryABI";
import { useNavigate } from "react-router-dom";


export default function TxnScreen() {
    const navigate = useNavigate();
    const fact1Link = `https://mumbai.polygonscan.com/address/${Factory1_Addr}`

    const [tokens, setTokens] = React.useState([]);
    const [timelocks, setTimelocks] = React.useState([]);
    const provider = getProvider();
    const factory1 = new ethers.Contract(Factory1_Addr, SimpliFactoryABI, provider);
    // console.log("Connected Provider:", provider)
    useEffect(() => {
        fetchCreatedContracts();
    }, [])


    function fetchCreatedContracts() {

        let tokenEventFilter = factory1.filters.NewERC20TokenCreated();
        factory1.queryFilter(tokenEventFilter).then((myevents) => {
            // console.log("My Events", myevents);
            let tokenList = []
            for (let index = 0; index < myevents.length; index++) {
                const singleEvent = myevents[index];
                console.log("Single Event ", index, ":", singleEvent);
                // setEvents((prevEvents)=> [...prevEvents, {singleEvent.}]);
                let obj = {
                    tokenName: singleEvent.args.name,
                    tokenSymbol: singleEvent.args.symbol,
                    tokenAddr: singleEvent.args.contractAddress,
                    creationTrxn: singleEvent.transactionHash
                }
                tokenList.push(obj);
            }
            setTokens(tokenList)

        }).catch((err) => {
            console.log("Error while fetching Token Creation events:", err);
        });

        let timelockEventFilter = factory1.filters.NewTimelockControllerCreated();
        factory1.queryFilter(timelockEventFilter).then((timelockEvents) => {
            let timelockList = []
            for (let index = 0; index < timelockEvents.length; index++) {
                const singleEvent = timelockEvents[index];

                let obj = {
                    timelockAdmin: singleEvent.args.admin,
                    timelockAddr: singleEvent.args.timelockControllerAddress,
                    creationTrxn: singleEvent.transactionHash
                }
                timelockList.push(obj);
            }
            setTimelocks(timelockList)
        }).catch((err) => {
            console.log("Error While fetching timelock creation events:", err);
        })
    }



    function getLinkedAddress(address) {
        return `https://mumbai.polygonscan.com/address/${address}`
    }

    function handleTokenCard(token) {
        console.log("TOken Card NAme:", token.tokenName)
        navigate('/token', { state: token })
    }



    return (
        <div className='trxn-content'>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '90%' }}>
                <div>
                    <h1>Factory1 Contract Transactions</h1>
                    <p>Factory1 Contract: <a href={fact1Link} target="blank">{Factory1_Addr}</a></p>
                </div>
                <button style={{ marginBlock: '40px' }} onClick={fetchCreatedContracts}>Refresh</button>
            </div>


            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div className="list-container">
                    <div className="trxn-header">
                        <h3>ERC20 Tokens</h3>
                        <p>List of tokens Created Using Simpli Protocol. Create your's <button onClick={() => navigate('/create')} >here</button></p>
                        <p>You can import the token in metamask, for simple transfer functions, or head onto token Screen for advance features used by Simpli Protocol to be used with Governor for tracking voting power</p>
                        {tokens.length == 0 && <div><h2>Connect Wallet</h2> <h2>Testnet Supported: ploygon-mumbai</h2></div>}

                    </div>
                    <div style={{ overflow: 'scroll' }}>
                        {tokens.map((token) => (
                            // <div key={}>{JSON.stringify(token)}</div>
                            <div key={token.tokenAddr} className="content-container">
                                <h3>{token.tokenName}({token.tokenSymbol}): <a href={getLinkedAddress(token.tokenAddr)} target="blank" style={{ fontSize: '14px' }}>{token.tokenAddr}</a></h3>
                                <p>Created At: <a href={getLinkedAddress(token.creationTrxn)} target="blank" style={{ fontSize: '14px' }}>{token.creationTrxn}</a></p>
                                <button onClick={() => handleTokenCard(token)}>Token Functions</button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="list-container">
                    <div className="trxn-header">
                        <h3>Timelock Controllers</h3>
                        <p>Deployed for Governor Contract</p>
                        <p>Contract to be used with Governor for DAO and functions will be accessible on DAO Interface.</p>
                        {timelocks.length == 0 && <div><h2>Connect Wallet</h2> <h2>Testnet Supported: ploygon-mumbai</h2></div>}

                    </div>
                    {timelocks.map((timelock) => (
                        // <div key={}>{JSON.stringify(token)}</div>
                        <div key={timelock.timelockAddr} className="content-container">
                            <h3>Timelock Address: <a href={getLinkedAddress(timelock.timelockAddr)} target="blank" style={{ fontSize: '14px' }}>{timelock.timelockAddr}</a></h3>
                            <p>Created At: <a href={getLinkedAddress(timelock.creationTrxn)} target="blank" style={{ fontSize: '14px' }}>{timelock.creationTrxn}</a></p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}