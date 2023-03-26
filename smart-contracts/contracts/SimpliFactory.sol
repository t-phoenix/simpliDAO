// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC20Token.sol";
import "@openzeppelin/contracts/governance/TimelockController.sol";

contract SimpliFactory {

    event NewERC20TokenCreated(string name, string symbol, address indexed contractAddress);
    event NewTimelockControllerCreated(address admin, address indexed timelockControllerAddress);



    function createToken(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        address owner
    ) external returns (address) {
        ERC20Token token = new ERC20Token(name, symbol, initialSupply, owner);
        // token.mint(msg.sender, initialSupply);
        emit NewERC20TokenCreated(name, symbol, address(token));
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
        emit NewTimelockControllerCreated(admin, address(timelock));
        return address(timelock);
    }

    

    
}
