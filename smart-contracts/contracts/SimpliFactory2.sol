// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC20Token.sol";
import "./SimpliGovernor.sol";
import "@openzeppelin/contracts/governance/TimelockController.sol";

contract SimpliFactory2 {
    event NewGovernorCreated(string daoName, address indexed governorAddress, address admin);

    function createGovernor(
        string memory daoName,
        ERC20Token tokenAddr,
        TimelockController timelockAddr,
        address admin
    ) external returns (address) {
        SimpliGovernor governor = new SimpliGovernor(daoName, tokenAddr, timelockAddr, admin);
        emit NewGovernorCreated(daoName,address(governor), admin);
        return address(governor);
    }



}
