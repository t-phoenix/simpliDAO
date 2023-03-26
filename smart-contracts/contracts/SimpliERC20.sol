// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC20Token.sol";

contract SimpliERC20 {
    event NewERC20TokenCreated(
        string name,
        string symbol,
        address indexed contractAddress
    );


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

}
