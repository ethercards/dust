//SPDX-License-Identifier: Unlicensed

pragma solidity >=0.6.0 <0.8.0;
pragma abicoder v2;


import "../DustForPunksAllocator.sol";

contract DustForPunksAllocatorMock is DustForPunksAllocator {
    
    uint256 block_timestamp;

    constructor(
        address _erc721,
        address _erc20
    ) DustForPunksAllocator(
        _erc721,
        _erc20
    ) {}

    function getBlockTimestamp() public view virtual override returns (uint256) {
        return block_timestamp;
    }

    function setBlockTimestamp(uint256 _block_timestamp) public {
        block_timestamp = _block_timestamp;
    }

}