const { ZERO_ADDRESS, ROLE, Data } = require('./helpers/common');
import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import chai from "chai";
import { solidity } from "ethereum-waffle";
chai.use(solidity);
const { expect } = chai;
// make sure to have ethers.js 5.X required, else this will fail!
const BigNumber = ethers.BigNumber;

const ERC1820 = {
    RawTx:              "0xf90a388085174876e800830c35008080b909e5608060405234801561001057600080fd5b506109c5806100206000396000f3fe608060405234801561001057600080fd5b50600436106100a5576000357c010000000000000000000000000000000000000000000000000000000090048063a41e7d5111610078578063a41e7d51146101d4578063aabbb8ca1461020a578063b705676514610236578063f712f3e814610280576100a5565b806329965a1d146100aa5780633d584063146100e25780635df8122f1461012457806365ba36c114610152575b600080fd5b6100e0600480360360608110156100c057600080fd5b50600160a060020a038135811691602081013591604090910135166102b6565b005b610108600480360360208110156100f857600080fd5b5035600160a060020a0316610570565b60408051600160a060020a039092168252519081900360200190f35b6100e06004803603604081101561013a57600080fd5b50600160a060020a03813581169160200135166105bc565b6101c26004803603602081101561016857600080fd5b81019060208101813564010000000081111561018357600080fd5b82018360208201111561019557600080fd5b803590602001918460018302840111640100000000831117156101b757600080fd5b5090925090506106b3565b60408051918252519081900360200190f35b6100e0600480360360408110156101ea57600080fd5b508035600160a060020a03169060200135600160e060020a0319166106ee565b6101086004803603604081101561022057600080fd5b50600160a060020a038135169060200135610778565b61026c6004803603604081101561024c57600080fd5b508035600160a060020a03169060200135600160e060020a0319166107ef565b604080519115158252519081900360200190f35b61026c6004803603604081101561029657600080fd5b508035600160a060020a03169060200135600160e060020a0319166108aa565b6000600160a060020a038416156102cd57836102cf565b335b9050336102db82610570565b600160a060020a031614610339576040805160e560020a62461bcd02815260206004820152600f60248201527f4e6f7420746865206d616e616765720000000000000000000000000000000000604482015290519081900360640190fd5b6103428361092a565b15610397576040805160e560020a62461bcd02815260206004820152601a60248201527f4d757374206e6f7420626520616e204552433136352068617368000000000000604482015290519081900360640190fd5b600160a060020a038216158015906103b85750600160a060020a0382163314155b156104ff5760405160200180807f455243313832305f4143434550545f4d4147494300000000000000000000000081525060140190506040516020818303038152906040528051906020012082600160a060020a031663249cb3fa85846040518363ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018083815260200182600160a060020a0316600160a060020a031681526020019250505060206040518083038186803b15801561047e57600080fd5b505afa158015610492573d6000803e3d6000fd5b505050506040513d60208110156104a857600080fd5b5051146104ff576040805160e560020a62461bcd02815260206004820181905260248201527f446f6573206e6f7420696d706c656d656e742074686520696e74657266616365604482015290519081900360640190fd5b600160a060020a03818116600081815260208181526040808320888452909152808220805473ffffffffffffffffffffffffffffffffffffffff19169487169485179055518692917f93baa6efbd2244243bfee6ce4cfdd1d04fc4c0e9a786abd3a41313bd352db15391a450505050565b600160a060020a03818116600090815260016020526040812054909116151561059a5750806105b7565b50600160a060020a03808216600090815260016020526040902054165b919050565b336105c683610570565b600160a060020a031614610624576040805160e560020a62461bcd02815260206004820152600f60248201527f4e6f7420746865206d616e616765720000000000000000000000000000000000604482015290519081900360640190fd5b81600160a060020a031681600160a060020a0316146106435780610646565b60005b600160a060020a03838116600081815260016020526040808220805473ffffffffffffffffffffffffffffffffffffffff19169585169590951790945592519184169290917f605c2dbf762e5f7d60a546d42e7205dcb1b011ebc62a61736a57c9089d3a43509190a35050565b600082826040516020018083838082843780830192505050925050506040516020818303038152906040528051906020012090505b92915050565b6106f882826107ef565b610703576000610705565b815b600160a060020a03928316600081815260208181526040808320600160e060020a031996909616808452958252808320805473ffffffffffffffffffffffffffffffffffffffff19169590971694909417909555908152600284528181209281529190925220805460ff19166001179055565b600080600160a060020a038416156107905783610792565b335b905061079d8361092a565b156107c357826107ad82826108aa565b6107b85760006107ba565b815b925050506106e8565b600160a060020a0390811660009081526020818152604080832086845290915290205416905092915050565b6000808061081d857f01ffc9a70000000000000000000000000000000000000000000000000000000061094c565b909250905081158061082d575080155b1561083d576000925050506106e8565b61084f85600160e060020a031961094c565b909250905081158061086057508015155b15610870576000925050506106e8565b61087a858561094c565b909250905060018214801561088f5750806001145b1561089f576001925050506106e8565b506000949350505050565b600160a060020a0382166000908152600260209081526040808320600160e060020a03198516845290915281205460ff1615156108f2576108eb83836107ef565b90506106e8565b50600160a060020a03808316600081815260208181526040808320600160e060020a0319871684529091529020549091161492915050565b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff161590565b6040517f01ffc9a7000000000000000000000000000000000000000000000000000000008082526004820183905260009182919060208160248189617530fa90519096909550935050505056fea165627a7a72305820377f4a2d4301ede9949f163f319021a6e9c687c292a5e2b2c4734c126b524e6c00291ba01820182018201820182018201820182018201820182018201820182018201820a01820182018201820182018201820182018201820182018201820182018201820",
    SenderAddress:      "0xa990077c3205cbDf861e17Fa532eeB069cE9fF96",
    ContractAddress:    "0x1820a4B7618BdE71Dce8cdc73aAB6C95905faD24",
    FundsSupplierAddress: "",
    sig: {
    v: "0x1b", // 27
    r: "0x1820182018201820182018201820182018201820182018201820182018201820",
    s: "0x1820182018201820182018201820182018201820182018201820182018201820"
    },
    abi: [
    {
        constant: false,
        inputs: [
        { name: "_addr", type: "address" },
        { name: "_interfaceHash", type: "bytes32" },
        { name: "_implementer", type: "address" }
        ],
        name: "setInterfaceImplementer",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: true,
        inputs: [{ name: "_addr", type: "address" }],
        name: "getManager",
        outputs: [{ name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: false,
        inputs: [
            { name: "_addr", type: "address" },
            { name: "_newManager", type: "address" }
        ],
        name: "setManager",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: true,
        inputs: [{ name: "_interfaceName", type: "string" }],
        name: "interfaceHash",
        outputs: [{ name: "", type: "bytes32" }],
        payable: false,
        stateMutability: "pure",
        type: "function"
    },
    {
        constant: false,
        inputs: [
            { name: "_contract", type: "address" },
            { name: "_interfaceId", type: "bytes4" }
        ],
        name: "updateERC165Cache",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: true,
        inputs: [
            { name: "_addr", type: "address" },
            { name: "_interfaceHash", type: "bytes32" }
        ],
        name: "getInterfaceImplementer",
        outputs: [{ name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: true,
        inputs: [
            { name: "_contract", type: "address" },
            { name: "_interfaceId", type: "bytes4" }
        ],
        name: "implementsERC165InterfaceNoCache",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: true,
        inputs: [
            { name: "_contract", type: "address" },
            { name: "_interfaceId", type: "bytes4" }
        ],
        name: "implementsERC165Interface",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: "addr", type: "address" },
            { indexed: true, name: "interfaceHash", type: "bytes32" },
            { indexed: true, name: "implementer", type: "address" }
        ],
        name: "InterfaceImplementerSet",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: "addr", type: "address" },
            { indexed: true, name: "newManager", type: "address" }
        ],
        name: "ManagerChanged",
        type: "event"
    }
    ],
    instance: false,
    deploymentCost: BigNumber.from("80000000000000000"),
};

describe("Validated ERC1820 - Token Registry", function () {
    let data: any, accounts: any, owner: any, testingAccount1: any, testingAccount2: any;

    before(async function () {
        accounts = await ethers.getSigners();

        data = new Data();
        await data.init();

        owner = data.deployerSigner;
        testingAccount1 = data.user2Signer;
        testingAccount2 = data.user3Signer;

        ERC1820.FundsSupplierAddress = owner.address;

    });

    describe("Step 1 - Before deployment state", function () {

        it("Contract Code at address: " + ERC1820.ContractAddress + " should be 0x", async function () {
            const ContractCode = await ethers.provider.getCode(ERC1820.ContractAddress);
            expect( ContractCode ).to.be.equal( "0x" );
        });

        it("Deployer address: " + ERC1820.SenderAddress + " balance should be 0 eth", async function () {
            const SenderBalance = await ethers.provider.getBalance(ERC1820.SenderAddress);
            expect( SenderBalance.toString() ).to.be.equal( '0' );
        });

        it("Funds Supplier address: " + ERC1820.FundsSupplierAddress + " balance should be at least 0.08 eth", async function () {
            const SupplierBalance = await ethers.provider.getBalance(ERC1820.FundsSupplierAddress);
            const deploymentCost = BigNumber.from( ERC1820.deploymentCost.toString() );
            
            expect( SupplierBalance.gt(deploymentCost) ).to.be.eq(true);
        });
    });

    describe("Step 2 - Deployment preparation", function () {

        let valueTransferTx: any, initialFundsSupplierBalance: any, txGasPrice: any;
        before(async function () {

            txGasPrice = 20000000000; // 20 gwei
            initialFundsSupplierBalance = BigNumber.from( await ethers.provider.getBalance(ERC1820.FundsSupplierAddress) );

            // transfer deploymentCost from SupplierBalance to SenderAddress and validate
            let tx = await owner.sendTransaction({
                to: ERC1820.SenderAddress,
                value: ERC1820.deploymentCost.toHexString(),
                gasPrice: txGasPrice
            });
            valueTransferTx = await tx.wait();
        });

        describe("New Account balances after Supplier sends value to SenderAddress", function () {

            it("FundsSupplier balance has deploymentCost + tx fee substracted", async function () {

                const newSupplierBalance: any = await ethers.provider.getBalance(ERC1820.FundsSupplierAddress);
                // gas used
                let combinedValue: any = BigNumber.from( valueTransferTx.gasUsed.toString() )
                // times gas price
                combinedValue = combinedValue.mul( BigNumber.from( txGasPrice ) );
                // add value sent
                combinedValue = combinedValue.add( BigNumber.from( ERC1820.deploymentCost.toString() ) );

                // initial minus sent + gas * gas price
                const newCalculatedBalance: any = initialFundsSupplierBalance.sub(combinedValue);

                expect( newSupplierBalance.toString() ).to.be.equal( newCalculatedBalance.toString() );
            });

            it("SenderAddress balance is equal to deploymentCost", async function () {
                const SenderBalance = await ethers.provider.getBalance(ERC1820.SenderAddress);
                expect( SenderBalance.toString() ).to.be.equal( ERC1820.deploymentCost.toString() );
            });
        });

    });


    describe("Step 3 - ERC1820 Deployment", function () {

        let deploymentTx: any, deploymentReceit: any;
        before(async function () {

            //     await ethers.provider.send('eth_sendRawTransaction', [ERC1820.RawTx]);

            // sendRawTransaction if upgrading to the latest web3
            deploymentTx = await ethers.provider.sendTransaction(ERC1820.RawTx)
            deploymentReceit = await deploymentTx.wait();

            console.log("      Gas used for deployment:", deploymentReceit.gasUsed.toString());
            console.log("      Contract Address:", deploymentReceit.contractAddress);
            console.log("");

        });

        describe("Validation after ERC1820 Registry contract deployment", function () {

            describe("Transaction", function () {

                it("status is 1", async function () {
                    expect( deploymentReceit.status ).to.be.equal( 1 );
                });

                it("signature is valid", async function () {
                    expect( BigNumber.from( deploymentTx.v ).toHexString() ).to.be.equal( ERC1820.sig.v );
                    expect( BigNumber.from( deploymentTx.r ).toHexString() ).to.be.equal( ERC1820.sig.r );
                    expect( BigNumber.from( deploymentTx.s ).toHexString() ).to.be.equal( ERC1820.sig.s );
                });

                it("from address is correct", async function () {
                    expect( deploymentTx.from ).to.be.equal( ERC1820.SenderAddress );
                });

                it("Contract address is 0x1820a4B7618BdE71Dce8cdc73aAB6C95905faD24", async function () {
                    expect( deploymentReceit.contractAddress ).to.be.equal( ERC1820.ContractAddress );
                });

            });

            describe("Contract", function () {
                let instance: any;
                before(async function () {
                    // initiate global instance
                    instance = new ethers.Contract(ERC1820.ContractAddress, ERC1820.abi, accounts[0]);
                });

                it("code at address exists", async function () {
                    const ContractCode = await ethers.provider.getCode(ERC1820.ContractAddress);
                    expect( ContractCode.length ).to.be.equal( 5004 );
                });

                it("contract has the getManager method which can be called", async function () {
                    const test: any = await instance["getManager"]( accounts[0].address );
                    expect( test ).to.be.equal( accounts[0].address );
                });

            });

        });

    });

});
