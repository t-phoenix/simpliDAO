// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import "@openzeppelin/contracts/governance/TimelockController.sol";

contract SimpleTimeLock {

    event NewTimelockControllerCreated(
        address admin,
        address indexed timelockControllerAddress
    );


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
