/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ERC777, ERC777Interface } from "../ERC777";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
      {
        internalType: "address[]",
        name: "defaultOperators_",
        type: "address[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "tokenHolder",
        type: "address",
      },
    ],
    name: "AuthorizedOperator",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "operatorData",
        type: "bytes",
      },
    ],
    name: "Burned",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "operatorData",
        type: "bytes",
      },
    ],
    name: "Minted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "tokenHolder",
        type: "address",
      },
    ],
    name: "RevokedOperator",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "operatorData",
        type: "bytes",
      },
    ],
    name: "Sent",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "authorizeOperator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenHolder",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "defaultOperators",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "granularity",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenHolder",
        type: "address",
      },
    ],
    name: "isOperatorFor",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "operatorData",
        type: "bytes",
      },
    ],
    name: "operatorBurn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "operatorData",
        type: "bytes",
      },
    ],
    name: "operatorSend",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "revokeOperator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "send",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200331b3803806200331b833981810160405260608110156200003757600080fd5b81019080805160405193929190846401000000008211156200005857600080fd5b838201915060208201858111156200006f57600080fd5b82518660018202830111640100000000821117156200008d57600080fd5b8083526020830192505050908051906020019080838360005b83811015620000c3578082015181840152602081019050620000a6565b50505050905090810190601f168015620000f15780820380516001836020036101000a031916815260200191505b50604052602001805160405193929190846401000000008211156200011557600080fd5b838201915060208201858111156200012c57600080fd5b82518660018202830111640100000000821117156200014a57600080fd5b8083526020830192505050908051906020019080838360005b838110156200018057808201518184015260208101905062000163565b50505050905090810190601f168015620001ae5780820380516001836020036101000a031916815260200191505b5060405260200180516040519392919084640100000000821115620001d257600080fd5b83820191506020820185811115620001e957600080fd5b82518660208202830111640100000000821117156200020757600080fd5b8083526020830192505050908051906020019060200280838360005b838110156200024057808201518184015260208101905062000223565b505050509050016040525050508260029080519060200190620002659291906200050b565b5081600390805190602001906200027e9291906200050b565b50806004908051906020019062000297929190620005a2565b5060005b600480549050811015620003475760016005600060048481548110620002bd57fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555080806001019150506200029b565b50731820a4b7618bde71dce8cdc73aab6c95905fad2473ffffffffffffffffffffffffffffffffffffffff166329965a1d307fac7fbab5f54a3ca8194167523c6753bfeb96a445279294b6125b68cce2177054306040518463ffffffff1660e01b8152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018381526020018273ffffffffffffffffffffffffffffffffffffffff1681526020019350505050600060405180830381600087803b1580156200040c57600080fd5b505af115801562000421573d6000803e3d6000fd5b50505050731820a4b7618bde71dce8cdc73aab6c95905fad2473ffffffffffffffffffffffffffffffffffffffff166329965a1d307faea199e31a596269b42cdafd93407f14436db6e4cad65417994c2eb37381e05a306040518463ffffffff1660e01b8152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018381526020018273ffffffffffffffffffffffffffffffffffffffff1681526020019350505050600060405180830381600087803b158015620004e957600080fd5b505af1158015620004fe573d6000803e3d6000fd5b5050505050505062000650565b828054600181600116156101000203166002900490600052602060002090601f0160209004810192826200054357600085556200058f565b82601f106200055e57805160ff19168380011785556200058f565b828001600101855582156200058f579182015b828111156200058e57825182559160200191906001019062000571565b5b5090506200059e919062000631565b5090565b8280548282559060005260206000209081019282156200061e579160200282015b828111156200061d5782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555091602001919060010190620005c3565b5b5090506200062d919062000631565b5090565b5b808211156200064c57600081600090555060010162000632565b5090565b612cbb80620006606000396000f3fe608060405234801561001057600080fd5b50600436106101165760003560e01c8063959b8c3f116100a2578063d95b637111610071578063d95b637114610746578063dd62ed3e146107c0578063fad8b32a14610838578063fc673c4f1461087c578063fe9d9303146109f857610116565b8063959b8c3f1461053657806395d89b411461057a5780639bd9bbc6146105fd578063a9059cbb146106e257610116565b806323b872dd116100e957806323b872dd1461027f578063313ce56714610303578063556f0dc71461032457806362ad1b831461034257806370a08231146104de57610116565b806306e485381461011b57806306fdde031461017a578063095ea7b3146101fd57806318160ddd14610261575b600080fd5b610123610abd565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b8381101561016657808201518184015260208101905061014b565b505050509050019250505060405180910390f35b610182610b4b565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156101c25780820151818401526020810190506101a7565b50505050905090810190601f1680156101ef5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102496004803603604081101561021357600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610bed565b60405180821515815260200191505060405180910390f35b610269610c10565b6040518082815260200191505060405180910390f35b6102eb6004803603606081101561029557600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610c1a565b60405180821515815260200191505060405180910390f35b61030b610e78565b604051808260ff16815260200191505060405180910390f35b61032c610e81565b6040518082815260200191505060405180910390f35b6104dc600480360360a081101561035857600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190803590602001906401000000008111156103bf57600080fd5b8201836020820111156103d157600080fd5b803590602001918460018302840111640100000000831117156103f357600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561045657600080fd5b82018360208201111561046857600080fd5b8035906020019184600183028401116401000000008311171561048a57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290505050610e8a565b005b610520600480360360208110156104f457600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610f06565b6040518082815260200191505060405180910390f35b6105786004803603602081101561054c57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610f4e565b005b6105826111c5565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156105c25780820151818401526020810190506105a7565b50505050905090810190601f1680156105ef5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6106e06004803603606081101561061357600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291908035906020019064010000000081111561065a57600080fd5b82018360208201111561066c57600080fd5b8035906020019184600183028401116401000000008311171561068e57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290505050611267565b005b61072e600480360360408110156106f857600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050611291565b60405180821515815260200191505060405180910390f35b6107a86004803603604081101561075c57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506113b5565b60405180821515815260200191505060405180910390f35b610822600480360360408110156107d657600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611566565b6040518082815260200191505060405180910390f35b61087a6004803603602081101561084e57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506115ed565b005b6109f66004803603608081101561089257600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190803590602001906401000000008111156108d957600080fd5b8201836020820111156108eb57600080fd5b8035906020019184600183028401116401000000008311171561090d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561097057600080fd5b82018360208201111561098257600080fd5b803590602001918460018302840111640100000000831117156109a457600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290505050611864565b005b610abb60048036036040811015610a0e57600080fd5b810190808035906020019092919080359060200190640100000000811115610a3557600080fd5b820183602082011115610a4757600080fd5b80359060200191846001830284011164010000000083111715610a6957600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506118dc565b005b60606004805480602002602001604051908101604052809291908181526020018280548015610b4157602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311610af7575b5050505050905090565b606060028054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610be35780601f10610bb857610100808354040283529160200191610be3565b820191906000526020600020905b815481529060010190602001808311610bc657829003601f168201915b5050505050905090565b600080610bf8611902565b9050610c0581858561190a565b600191505092915050565b6000600154905090565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610ca1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526024815260200180612ba16024913960400191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161415610d27576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526026815260200180612c1a6026913960400191505060405180910390fd5b6000610d31611902565b9050610d5f818686866040518060200160405280600081525060405180602001604052806000815250611b01565b610d8b818686866040518060200160405280600081525060405180602001604052806000815250611dc3565b610e3e8582610e3986604051806060016040528060298152602001612bf160299139600860008c73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546120d29092919063ffffffff16565b61190a565b610e6c818686866040518060200160405280600081525060405180602001604052806000815250600061218c565b60019150509392505050565b60006012905090565b60006001905090565b610e9b610e95611902565b866113b5565b610ef0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602c815260200180612bc5602c913960400191505060405180910390fd5b610eff858585858560016124cf565b5050505050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b8073ffffffffffffffffffffffffffffffffffffffff16610f6d611902565b73ffffffffffffffffffffffffffffffffffffffff161415610fda576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526024815260200180612b0f6024913960400191505060405180910390fd5b600560008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16156110c45760076000611038611902565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81549060ff0219169055611161565b6001600660006110d2611902565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505b611169611902565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167ff4caeb2d6ca8932a215a353d0703c326ec2d81fc68170f320eb2ab49e9df61f960405160405180910390a350565b606060038054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561125d5780601f106112325761010080835404028352916020019161125d565b820191906000526020600020905b81548152906001019060200180831161124057829003601f168201915b5050505050905090565b61128c611272611902565b8484846040518060200160405280600081525060016124cf565b505050565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415611318576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526024815260200180612ba16024913960400191505060405180910390fd5b6000611322611902565b9050611350818286866040518060200160405280600081525060405180602001604052806000815250611b01565b61137c818286866040518060200160405280600081525060405180602001604052806000815250611dc3565b6113aa818286866040518060200160405280600081525060405180602001604052806000815250600061218c565b600191505092915050565b60008173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614806114cd5750600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1680156114cc5750600760008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16155b5b8061155e5750600660008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b905092915050565b6000600860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b6115f5611902565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415611679576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526021815260200180612b336021913960400191505060405180910390fd5b600560008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff161561176c576001600760006116d9611902565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550611800565b60066000611778611902565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81549060ff02191690555b611808611902565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f50546e66e5f44d728365dc3908c63bc5cfeeab470722c1677e3073a6ac294aa160405160405180910390a350565b61187561186f611902565b856113b5565b6118ca576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602c815260200180612bc5602c913960400191505060405180910390fd5b6118d684848484612638565b50505050565b6118fe6118e7611902565b838360405180602001604052806000815250612638565b5050565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415611990576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526025815260200180612a7f6025913960400191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611a16576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526023815260200180612c636023913960400191505060405180910390fd5b80600860008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925836040518082815260200191505060405180910390a3505050565b6000731820a4b7618bde71dce8cdc73aab6c95905fad2473ffffffffffffffffffffffffffffffffffffffff1663aabbb8ca877f29ddb589b1fb5fc7cf394961c1adf5f8c6454761adf795e67fe149f658abe89560001b6040518363ffffffff1660e01b8152600401808373ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060206040518083038186803b158015611ba957600080fd5b505afa158015611bbd573d6000803e3d6000fd5b505050506040513d6020811015611bd357600080fd5b81019080805190602001909291905050509050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614611dba578073ffffffffffffffffffffffffffffffffffffffff166375ab97828888888888886040518763ffffffff1660e01b8152600401808773ffffffffffffffffffffffffffffffffffffffff1681526020018673ffffffffffffffffffffffffffffffffffffffff1681526020018573ffffffffffffffffffffffffffffffffffffffff1681526020018481526020018060200180602001838103835285818151815260200191508051906020019080838360005b83811015611ce9578082015181840152602081019050611cce565b50505050905090810190601f168015611d165780820380516001836020036101000a031916815260200191505b50838103825284818151815260200191508051906020019080838360005b83811015611d4f578082015181840152602081019050611d34565b50505050905090810190601f168015611d7c5780820380516001836020036101000a031916815260200191505b5098505050505050505050600060405180830381600087803b158015611da157600080fd5b505af1158015611db5573d6000803e3d6000fd5b505050505b50505050505050565b611dcf8686868661295a565b611e3a83604051806060016040528060278152602001612ac6602791396000808973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546120d29092919063ffffffff16565b6000808773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550611ecd836000808773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461296090919063ffffffff16565b6000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff168773ffffffffffffffffffffffffffffffffffffffff167f06b541ddaa720db2b10a4d0cdac39b8d360425fc073085fac19bc82614677987868686604051808481526020018060200180602001838103835285818151815260200191508051906020019080838360005b83811015611fc2578082015181840152602081019050611fa7565b50505050905090810190601f168015611fef5780820380516001836020036101000a031916815260200191505b50838103825284818151815260200191508051906020019080838360005b8381101561202857808201518184015260208101905061200d565b50505050905090810190601f1680156120555780820380516001836020036101000a031916815260200191505b509550505050505060405180910390a48373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef856040518082815260200191505060405180910390a3505050505050565b600083831115829061217f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015612144578082015181840152602081019050612129565b50505050905090810190601f1680156121715780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5082840390509392505050565b6000731820a4b7618bde71dce8cdc73aab6c95905fad2473ffffffffffffffffffffffffffffffffffffffff1663aabbb8ca877fb281fc8c12954d22544db45de3159a39272895b169a852b314f9cc762e44c53b60001b6040518363ffffffff1660e01b8152600401808373ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060206040518083038186803b15801561223457600080fd5b505afa158015612248573d6000803e3d6000fd5b505050506040513d602081101561225e57600080fd5b81019080805190602001909291905050509050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614612448578073ffffffffffffffffffffffffffffffffffffffff166223de298989898989896040518763ffffffff1660e01b8152600401808773ffffffffffffffffffffffffffffffffffffffff1681526020018673ffffffffffffffffffffffffffffffffffffffff1681526020018573ffffffffffffffffffffffffffffffffffffffff1681526020018481526020018060200180602001838103835285818151815260200191508051906020019080838360005b83811015612373578082015181840152602081019050612358565b50505050905090810190601f1680156123a05780820380516001836020036101000a031916815260200191505b50838103825284818151815260200191508051906020019080838360005b838110156123d95780820151818401526020810190506123be565b50505050905090810190601f1680156124065780820380516001836020036101000a031916815260200191505b5098505050505050505050600060405180830381600087803b15801561242b57600080fd5b505af115801561243f573d6000803e3d6000fd5b505050506124c5565b81156124c45761246d8673ffffffffffffffffffffffffffffffffffffffff166129e8565b156124c3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252604d815260200180612b54604d913960600191505060405180910390fd5b5b5b5050505050505050565b600073ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff161415612555576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526022815260200180612aa46022913960400191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1614156125f8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4552433737373a2073656e6420746f20746865207a65726f206164647265737381525060200191505060405180910390fd5b6000612602611902565b9050612612818888888888611b01565b612620818888888888611dc3565b61262f8188888888888861218c565b50505050505050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1614156126be576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526022815260200180612aed6022913960400191505060405180910390fd5b60006126c8611902565b90506126d981866000878787611b01565b6126e6818660008761295a565b61275184604051806060016040528060238152602001612c40602391396000808973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546120d29092919063ffffffff16565b6000808773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506127a8846001546129fb90919063ffffffff16565b6001819055508473ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167fa78a9be3a7b862d26933ad85fb11d80ef66b8f972d7cbba06621d583943a4098868686604051808481526020018060200180602001838103835285818151815260200191508051906020019080838360005b8381101561284a57808201518184015260208101905061282f565b50505050905090810190601f1680156128775780820380516001836020036101000a031916815260200191505b50838103825284818151815260200191508051906020019080838360005b838110156128b0578082015181840152602081019050612895565b50505050905090810190601f1680156128dd5780820380516001836020036101000a031916815260200191505b509550505050505060405180910390a3600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef866040518082815260200191505060405180910390a35050505050565b50505050565b6000808284019050838110156129de576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f536166654d6174683a206164646974696f6e206f766572666c6f77000000000081525060200191505060405180910390fd5b8091505092915050565b600080823b905060008111915050919050565b600082821115612a73576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601e8152602001807f536166654d6174683a207375627472616374696f6e206f766572666c6f77000081525060200191505060405180910390fd5b81830390509291505056fe4552433737373a20617070726f76652066726f6d20746865207a65726f20616464726573734552433737373a2073656e642066726f6d20746865207a65726f20616464726573734552433737373a207472616e7366657220616d6f756e7420657863656564732062616c616e63654552433737373a206275726e2066726f6d20746865207a65726f20616464726573734552433737373a20617574686f72697a696e672073656c66206173206f70657261746f724552433737373a207265766f6b696e672073656c66206173206f70657261746f724552433737373a20746f6b656e20726563697069656e7420636f6e747261637420686173206e6f20696d706c656d656e74657220666f7220455243373737546f6b656e73526563697069656e744552433737373a207472616e7366657220746f20746865207a65726f20616464726573734552433737373a2063616c6c6572206973206e6f7420616e206f70657261746f7220666f7220686f6c6465724552433737373a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e63654552433737373a207472616e736665722066726f6d20746865207a65726f20616464726573734552433737373a206275726e20616d6f756e7420657863656564732062616c616e63654552433737373a20617070726f766520746f20746865207a65726f2061646472657373a2646970667358221220c8f85880931b7bd8bd6c8403ffa09a649a1bef4f47fb4e4718bd64c029e16b9864736f6c63430007050033";

export class ERC777__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    name_: string,
    symbol_: string,
    defaultOperators_: string[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ERC777> {
    return super.deploy(
      name_,
      symbol_,
      defaultOperators_,
      overrides || {}
    ) as Promise<ERC777>;
  }
  getDeployTransaction(
    name_: string,
    symbol_: string,
    defaultOperators_: string[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      name_,
      symbol_,
      defaultOperators_,
      overrides || {}
    );
  }
  attach(address: string): ERC777 {
    return super.attach(address) as ERC777;
  }
  connect(signer: Signer): ERC777__factory {
    return super.connect(signer) as ERC777__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC777Interface {
    return new utils.Interface(_abi) as ERC777Interface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): ERC777 {
    return new Contract(address, _abi, signerOrProvider) as ERC777;
  }
}
