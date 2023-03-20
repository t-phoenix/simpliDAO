import { useState, useEffect } from 'react';
// import { proposals } from '../constants';
import { getProvider, readContract } from "@wagmi/core";
import { ethers } from 'ethers';
import { useLocation } from 'react-router-dom';
import { SimpliGovernorABI } from '../ContractABIs/GovernorABI';


export default function ProposalList({ daoData }) {
    const provider = getProvider();
    const { state } = useLocation();
    console.log("Propsal List DATA: ", daoData, "state", state);
    const daoContract = new ethers.Contract(state.daoAddr, SimpliGovernorABI, provider);


    const [proposals, setProposals] = useState([]);

    useEffect(() => {
        fetchProposals()
    }, [])

    async function fetchProposals() {
        const proposalList = []
        const proposalCreatedFilter = daoContract.filters.ProposalCreated();
        const proposalCreatedEvent = await daoContract.queryFilter(proposalCreatedFilter);

        for (let index = 0; index < proposalCreatedEvent.length; index++) {
            const createEvent = proposalCreatedEvent[index];
            // console.log("Proposal Create Event:", createEvent)
            const propState = await readContract({
                address: state.daoAddr,
                abi: SimpliGovernorABI,
                functionName: 'state',
                args: [String(createEvent.args.proposalId)]
            })
            console.log("Proposal STATE:", propState)
            proposalList.push({
                key: index,
                proposalId: String(createEvent.args.proposalId),
                header: createEvent.blockHash,
                transactionHash: createEvent.transactionHash,
                description: createEvent.args.description,
                proposer: createEvent.args.proposer,
                votingStartDate: Number(createEvent.args.startBlock),
                votingEndDate: Number(createEvent.args.endBlock),
                proposalState: propState,
                targets: createEvent.args.targets,
                //values: createEvent.args.values,
                callDatas: createEvent.args.calldatas
            })
        }
        console.log("Proposal List", proposalList)
        setProposals(proposalList);
    }


    function handleProposalCard(){
        
    }

    return (
        <>
        { proposals == [] ? <div>No Proposals Detected</div> : 
        <div className='cards-container'>

            {proposals.map((proposal) =>
                <div key={proposal.key} className='token-card' onClick={handleProposalCard}>
                    <h4>{proposal.proposalId}</h4>
                    <p>Description: {proposal.description}</p>
                    <p>Start: {proposal.votingStartDate}</p>
                    <p>End: {proposal.votingEndDate}</p> 
                    <p>Status: {proposal.proposalState}</p>
                </div>
            )}

        </div>}
        </>
    )
}