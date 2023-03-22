import { ethers } from "ethers";
import React from "react"
import { useLocation } from "react-router-dom"
import { useContractRead, useContractReads } from "wagmi";
import { prepareWriteContract, readContract, writeContract } from "@wagmi/core";
import { ERC20TokenABI } from "../ContractABIs/ERC20TokenABI";
import { SimpliGovernorABI } from "../ContractABIs/GovernorABI";
import { toETHdenomination } from "../helper/formatter";

export default function ProposalDetails() {

    const { state } = useLocation();
    console.log("State of APP:", state);

    const tokenInterface = new ethers.utils.Interface(ERC20TokenABI);
    const decodeData = tokenInterface.decodeFunctionData('transfer', state.proposal.callDatas[0])
    console.log("Decoded Data:", decodeData);

    const governor = ({
        address: state.daoAddr,
        abi: SimpliGovernorABI
    })

    const { data, isError, isLoading } = useContractReads({
        contracts: [
            {
                address: state.daoAddr,
                abi: SimpliGovernorABI,
                functionName: 'proposalVotes',
                args: [state.proposal.proposalId]
            },
            {
                address: state.proposal.targets[0],
                abi: ERC20TokenABI,
                functionName: 'symbol'
            }

        ]
    })

    console.log("Proposal Votes:", data);

    async function handleVote(votePref) {
        if (votePref == 0) {
            console.log("Vote FOR Proposal");
            const config = await prepareWriteContract({
                ...governor,
                functionName: 'castVote',
                args: [state.proposal.proposalId, 0]
            })
    
            const data = await writeContract(config)
            console.log("After Granting Role:", data);

        } else if (votePref == 1) {
            console.log("Vote against proposal");
            const config = await prepareWriteContract({
                ...governor,
                functionName: 'castVote',
                args: [state.proposal.proposalId, 1]
            })
    
            const data = await writeContract(config)
            console.log("After Granting Role:", data);

        } else if (votePref == 2) {
            console.log("Vote abstain proposal")
            const config = await prepareWriteContract({
                ...governor,
                functionName: 'castVote',
                args: [state.proposal.proposalId, 1]
            })
    
            const data = await writeContract(config)
            console.log("After Granting Role:", data);
        }
    }

    async function queueProposal(){
        const descriptionHash = ethers.utils.id(state.proposal.description)
        console.log("PROP QUEUE:",  state.proposal.description, descriptionHash)

        const config = await prepareWriteContract({
            ...governor,
            functionName: 'queue',
            args: [state.proposal.targets, state.proposal.values, state.proposal.callDatas, descriptionHash]
        })

        const data = await writeContract(config)
        console.log("After Queuing Proposal:", data);
    }

    async function executeProposal(){
        const descriptionHash = ethers.utils.id(state.proposal.description)
        const config = await prepareWriteContract({
            ...governor,
            functionName: 'execute',
            args: [state.proposal.targets, state.proposal.values, state.proposal.callDatas, descriptionHash]
        })

        const data = await writeContract(config)
        console.log("After Executing Proposal:", data);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', }}>
            <h3>DAO Proposal Details</h3>
            <p>Description: {state.proposal.description}</p>
            <p>Proposal State: {state.proposal.proposalState}</p>
            <div style={{ display: 'flex', flexDirection: 'row', }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', padding: '10px' }}>
                    <h4>Proposal States</h4>
                    <p>0 Pending</p>
                    <p>1 Active</p>
                    <p>2 Cancelled</p>
                    <p>3 Defeated</p>
                    <p>4 Succeded</p>
                    <p>5 Queued</p>
                    <p>6 Expired</p>
                    <p>7 Executed </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', marginLeft: '40px', padding: '10px' }}>
                    <p>{state.daoName}:{state.daoAddr}</p>
                    <p>Proposer's Address: {state.proposal.proposer}</p>
                    <p>Proposal Id: {state.proposal.proposalId}</p>
                    <p>Transaction Hash: {state.proposal.transactionHash}</p>
                    <p>Voting Start (block): {state.proposal.votingStartDate}</p>
                    <p>Voting End (block): {state.proposal.votingEndDate}</p>
                    {data && <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', width: '70%' }}>
                        <p>Votes For: {toETHdenomination(Number(data[0].forVotes))}</p>
                        <p>Votes Against: {toETHdenomination(Number(data[0].againstVotes))}</p>
                        <p>Votes Abstain: {toETHdenomination(Number(data[0].abstainVotes))}</p>
                    </div>}

                    <p>Decoded Data: (for simple proposal)</p>
                    <p>Amount Receiver: {decodeData.to}</p>
                    {data && <p>Amount: {Number(decodeData.amount)} {data[1]}</p>}

                </div>

            </div>
            {state.proposal.proposalState == 1 ? <div >
                
                <div style={{ marginBlock: '2%', width: '90%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                <button onClick={() => handleVote(0)}>
                    Against
                </button>
                <button onClick={() => handleVote(1)}>
                    For
                </button>
                <button onClick={() => handleVote(2)}>
                    Abstain
                </button>
                </div>
                <p style={{fontSize: '12px'}}>Check your voting power on token Screen before voting.</p>

            </div> : <div></div>}
            {state.proposal.proposalState == 2 ? <div><h3>Proposal Cancelled</h3></div>: <div></div> }
            {state.proposal.proposalState == 3 ? <div><h3>Proposal Defeated</h3></div>: <div></div> }
            {state.proposal.proposalState == 4 ? <div>
                <p>Proposal Succeded</p>
                <button style={{marginTop: '15px', marginBottom: '25px'}} onClick={queueProposal}>Queue</button>
            </div> :<div></div> }
            {state.proposal.proposalState == 5 ? <div>
                <p>Proposal Queued</p>
                <button style={{marginTop: '15px', marginBottom: '25px'}} onClick={executeProposal}>Execute</button>
            </div> :<div></div> }
            {state.proposal.proposalState == 6 ? <div><h3>Proposal Expired</h3></div>: <div></div> }
            {state.proposal.proposalState == 7 ? <div><h3>Proposal Executed</h3></div>: <div></div> }



        </div>
    );
}