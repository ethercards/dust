
const { ZERO_ADDRESS, ROLE, Data } = require('./helpers/common');
import cliTable = require('cli-table');
import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import chai from "chai";
import { solidity } from "ethereum-waffle";
chai.use(solidity);
const { expect } = chai;
// make sure to have ethers.js 5.X required, else this will fail!
const BigNumber = ethers.BigNumber;

function to18Dec(num: any) {
    return BigNumber.from(10).pow(18).mul(num);
}

let data: any, owner: any, testingAccount1: any, testingAccount2: any, manager: any, dispenserController: any;

// 1 bil -> 1 000 000 000 & 18 decimals
const decimals = 18;
const max_supply = BigNumber.from(5).mul(BigNumber.from(10).pow(9 + decimals));
const contract_supply = BigNumber.from(27).mul(BigNumber.from(10).pow(6 + decimals)); 

const PUNKS_ALLOCATION_OG = to18Dec( BigNumber.from(10).pow(5) );
const PUNKS_ALLOCATION_ALPHA = to18Dec( BigNumber.from(10).pow(4) );
const PUNKS_ALLOCATION_FOUNDER = to18Dec( BigNumber.from(10).pow(3) );


const table = new cliTable({
    head: ['Configuration Name', 'Value'], colWidths: [30, 30]
});

table.push(
    ["Token decimals", decimals],
    ["Token max_supply", ethers.utils.formatEther(max_supply)],
    ["Contract Name:", "Dust For Punks Allocation"],
    ["Contract Supply:", ethers.utils.formatEther(contract_supply)],

    ["Token Allocation for 1 OG", ethers.utils.formatEther(PUNKS_ALLOCATION_OG)],
    ["Token Allocation for 1 Alpha", ethers.utils.formatEther(PUNKS_ALLOCATION_ALPHA)],
    ["Token Allocation for 1 Founder", ethers.utils.formatEther(PUNKS_ALLOCATION_FOUNDER)],

    ["Supply for Founder", ethers.utils.formatEther(PUNKS_ALLOCATION_FOUNDER.mul(9000))],
    ["Supply for Alpha", ethers.utils.formatEther(PUNKS_ALLOCATION_ALPHA.mul(900))],
    ["Supply for OG", ethers.utils.formatEther(PUNKS_ALLOCATION_OG.mul(90))],
    ["Total Supply Requierd", ethers.utils.formatEther(PUNKS_ALLOCATION_FOUNDER.mul(9000).add(PUNKS_ALLOCATION_ALPHA.mul(900)).add(PUNKS_ALLOCATION_OG.mul(90)))],
);

console.log(table.toString());

const tokenId_OG              = 10;
const tokenId_Alpha           = 100;
const tokenId_Founder         = 1000;

async function moveContractToBlock(_contract:any, block: number) {
    await _contract.setBlockNumber(block);
}

const TRANSFER_TOKENS_TO_DISPENSER = 6;

async function deployContracts(displayLog = false, steps:any = [], custom?: any) {

    let _NFTToolbox: any;
    let _DustToken: any;
    let _DustForPunksAllocator: any;
    let _EmptyReceiver: any;
    let _ERC777SRMock: any;

    const NFTToolboxArtifacts = await ethers.getContractFactory("NFTToolbox");
    _NFTToolbox = await NFTToolboxArtifacts.deploy();
    await _NFTToolbox.deployed();
    if(displayLog) {
        console.log("          - NFTToolbox:      ", _NFTToolbox.address);
    }

    const DustTokenArtifacts = await ethers.getContractFactory("DustToken");
    _DustToken = await DustTokenArtifacts.deploy(
        "TEST777",
        "TEST",
        [],
        max_supply.toString()
    );
    await _DustToken.deployed();
    if(displayLog) {
        console.log("          - DustToken:       ", _DustToken.address);
    }

    const DustForPunksAllocatorArtifacts = await ethers.getContractFactory("DustForPunksAllocatorMock");
    _DustForPunksAllocator = await DustForPunksAllocatorArtifacts.deploy(
        _NFTToolbox.address,
        _DustToken.address
    );
    await _DustForPunksAllocator.deployed();
    if(displayLog) {
        console.log("          - DustForPunksAllocator:   ", _DustForPunksAllocator.address);
    }

    const EmptyReceiverArtifacts = await ethers.getContractFactory("EmptyReceiver");
    _EmptyReceiver = await EmptyReceiverArtifacts.deploy();
    await _EmptyReceiver.deployed();
    if(displayLog) {
        console.log("          - EmptyReceiver:   ", _EmptyReceiver.address);
    }

    const ERC777SRMockArtifacts = await ethers.getContractFactory("ERC777SenderRecipientMock");
    _ERC777SRMock = await ERC777SRMockArtifacts.deploy();
    await _ERC777SRMock.deployed();
    if(displayLog) {
        console.log("          - ERC777SRMock:    ", _ERC777SRMock.address);
    }

    await _ERC777SRMock.registerRecipient(_ERC777SRMock.address);

    for(let z = 0; z < steps.length; z++) {
        const step = steps[z];

        if(step == TRANSFER_TOKENS_TO_DISPENSER) {
            await _DustToken.transfer(_DustForPunksAllocator.address, contract_supply);
        }

    }

    return [_NFTToolbox, _DustToken, _DustForPunksAllocator, _EmptyReceiver, _ERC777SRMock];
}


describe("Dust For Punks", function () {

    before(async () => {

        data = new Data();
        await data.init();

        owner = data.deployerSigner;
        testingAccount1 = data.user1Signer;
        testingAccount2 = data.user2Signer;
        manager = data.user3Signer;
        dispenserController = data.user4Signer;

    });

    describe("Contract Deployment", function () {
       
        let NFTToolbox: any;
        let DustToken: any;
        let DustForPunksAllocator: any;
        let EmptyReceiver: any;
        let ERC777SRMock: any;

        before(async () => {
            [NFTToolbox, DustToken, DustForPunksAllocator, EmptyReceiver,
                ERC777SRMock] = await deployContracts();
        });

        describe("Validate ERC777 Token", function () {

            it("deployer balance is correct", async function () {
                expect(await DustToken.balanceOf(owner.address)).to.be.equal(max_supply.toString());
            });

            describe("Receiver Smart Contract: EmptyReceiver", function () {

                describe("method: send(address,uint256,bytes)", function () {
                    it("reverts", async function () {
                        await data.assertInvalidOpcode(async () => {
                            await DustToken["send(address,uint256,bytes)"](EmptyReceiver.address, 1, 0x0);
                        }, "ERC777: token recipient contract has no implementer for ERC777TokensRecipient");
                    });
                });

                describe("method: transfer(address,uint256)", function () {
                    let tx: any;
                    before(async () => {
                        tx = await DustToken["transfer(address,uint256)"](EmptyReceiver.address, 1);
                    });

                    it("works, emits Sent(operator, from, to, amount, data, data) event", async function () {
                        expect(tx).to.emit(DustToken, 'Sent').withArgs(
                            owner.address,          // address indexed operator
                            owner.address,          // address indexed from
                            EmptyReceiver.address,  // address indexed to
                            1,                      // uint256 amount,
                            "0x",                   // bytes data,
                            "0x",                   // bytes operatorData,
                        );
                    });

                    it("works, emits Transfer(from, to, amount) event", async function () {
                        expect(tx).to.emit(DustToken, 'Transfer').withArgs(owner.address, EmptyReceiver.address, 1);
                    });
                });

            });

            describe("Receiver Smart Contract: ERC777SenderReceiverMock", function () {

                describe("method: transfer(address,uint256)", function () {
                    let tx: any, fromBalance: any, toBalance: any;
                    before(async () => {
                        tx = await DustToken["transfer(address,uint256)"](ERC777SRMock.address, 5);
                        fromBalance = await DustToken.balanceOf(owner.address);
                        toBalance = await DustToken.balanceOf(ERC777SRMock.address);
                    });

                    // Error: calledOnContract matcher requires provider that support call history
                    // it("works, ERC777SRMock.tokensReceived() is called", async function () {
                    //     expect('tokensReceived').to.be.calledOnContract(ERC777SRMock);
                    // });
                    
                    it("works, emits Sent(operator, from, to, amount, data, data) event", async function () {
                        expect(tx).to.emit(DustToken, 'Sent').withArgs(
                            owner.address,          // address indexed operator
                            owner.address,          // address indexed from
                            ERC777SRMock.address,  // address indexed to
                            5,                      // uint256 amount,
                            "0x",                   // bytes data,
                            "0x",                   // bytes operatorData,
                        );
                    });

                    it("works, emits Transfer(from, to, amount) event", async function () {
                        expect(tx).to.emit(DustToken, 'Transfer').withArgs(owner.address, ERC777SRMock.address, 5);
                    });

                    it("works, receiver emits TokensReceivedCalled(...) event", async function () {
                        expect(tx).to.emit(ERC777SRMock, 'TokensReceivedCalled')
                        .withArgs(
                            owner.address,          // address operator
                            owner.address,          // address indexed from
                            ERC777SRMock.address,   // address indexed to
                            5,                      // uint256 amount,
                            "0x",                   // bytes data,
                            "0x",                   // bytes operatorData,
                            DustToken.address,      // address(token)
                            fromBalance,            // fromBalance
                            toBalance               // toBalance
                        );
                    });                    
                });

                describe("method: send(address,uint256,bytes)", function () {
                    let tx: any, fromBalance: any, toBalance: any;
                    before(async () => {
                        tx = await DustToken["send(address,uint256,bytes)"](ERC777SRMock.address, 2, "0x");
                        fromBalance = await DustToken.balanceOf(owner.address);
                        toBalance = await DustToken.balanceOf(ERC777SRMock.address);
                    });

                    it("works, emits Sent(operator, from, to, amount, data, data) event", async function () {
                        expect(tx).to.emit(DustToken, 'Sent').withArgs(
                            owner.address,          // address indexed operator
                            owner.address,          // address indexed from
                            ERC777SRMock.address,  // address indexed to
                            2,                      // uint256 amount,
                            "0x",                   // bytes data,
                            "0x",                   // bytes operatorData,
                        );
                    });

                    it("works, emits Transfer(from, to, amount) event", async function () {
                        expect(tx).to.emit(DustToken, 'Transfer').withArgs(owner.address, ERC777SRMock.address, 2);
                    });


                    it("works, receiver emits TokensReceivedCalled(...) event", async function () {
                        expect(tx).to.emit(ERC777SRMock, 'TokensReceivedCalled')
                        .withArgs(
                            owner.address,          // address operator
                            owner.address,          // address indexed from
                            ERC777SRMock.address,   // address indexed to
                            2,                      // uint256 amount,
                            "0x",                   // bytes data,
                            "0x",                   // bytes operatorData,
                            DustToken.address,      // address(token)
                            fromBalance,            // fromBalance
                            toBalance               // toBalance
                        );
                    }); 
                });
            });
        });

        describe("Validate DustForPunksAllocator", function () {

            describe("Card Rates", function () {

                before(async () => {
                    [NFTToolbox, DustToken, DustForPunksAllocator, EmptyReceiver,
                        ERC777SRMock] = await deployContracts(false, []);

                });

                it("CardRates data is set properly", async function () {
                    for(let i = 1; i <= 3; i++) {
                        let cardRateByType = await DustForPunksAllocator.connect(dispenserController).cardTypeAmounts(i);
                        if(i === 1) {
                            expect(cardRateByType).to.be.equal(PUNKS_ALLOCATION_OG);
                        } else if(i === 2) {
                            expect(cardRateByType).to.be.equal(PUNKS_ALLOCATION_ALPHA);
                        } else if(i === 2) {
                            expect(cardRateByType).to.be.equal(PUNKS_ALLOCATION_FOUNDER);
                        }
                    }
                }); 
            });

            describe("toggleLocked()", function () {

                before(async () => {
                    [NFTToolbox, DustToken, DustForPunksAllocator, EmptyReceiver,
                        ERC777SRMock] = await deployContracts(false, []);
                });

                it("locked is false", async function () {
                    const locked = await DustForPunksAllocator.connect(owner).locked();
                    expect(locked).to.be.equal(false);
                }); 

                it("toggles to true if called by owner", async function () {
                    await DustForPunksAllocator.connect(owner).toggleLocked();
                    const locked = await DustForPunksAllocator.locked();
                    expect(locked).to.be.equal(true);
                });

                it("toggles to false if called again by owner", async function () {
                    await DustForPunksAllocator.connect(owner).toggleLocked();
                    const locked = await DustForPunksAllocator.locked();
                    expect(locked).to.be.equal(false);
                });

                it("reverts if called by non owner", async function () {
                    await data.assertInvalidOpcode(async () => {
                        await DustForPunksAllocator.connect(manager).toggleLocked();
                    }, "Ownable: caller is not the owner");
                });

            });

            describe("getCardTypeFromId(uint16)", function () {

                before(async () => {
                    [NFTToolbox, DustToken, DustForPunksAllocator, EmptyReceiver,
                        ERC777SRMock] = await deployContracts(false, []);
                });

                it("returns 1 for OG [10/99]", async function () {
                    let type = await DustForPunksAllocator.getCardTypeFromId(10);
                    expect(type).to.be.equal(1);
                    type = await DustForPunksAllocator.getCardTypeFromId(99);
                    expect(type).to.be.equal(1);
                });

                it("returns 2 for Alpha [100/999]", async function () {
                    let type = await DustForPunksAllocator.getCardTypeFromId(100);
                    expect(type).to.be.equal(2);
                    type = await DustForPunksAllocator.getCardTypeFromId(999);
                    expect(type).to.be.equal(2);
                });

                it("returns 3 for Founder [1000/9999]", async function () {
                    let type = await DustForPunksAllocator.getCardTypeFromId(1000);
                    expect(type).to.be.equal(3);
                    type = await DustForPunksAllocator.getCardTypeFromId(9999);
                    expect(type).to.be.equal(3);
                });

                it("reverts for creator cards [0/9] :CardType not allowed ", async function () {
                    await data.assertInvalidOpcode(async () => {
                        await DustForPunksAllocator.getCardTypeFromId(0);
                    }, "CardType not allowed");
                });

                it("reverts for cards over 9999 :CardType not found ", async function () {
                    await data.assertInvalidOpcode(async () => {
                        await DustForPunksAllocator.getCardTypeFromId(10000);
                    }, "CardType not found");
                });

            });
            
            
            describe("getAvailableBalance()", function () {

                before(async () => {
                    [NFTToolbox, DustToken, DustForPunksAllocator, EmptyReceiver,
                        ERC777SRMock] = await deployContracts(false, []);
                });

                it("OG - returns 100000", async function () {
                    const available = await DustForPunksAllocator["getAvailableBalance(uint16[])"]([tokenId_OG]);
                    expect(available.toString()).to.be.equal(PUNKS_ALLOCATION_OG.toString());
                    expect(available.toString()).to.be.equal(to18Dec(100000).toString());
                });

                it("Alpha - returns 10000", async function () {
                    const available = await DustForPunksAllocator["getAvailableBalance(uint16[])"]([tokenId_Alpha]);
                    expect(available.toString()).to.be.equal(PUNKS_ALLOCATION_ALPHA.toString());
                    expect(available.toString()).to.be.equal(to18Dec(10000).toString());
                });

                it("Founder - returns 1000", async function () {
                    const available = await DustForPunksAllocator["getAvailableBalance(uint16[])"]([tokenId_Founder]);
                    expect(available.toString()).to.be.equal(PUNKS_ALLOCATION_FOUNDER.toString());
                    expect(available.toString()).to.be.equal(to18Dec(1000).toString());
                });
            });


            describe("redeem()", function () {

                before(async () => {
                    [NFTToolbox, DustToken, DustForPunksAllocator, EmptyReceiver,
                        ERC777SRMock] = await deployContracts(false, [
                            TRANSFER_TOKENS_TO_DISPENSER
                        ]);

                    await NFTToolbox["mint(uint256,address)"](tokenId_OG, testingAccount1.address);
                    await NFTToolbox["mint(uint256,address)"](tokenId_Alpha, testingAccount1.address);
                    await NFTToolbox["mint(uint256,address)"](tokenId_Founder, testingAccount1.address);

                    await NFTToolbox["mint(uint256,address)"](11, testingAccount1.address);
                    await NFTToolbox["mint(uint256,address)"](101, testingAccount1.address);
                    await NFTToolbox["mint(uint256,address)"](1001, testingAccount1.address);


                    await NFTToolbox["mint(uint256,address)"](65, testingAccount1.address);

                    await NFTToolbox["batchMint(uint256[],address)"]([
                        2001,2102,2203,2304,2405,2506,2607,2708,2809,2910,
                        3011,3112,3213,3314,3415,3516,3617,3718,3819,3920,
                        4021,4122,4223,4324,4425,4526,4627,4728,4829,4930
                    ], testingAccount1.address);

                    await NFTToolbox["batchMint(uint256[],address)"]([
                        5031,5132,5233,5334,5435,5536,5637,5738,5839,5940,
                        6041,6142,6243,6344,6445,6546,6647,6748,6849,6950,
                        7051,7152,7253,7354,7455,7556,7657,7758,7859,7960
                    ], testingAccount1.address);



                });

                describe("testingAccount1 - owns 2 of each ( og / alpha / founder )", function () {
                    let tx: any;

                    it("getAvailableBalance([10,11,100,101,1000,1001]) - returns 222000", async function () {
                        const available = await DustForPunksAllocator["getAvailableBalance(uint16[])"]([10,11,100,101,1000,1001]);
                        const expected = PUNKS_ALLOCATION_FOUNDER.add(PUNKS_ALLOCATION_ALPHA).add(PUNKS_ALLOCATION_OG).mul(2);
                        expect(available.toString()).to.be.equal(expected.toString());
                        expect(available.toString()).to.be.equal(to18Dec(222000).toString());                        
                    });

                    it("getAvailableBalance([10,100,1000]) - returns 111000", async function () {
                        const available = await DustForPunksAllocator["getAvailableBalance(uint16[])"]([tokenId_OG, tokenId_Alpha, tokenId_Founder]);
                        const expected = PUNKS_ALLOCATION_FOUNDER.add(PUNKS_ALLOCATION_ALPHA).add(PUNKS_ALLOCATION_OG);
                        expect(available.toString()).to.be.equal(expected.toString());
                        expect(available.toString()).to.be.equal(to18Dec(111000).toString());                        
                    });

                    it("redeem([10,100,1000]) reverts if called BEFORE unlock time", async function () {

                        const initialDustBalance = await DustToken.balanceOf(owner.address);
                        const initialDustBalanceContract = await DustToken.balanceOf(DustForPunksAllocator.address);
                        const availableBefore = await DustForPunksAllocator["getAvailableBalance(uint16[])"]([tokenId_OG, tokenId_Alpha, tokenId_Founder]);

                        await data.assertInvalidOpcode(async () => {
                            await DustForPunksAllocator.connect(testingAccount1)["redeem(uint16[])"]([tokenId_OG, tokenId_Alpha, tokenId_Founder]);
                        }, "Contract locked");

                        const availableAfter = await DustForPunksAllocator["getAvailableBalance(uint16[])"]([tokenId_OG, tokenId_Alpha, tokenId_Founder]);
                        const afterDustBalance = await DustToken.balanceOf(owner.address);
                        const afterDustBalanceContract = await DustToken.balanceOf(DustForPunksAllocator.address);

                        const expected = PUNKS_ALLOCATION_FOUNDER.add(PUNKS_ALLOCATION_ALPHA).add(PUNKS_ALLOCATION_OG);
                        expect(availableBefore.toString()).to.be.equal(expected.toString());
                        expect(availableBefore.toString()).to.be.equal(to18Dec(111000).toString());                        
                        expect(availableBefore.toString()).to.be.equal(availableAfter.toString());
                        expect(availableBefore.toString()).to.be.equal(availableAfter.toString());                        

                        expect(initialDustBalance.toString()).to.be.equal(afterDustBalance.toString());                        
                        expect(initialDustBalanceContract.toString()).to.be.equal(afterDustBalanceContract.toString());                        

                    });


                    it("redeem([10,100,1000]) reverts if called by non token owner", async function () {

                        await DustForPunksAllocator.setBlockTimestamp(
                            Math.floor(
                                Date.UTC(2021, 10, 4, 0, 0, 1) / 1000
                            )
                        );

                        const initialDustBalance = await DustToken.balanceOf(owner.address);
                        const initialDustBalanceContract = await DustToken.balanceOf(DustForPunksAllocator.address);
                        const availableBefore = await DustForPunksAllocator["getAvailableBalance(uint16[])"]([tokenId_OG, tokenId_Alpha, tokenId_Founder]);

                        await data.assertInvalidOpcode(async () => {
                            await DustForPunksAllocator.connect(owner)["redeem(uint16[])"]([tokenId_OG, tokenId_Alpha, tokenId_Founder]);
                        }, "ERC721: not owner of token");

                        const availableAfter = await DustForPunksAllocator["getAvailableBalance(uint16[])"]([tokenId_OG, tokenId_Alpha, tokenId_Founder]);
                        const afterDustBalance = await DustToken.balanceOf(owner.address);
                        const afterDustBalanceContract = await DustToken.balanceOf(DustForPunksAllocator.address);

                        const expected = PUNKS_ALLOCATION_FOUNDER.add(PUNKS_ALLOCATION_ALPHA).add(PUNKS_ALLOCATION_OG);
                        expect(availableBefore.toString()).to.be.equal(expected.toString());
                        expect(availableBefore.toString()).to.be.equal(to18Dec(111000).toString());                        
                        expect(availableBefore.toString()).to.be.equal(availableAfter.toString());
                        expect(availableBefore.toString()).to.be.equal(availableAfter.toString());                        

                        expect(initialDustBalance.toString()).to.be.equal(afterDustBalance.toString());                        
                        expect(initialDustBalanceContract.toString()).to.be.equal(afterDustBalanceContract.toString());                        

                    });


                    it("redeem([10,100,1000]) works if called by testingAccount1 AFTER UNLOCK Time", async function () {

                        const initialDustBalanceCardOwner = await DustToken.balanceOf(testingAccount1.address);
                        const initialDustBalanceContract = await DustToken.balanceOf(DustForPunksAllocator.address);

                        const availableBefore = await DustForPunksAllocator["getAvailableBalance(uint16[])"]([tokenId_OG, tokenId_Alpha, tokenId_Founder]);
                        const expected = PUNKS_ALLOCATION_FOUNDER.add(PUNKS_ALLOCATION_ALPHA).add(PUNKS_ALLOCATION_OG);
                        expect(availableBefore.toString()).to.be.equal(expected.toString());
                        expect(availableBefore.toString()).to.be.equal(to18Dec(111000).toString()); 

                        tx = await DustForPunksAllocator.connect(testingAccount1)["redeem(uint16[])"]([tokenId_OG, tokenId_Alpha, tokenId_Founder]);
                        let txReceit = await tx.wait();
                        console.log("            - Gas:             ", txReceit.cumulativeGasUsed.toString());

                        const availableAfter = await DustForPunksAllocator["getAvailableBalance(uint16[])"]([tokenId_OG, tokenId_Alpha, tokenId_Founder]);
                        const availableAfterExpected = BigNumber.from(0);
                        expect(availableAfter.toString()).to.be.equal(availableAfterExpected.toString());
                        expect(availableAfter.toString()).to.be.equal(availableAfterExpected.toString());
                        
                        const afterDustBalanceCardOwner = await DustToken.balanceOf(testingAccount1.address);
                        const afterDustBalanceContract = await DustToken.balanceOf(DustForPunksAllocator.address);

                        const afterDustBalanceCardOwnerExpected = initialDustBalanceCardOwner.add(availableBefore); // add here
                        const afterDustBalanceContractExpected = initialDustBalanceContract.sub(availableBefore);   // remove here

                        expect(afterDustBalanceCardOwner.toString()).to.be.equal(afterDustBalanceCardOwnerExpected.toString());                        
                        expect(afterDustBalanceContract.toString()).to.be.equal(afterDustBalanceContractExpected.toString());     
                    });

                    
                    it("isTokenUsed returns true for 10,100,1000", async function () {
                        let isTokenUsed = await DustForPunksAllocator["isTokenUsed(uint16)"](tokenId_OG);
                        expect(isTokenUsed).to.be.equal(true);                        
                        isTokenUsed = await DustForPunksAllocator["isTokenUsed(uint16)"](tokenId_Alpha);
                        expect(isTokenUsed).to.be.equal(true);                        
                        isTokenUsed = await DustForPunksAllocator["isTokenUsed(uint16)"](tokenId_Founder);
                        expect(isTokenUsed).to.be.equal(true);                        
                    });

                    it("works, emits Transfer(from, to, amount) event", async function () {
                        expect(tx).to.emit(DustToken, 'Transfer').withArgs(DustForPunksAllocator.address, testingAccount1.address, to18Dec(111000));
                    });

                    it("getAvailableBalance([10,100,1000]) - now returns 0", async function () {
                        const available = await DustForPunksAllocator["getAvailableBalance(uint16[])"]([tokenId_OG, tokenId_Alpha, tokenId_Founder]);
                        const expected = 0;
                        expect(available.toString()).to.be.equal(expected.toString());
                    });

                    it("getAvailableBalance([10,11,100,101,1000,1001]) - now returns 111000", async function () {
                        const available = await DustForPunksAllocator["getAvailableBalance(uint16[])"]([10,11,100,101,1000,1001]);
                        const expected = PUNKS_ALLOCATION_FOUNDER.add(PUNKS_ALLOCATION_ALPHA).add(PUNKS_ALLOCATION_OG);
                        expect(available.toString()).to.be.equal(expected.toString());
                        expect(available.toString()).to.be.equal(to18Dec(111000).toString());                        
                    });


                    it("redeem([11]) gas cost:", async function () {
                        
                        const initialDustBalanceCardOwner = await DustToken.balanceOf(testingAccount1.address);
                        const initialDustBalanceContract = await DustToken.balanceOf(DustForPunksAllocator.address);

                        const availableBefore = await DustForPunksAllocator["getAvailableBalance(uint16[])"]([65]);
                        const expected = PUNKS_ALLOCATION_OG;
                        expect(availableBefore.toString()).to.be.equal(expected.toString());
                        expect(availableBefore.toString()).to.be.equal(to18Dec(100000).toString()); 

                        let gtx = await DustForPunksAllocator.connect(testingAccount1)["redeem(uint16[])"]([65]);
                        let txReceit = await gtx.wait();
                        console.log("            - Gas:             ", txReceit.cumulativeGasUsed.toString());

                        const availableAfter = await DustForPunksAllocator["getAvailableBalance(uint16[])"]([65]);
                        const availableAfterExpected = BigNumber.from(0);
                        expect(availableAfter.toString()).to.be.equal(availableAfterExpected.toString());
                        expect(availableAfter.toString()).to.be.equal(availableAfterExpected.toString());
                        
                        const afterDustBalanceCardOwner = await DustToken.balanceOf(testingAccount1.address);
                        const afterDustBalanceContract = await DustToken.balanceOf(DustForPunksAllocator.address);

                        const afterDustBalanceCardOwnerExpected = initialDustBalanceCardOwner.add(availableBefore); // add here
                        const afterDustBalanceContractExpected = initialDustBalanceContract.sub(availableBefore);   // remove here

                        expect(afterDustBalanceCardOwner.toString()).to.be.equal(afterDustBalanceCardOwnerExpected.toString());                        
                        expect(afterDustBalanceContract.toString()).to.be.equal(afterDustBalanceContractExpected.toString());     
                    });

                    it("redeem() 60 founders gas cost:", async function () {

                        let cardIds = [
                            2001,2102,2203,2304,2405,2506,2607,2708,2809,2910,
                            3011,3112,3213,3314,3415,3516,3617,3718,3819,3920,
                            4021,4122,4223,4324,4425,4526,4627,4728,4829,4930,
                            5031,5132,5233,5334,5435,5536,5637,5738,5839,5940,
                            6041,6142,6243,6344,6445,6546,6647,6748,6849,6950,
                            7051,7152,7253,7354,7455,7556,7657,7758,7859,7960
                        ];

                        const initialDustBalanceCardOwner = await DustToken.balanceOf(testingAccount1.address);
                        const initialDustBalanceContract = await DustToken.balanceOf(DustForPunksAllocator.address);

                        const availableBefore = await DustForPunksAllocator["getAvailableBalance(uint16[])"](cardIds);
                        expect(availableBefore.toString()).to.be.equal(to18Dec( BigNumber.from(cardIds.length).mul(1000) ).toString()); 

                        let gtx = await DustForPunksAllocator.connect(testingAccount1)["redeem(uint16[])"](cardIds);

                        let txReceit = await gtx.wait();
                        console.log("            - Gas:             ", txReceit.cumulativeGasUsed.toString());

                        const availableAfter = await DustForPunksAllocator["getAvailableBalance(uint16[])"](cardIds);
                        const availableAfterExpected = BigNumber.from(0);
                        expect(availableAfter.toString()).to.be.equal(availableAfterExpected.toString());
                        expect(availableAfter.toString()).to.be.equal(availableAfterExpected.toString());
                        
                        const afterDustBalanceCardOwner = await DustToken.balanceOf(testingAccount1.address);
                        const afterDustBalanceContract = await DustToken.balanceOf(DustForPunksAllocator.address);

                        const afterDustBalanceCardOwnerExpected = initialDustBalanceCardOwner.add(availableBefore); // add here
                        const afterDustBalanceContractExpected = initialDustBalanceContract.sub(availableBefore);   // remove here

                        expect(afterDustBalanceCardOwner.toString()).to.be.equal(afterDustBalanceCardOwnerExpected.toString());                        
                        expect(afterDustBalanceContract.toString()).to.be.equal(afterDustBalanceContractExpected.toString());    


                    });

                });
                

            });

        });

        describe("Token info updates", function () {

            const newName = "New Name";
            const newSymbol = "NEWTEST";

            before(async function () {
                [NFTToolbox, DustToken, DustForPunksAllocator, EmptyReceiver,
                    ERC777SRMock] = await deployContracts(false, [
                    TRANSFER_TOKENS_TO_DISPENSER
                ]);
            });

            it("updateTokenInfo(string, string) - Can update DustToken name / symbol if called by owner", async function () {

                const existingName = await DustToken.name();
                const existingSymbol = await DustToken.symbol();
                
                await DustToken.updateTokenInfo(newName, newSymbol);

                const NameAfter = await DustToken.name();
                const SymbolAfter = await DustToken.symbol();

                expect(NameAfter).to.be.equal(newName);
                expect(SymbolAfter).to.be.equal(newSymbol);
                expect(NameAfter).to.be.not.equal(existingName);
                expect(SymbolAfter).to.be.not.equal(existingSymbol);
            });

            it("updateTokenInfo(string, string) - Reverts if called by non-owner", async function () {
                await data.assertInvalidOpcode(async () => {
                    await DustToken.connect(testingAccount2).updateTokenInfo(newName, newSymbol);
                }, "Ownable: caller is not the owner")
            });


        });

        describe("Blackhole prevention", function () {
            let nftTwo: any;

            before(async function () {
                [NFTToolbox, DustToken, DustForPunksAllocator, EmptyReceiver,
                    ERC777SRMock] = await deployContracts(false, [
                    // TRANSFER_TOKENS_TO_DISPENSER
                ]);
            });
        
            describe("721 non-safe transfers", function () {
                let testTokenId = 5;
                before(async function () {
                    let NFTToolboxArtifacts: any = await ethers.getContractFactory("NFTToolbox");
                    nftTwo = await NFTToolboxArtifacts.deploy();
                    await nftTwo.deployed();

                    // owner mints some tokens
                    for (let i = 0; i < 20; i++) {
                        let minttx = await nftTwo["mint(uint256)"](i);
                        await minttx.wait();
                    }

                    // transfer a token
                    await nftTwo["transferFrom(address,address,uint256)"](owner.address, DustForPunksAllocator.address, testTokenId);

                    let ownerOfToken = await nftTwo["ownerOf(uint256)"](testTokenId);
                    expect(ownerOfToken).to.be.equal(DustForPunksAllocator.address);
        
                });
        
                it("retrieve721() - Retrieves an NFT sent to the contract by mistake and sends it to contract owner", async function () {
                    await DustForPunksAllocator.retrieve721(nftTwo.address, testTokenId);
                    let newOwnerOfToken = await nftTwo["ownerOf(uint256)"](testTokenId);
                    expect(newOwnerOfToken).to.be.equal(owner.address);
                });
        
                it("retrieve721() - Reverts if called by non-owner", async function () {
                    await data.assertInvalidOpcode(async () => {
                        await DustForPunksAllocator.connect(testingAccount2).retrieve721(nftTwo.address, testTokenId);
                    }, "Ownable: caller is not the owner")
                });
        
            });
        
            describe("ERC20 non-safe transfers", function () {

                let erc20: any, testAmount: any = ethers.BigNumber.from(5);
                before(async function () {
                    let ERC20ToolboxArtifacts: any = await ethers.getContractFactory("ERC20Toolbox");
                    erc20 = await ERC20ToolboxArtifacts.deploy();
                    await erc20.deployed();
                });
        
                it("retrieveERC20() - Retrieves an amount of ERC20 tokens sent to the contract by mistake and sends them to contract owner", async function () {

                    let initialBalance = await erc20["balanceOf(address)"](data.deployerSigner.address);
                    await erc20["transfer(address,uint256)"](DustForPunksAllocator.address, testAmount);
                    let afterBalance = await erc20["balanceOf(address)"](data.deployerSigner.address);
                    expect(afterBalance).to.be.equal(initialBalance.sub(testAmount));

                    // balance
                    let AfterBalance = await erc20["balanceOf(address)"](DustForPunksAllocator.address);
                    expect(AfterBalance).to.be.equal(testAmount);

                    // retrieve tokens
                    await DustForPunksAllocator.retrieveERC20(erc20.address, testAmount);

                    AfterBalance = await erc20["balanceOf(address)"](DustForPunksAllocator.address);
                    expect(AfterBalance).to.be.equal(0);

                    afterBalance = await erc20["balanceOf(address)"](data.deployerSigner.address);
                    expect(afterBalance).to.be.equal(initialBalance);
                
                });

                it("retrieveERC20() - DUST - Retrieves an amount of ERC20 tokens sent to the contract by mistake and sends them to contract owner", async function () {

                    let initialBalance = await DustToken["balanceOf(address)"](data.deployerSigner.address);
                    await DustToken["transfer(address,uint256)"](DustForPunksAllocator.address, testAmount);
                    let afterBalance = await DustToken["balanceOf(address)"](data.deployerSigner.address);
                    expect(afterBalance).to.be.equal(initialBalance.sub(testAmount));

                    // balance
                    let AfterBalance = await DustToken["balanceOf(address)"](DustForPunksAllocator.address);
                    expect(AfterBalance).to.be.equal(testAmount);

                    // retrieve tokens
                    await DustForPunksAllocator.retrieveERC20(DustToken.address, testAmount);

                    AfterBalance = await DustToken["balanceOf(address)"](DustForPunksAllocator.address);
                    expect(AfterBalance).to.be.equal(0);

                    afterBalance = await DustToken["balanceOf(address)"](data.deployerSigner.address);
                    expect(afterBalance).to.be.equal(initialBalance);
                });
            
                it("retrieveERC20() - Reverts if called by non-owner", async function () {
                    await data.assertInvalidOpcode(async () => {
                    await DustForPunksAllocator.connect(testingAccount2).retrieveERC20(erc20.address, testAmount);
                    }, "Ownable: caller is not the owner")
                });
            });
        });
        
        describe("transferOwnership()", function () {
    
            before(async function () {
                [NFTToolbox, DustToken, DustForPunksAllocator, EmptyReceiver,
                ERC777SRMock] = await deployContracts(false, [
                    TRANSFER_TOKENS_TO_DISPENSER
                ]);
            });
        
            it("owner can transfer contract ownership", async function () {
                const newOwner = "0x5147c5C1Cb5b5D3f56186C37a4bcFBb3Cd0bD5A7";
                const owner = await DustForPunksAllocator.owner();
                expect(owner).to.be.equal(data.deployerSigner.address);
                let tx = await DustForPunksAllocator.transferOwnership(newOwner);
                tx.wait();
                const afterOwner = await DustForPunksAllocator.owner();
                expect(afterOwner).to.be.equal(newOwner);
            });
        });
    });
});
