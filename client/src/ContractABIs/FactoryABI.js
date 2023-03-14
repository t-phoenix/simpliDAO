
export const SimpliFactoryABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "contractAddress",
                "type": "address"
            }
        ],
        "name": "NewERC20TokenCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "timelockControllerAddress",
                "type": "address"
            }
        ],
        "name": "TimelockControllerCreated",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "votingPeriod",
                "type": "uint256"
            },
            {
                "internalType": "address[]",
                "name": "proposers",
                "type": "address[]"
            },
            {
                "internalType": "address[]",
                "name": "executors",
                "type": "address[]"
            },
            {
                "internalType": "address",
                "name": "admin",
                "type": "address"
            }
        ],
        "name": "createTimeLock",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "symbol",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "initialSupply",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "createToken",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]