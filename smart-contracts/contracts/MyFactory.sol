// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC20Token.sol";
import "./SimpliGovernor.sol";
import "../node_modules/@openzeppelin/contracts/governance/TimelockController.sol";

contract MyFactory {

    event NewERC20TokenCreated(address indexed contractAddress);
    event TimelockControllerCreated(address indexed timelockControllerAddress);



    function createToken(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        address owner
    ) external returns (address) {
        ERC20Token token = new ERC20Token(name, symbol, initialSupply, owner);
        // token.mint(msg.sender, initialSupply);
        emit NewERC20TokenCreated(address(token));
        return address(token);
    }


    function createTimeLock(
        uint256 votingPeriod,
        address[] memory proposers,
        address[] memory executors,
        address admin
    ) external returns (address) {
        TimelockController timelock = new TimelockController(
            votingPeriod,
            proposers,
            executors,
            admin
        );
        // timelock.setPendingAdmin(msg.sender);
        emit TimelockControllerCreated(address(timelock));
        return address(timelock);
    }

    
}
