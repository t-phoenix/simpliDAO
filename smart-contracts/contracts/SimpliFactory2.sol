// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC20Token.sol";
import "./SimpliGovernor.sol";
import "@openzeppelin/contracts/governance/TimelockController.sol";

contract SimpliFactory2 {
    event GovernorCreated(address indexed governorAddress);

    function createGovernor(
        ERC20Token tokenAddr,
        TimelockController timelockAddr
    ) external returns (address) {
        SimpliGovernor governor = new SimpliGovernor(tokenAddr, timelockAddr);
        emit GovernorCreated(address(governor));
        return address(governor);
    }
}
