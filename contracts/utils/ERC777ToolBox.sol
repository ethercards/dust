//SPDX-License-Identifier: Unlicensed
pragma solidity >=0.6.0 <0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/EnumerableSet.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC777/ERC777.sol";


contract ERC777ToolBox is ERC777, Ownable { 

    constructor(
        string memory name,
        string memory symbol,
        address[] memory _defaultOperators,
        uint256 _initialSupply
    )
    
    ERC777(name, symbol, _defaultOperators) {
        _mint(msg.sender, _initialSupply, "", "");
    }

    function mint(uint256 amount) public {
        _mint(msg.sender, amount, "", "");
    }

    function mint(uint256 amount, address recipient) public {
        _mint(recipient, amount, "", "");
    }

}
