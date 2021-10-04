
import cliTable = require('cli-table');
import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import chai from "chai";
import { solidity } from "ethereum-waffle";
chai.use(solidity);
// make sure to have ethers.js 5.X required, else this will fail!
const BigNumber = ethers.BigNumber;

function to18Dec(num: any) {
    return BigNumber.from(10).pow(18).mul(num);
}

const EC721address  = "0x97ca7fe0b0288f5eb85f386fed876618fb9b8ab8"; // mainnet
const token_name    = "DUST Token";
const token_symbol  = "DUST";

// const EC721address  = "0xAAD4475343f5150E33d6194270f04e7e5968A2f8"; // rinkeby
// const token_name    = "DUST Token";
// const token_symbol  = "DUST";

const contractOwner = "0xB0C4C05e291A558cA0e5D43D43eacAc190aEa9Eb";
const supplyOwner   = "0xc954b16623C04a3d3fBee003D253b313C6B79c53";

// 1 bil -> 1 000 000 000 & 18 decimals
const decimals = 18;
const max_supply = BigNumber.from(5).mul(BigNumber.from(10).pow(9 + decimals));
const contract_supply = BigNumber.from(27).mul(BigNumber.from(10).pow(6 + decimals)); 

const PUNKS_ALLOCATION_OG = to18Dec( BigNumber.from(10).pow(5) );
const PUNKS_ALLOCATION_ALPHA = to18Dec( BigNumber.from(10).pow(4) );
const PUNKS_ALLOCATION_FOUNDER = to18Dec( BigNumber.from(10).pow(3) );


const table = new cliTable({
    head: ['Configuration Name', 'Value'], colWidths: [40, 50]
});

table.push(
    ["EC ERC721 contract", EC721address],
    ["Token name", token_name],
    ["Token Symbol", token_symbol],
    ["Token decimals", decimals],
    ["Token Supply Owner", supplyOwner],
    ["Token max_supply", ethers.utils.formatEther(max_supply)],
    ["Contract Name:", "Dust For Punks Allocation"],
    ["Contract Supply:", ethers.utils.formatEther(contract_supply)],
    ["Allocation Contract Owner", contractOwner],

    ["Token Allocation for 1 OG", ethers.utils.formatEther(PUNKS_ALLOCATION_OG)],
    ["Token Allocation for 1 Alpha", ethers.utils.formatEther(PUNKS_ALLOCATION_ALPHA)],
    ["Token Allocation for 1 Founder", ethers.utils.formatEther(PUNKS_ALLOCATION_FOUNDER)],

    ["Supply for Founder", ethers.utils.formatEther(PUNKS_ALLOCATION_FOUNDER.mul(9000))],
    ["Supply for Alpha", ethers.utils.formatEther(PUNKS_ALLOCATION_ALPHA.mul(900))],
    ["Supply for OG", ethers.utils.formatEther(PUNKS_ALLOCATION_OG.mul(90))],
    ["Total Supply Requierd", ethers.utils.formatEther(PUNKS_ALLOCATION_FOUNDER.mul(9000).add(PUNKS_ALLOCATION_ALPHA.mul(900)).add(PUNKS_ALLOCATION_OG.mul(90)))],
);

console.log(table.toString());

async function main() {

    let gasCost = ethers.BigNumber.from(0);

    let _DustToken: any;
    let _DustForPunksAllocator: any;

    const accounts = await ethers.getSigners();
    console.log("    Deployer                   ", accounts[0].address);

    console.log(" #1 Deployment - DustToken");
    const DustTokenArtifacts = await ethers.getContractFactory("DustToken");
    _DustToken = await DustTokenArtifacts.deploy(
        token_name,
        token_symbol,
        [],
        max_supply.toString()
    );
    await _DustToken.deployed();

    console.log("    Deployment hash:           ", _DustToken.deployTransaction.hash)
    console.log("    Deployment address:        ", _DustToken.address)

    let tx = await _DustToken.provider.getTransactionReceipt(_DustToken.deployTransaction.hash);
    gasCost = gasCost.add(tx.cumulativeGasUsed);
    console.log("    gasCost:                   ", tx.cumulativeGasUsed.toString())


    console.log(" #2 Deployment - DustToken");
    const DustForPunksAllocatorArtifacts = await ethers.getContractFactory("DustForPunksAllocator");
    _DustForPunksAllocator = await DustForPunksAllocatorArtifacts.deploy(
        EC721address,
        _DustToken.address
    );
    await _DustForPunksAllocator.deployed();

    console.log("    Deployment hash:           ", _DustForPunksAllocator.deployTransaction.hash)
    console.log("    Deployment address:        ", _DustForPunksAllocator.address)
    
    tx = await _DustForPunksAllocator.provider.getTransactionReceipt(_DustForPunksAllocator.deployTransaction.hash);
    gasCost = gasCost.add(tx.cumulativeGasUsed);
    console.log("    gasCost:                   ", tx.cumulativeGasUsed.toString())


    console.log(" #3 TXN - Transfer supply to DustForPunksAllocator contract");
    let tx1 = await _DustToken.transfer(_DustForPunksAllocator.address, contract_supply);
        // tx.wait();

    console.log(" #4 TXN - Transfer supply to supplyOwner");
    let tx2 = await _DustToken.transfer(supplyOwner, max_supply.sub(contract_supply));
        // tx.wait();

    console.log(" #5 TXN - Transfer ownership of DustForPunksAllocator to contractOwner");
    let tx3 = await _DustForPunksAllocator.transferOwnership(contractOwner);

    // console.log("redeem enable");
    // let tx4 = await _DustForPunksAllocator.removeUnlockTime();

    let txReceit1 = await tx1.wait();
    let txReceit2 = await tx2.wait();
    let txReceit3 = await tx3.wait();

    gasCost = gasCost.add(txReceit1.cumulativeGasUsed);
    gasCost = gasCost.add(txReceit2.cumulativeGasUsed);
    gasCost = gasCost.add(txReceit3.cumulativeGasUsed);

    console.log("    Total gasCost:             ", gasCost.toString())

    const gasPrice = ethers.BigNumber.from("100000000000");

    console.log("    Deployment gasCost in wei: ", gasCost.toString())
    console.log("    Deployment gasPrice:       ", gasPrice.div(10 ** 9).toString(), "GWEI")

    let maxCostWei = gasCost.mul(gasPrice);
    console.log("    Deployment wei * price:    ", ethers.utils.formatEther(maxCostWei), "ETH")


    console.log("");
    console.log("    Validate:");
    console.log("npx hardhat verify --network mainnet --contract contracts/DustToken.sol:DustToken "+_DustToken.address+ ' "'+token_name+'" "'+token_symbol+'" "[]" "'+max_supply.toString()+'"');

    console.log("");
    console.log("    Validate:");
    console.log("npx hardhat verify --network mainnet --contract contracts/DustForPunksAllocator.sol:DustForPunksAllocator "+_DustForPunksAllocator.address+' "' + EC721address + '" "'+_DustToken.address+'"');


    console.log("    Validation:");

    const vtable = new cliTable({
        head: ['Configuration Name', 'Value'], colWidths: [40, 50]
    });
    
    const unlockTime = await _DustForPunksAllocator.unlockTime();


    vtable.push(
        ["Token Supply Owner Address:",  supplyOwner],
        ["Token Supply Owner Balance:",  ethers.utils.formatEther(await _DustToken.balanceOf(supplyOwner))],
        ["Allocation Contract Owner:",   await _DustForPunksAllocator.owner()],
        ["Allocation Contract Balance:", ethers.utils.formatEther(await _DustToken.balanceOf(_DustForPunksAllocator.address))],
        ["Unlock Time unix timestamp:", unlockTime],
        ["Unlock Time UTC / GMT:",          new Date(unlockTime*1000).toLocaleString("en-US", { timeZone: 'UTC', hour12: false })],
        ["Unlock Time EST:",                new Date(unlockTime*1000).toLocaleString("en-US", { timeZone: 'EST', hour12: false })],
        ["Unlock Time Europe/Bucharest:",   new Date(unlockTime*1000).toLocaleString("en-US", { timeZone: 'Europe/Bucharest', hour12: false })],
        ["Unlock Time Asia/Singapore:",     new Date(unlockTime*1000).toLocaleString("en-US", { timeZone: 'Asia/Singapore', hour12: false })],
    );
   
    console.log(vtable.toString());
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
