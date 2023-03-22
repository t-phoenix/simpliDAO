
export const SimpliFactoryABI = [
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
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "symbol",
				"type": "string"
			},
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
				"indexed": false,
				"internalType": "address",
				"name": "admin",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "timelockControllerAddress",
				"type": "address"
			}
		],
		"name": "NewTimelockControllerCreated",
		"type": "event"
	}
]

export const SimpliFactory2ABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "daoName",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "governorAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "admin",
				"type": "address"
			}
		],
		"name": "NewGovernorCreated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "daoName",
				"type": "string"
			},
			{
				"internalType": "contract ERC20Token",
				"name": "tokenAddr",
				"type": "address"
			},
			{
				"internalType": "contract TimelockController",
				"name": "timelockAddr",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "admin",
				"type": "address"
			}
		],
		"name": "createGovernor",
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