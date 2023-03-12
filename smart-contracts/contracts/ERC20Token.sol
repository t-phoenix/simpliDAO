// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;


import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";


contract ERC20Token is ERC20,ERC20Permit, ERC20Votes ,Ownable,ERC20Burnable {
    constructor(string memory name, string memory symbol, uint supply, address owner) ERC20(name, symbol) ERC20Permit(name){
        _mint(owner, supply * 10 ** decimals());
    }
        function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function _afterTokenTransfer(address from, address to, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._afterTokenTransfer(from, to, amount);
    }

    function _mint(address to, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._mint(to, amount);
    }

    function _burn(address account, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._burn(account, amount);
    }
}

