/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  DustForPunksAllocator,
  DustForPunksAllocatorInterface,
} from "../DustForPunksAllocator";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_erc721",
        type: "address",
      },
      {
        internalType: "address",
        name: "_erc20",
        type: "address",
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
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint16",
        name: "tokenId",
        type: "uint16",
      },
    ],
    name: "Redeemed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint16",
        name: "tokenId",
        type: "uint16",
      },
    ],
    name: "Skipped",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    name: "cardTypeAmounts",
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
    inputs: [],
    name: "erc20",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "erc721",
    outputs: [
      {
        internalType: "contract IERC721",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16[]",
        name: "_tokenIds",
        type: "uint16[]",
      },
    ],
    name: "getAvailableBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBlockTimestamp",
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
        internalType: "uint16",
        name: "_tokenId",
        type: "uint16",
      },
    ],
    name: "getCardTypeFromId",
    outputs: [
      {
        internalType: "uint8",
        name: "_cardType",
        type: "uint8",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "_page",
        type: "uint8",
      },
      {
        internalType: "uint16",
        name: "_perPage",
        type: "uint16",
      },
    ],
    name: "getUsedTokenData",
    outputs: [
      {
        internalType: "uint8[]",
        name: "",
        type: "uint8[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_position",
        type: "uint16",
      },
    ],
    name: "isTokenUsed",
    outputs: [
      {
        internalType: "bool",
        name: "result",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "locked",
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
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16[]",
        name: "_tokenIds",
        type: "uint16[]",
      },
    ],
    name: "redeem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "removeUnlockTime",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_tracker",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "retrieve721",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_tracker",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "retrieveERC20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "toggleLocked",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unlockTime",
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
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001d5438038062001d5483398181016040528101906200003791906200020c565b600062000049620001ed60201b60201c565b9050806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508073ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35081600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555069152d02c7e14af680000060016000600160ff1681526020019081526020016000208190555069021e19e0c9bab240000060016000600260ff16815260200190815260200160002081905550683635c9adc5dea0000060016000600360ff1681526020019081526020016000208190555063615afad060058190555050506200029b565b600033905090565b600081519050620002068162000281565b92915050565b600080604083850312156200022057600080fd5b60006200023085828601620001f5565b92505060206200024385828601620001f5565b9150509250929050565b60006200025a8262000261565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6200028c816200024d565b81146200029857600080fd5b50565b611aa980620002ab6000396000f3fe608060405234801561001057600080fd5b50600436106101165760003560e01c8063796b89b9116100a2578063bca6ce6411610071578063bca6ce6414610295578063c9c2c570146102b3578063cf309012146102e3578063da90e8b714610301578063f2fde38b1461033157610116565b8063796b89b914610221578063854d5a4e1461023f5780638da5cb5b1461025b578063a5b3abfb1461027957610116565b806347a8aa90116100e957806347a8aa901461018f57806351328984146101bf578063715018a6146101c957806376d76d3b146101d3578063785e9e861461020357610116565b806301b117921461011b5780630d1bc6311461012557806317fd1e2f14610155578063251c1aa314610171575b600080fd5b61012361034d565b005b61013f600480360381019061013a9190611429565b610428565b60405161014c9190611760565b60405180910390f35b61016f600480360381019061016a919061137f565b6104ce565b005b61017961060f565b6040516101869190611867565b60405180910390f35b6101a960048036038101906101a49190611429565b610615565b6040516101b69190611882565b60405180910390f35b6101c76106e3565b005b6101d161079b565b005b6101ed60048036038101906101e8919061147b565b610908565b6040516101fa919061173e565b60405180910390f35b61020b6109b7565b604051610218919061177b565b60405180910390f35b6102296109dd565b6040516102369190611867565b60405180910390f35b610259600480360381019061025491906113bb565b6109e5565b005b610263610d23565b60405161027091906116c3565b60405180910390f35b610293600480360381019061028e919061137f565b610d4c565b005b61029d610e6e565b6040516102aa9190611796565b60405180910390f35b6102cd60048036038101906102c89190611452565b610e94565b6040516102da9190611867565b60405180910390f35b6102eb610eac565b6040516102f89190611760565b60405180910390f35b61031b600480360381019061031691906113bb565b610ebf565b6040516103289190611867565b60405180910390f35b61034b6004803603810190610346919061132d565b610f56565b005b610355611148565b73ffffffffffffffffffffffffffffffffffffffff16610373610d23565b73ffffffffffffffffffffffffffffffffffffffff16146103fc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b600460149054906101000a900460ff1615600460146101000a81548160ff021916908315150217905550565b60008060088361ffff168161043957fe5b049050600060088202840360ff1690506000600260008461ffff1661ffff16815260200190815260200160002060009054906101000a900460ff1660ff161415610488576000925050506104c9565b60008161ffff1660020a600102600260008561ffff1661ffff16815260200190815260200160002060009054906101000a900460ff1660ff16161415925050505b919050565b6104d6611148565b73ffffffffffffffffffffffffffffffffffffffff166104f4610d23565b73ffffffffffffffffffffffffffffffffffffffff161461057d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b8173ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33836040518363ffffffff1660e01b81526004016105b89291906116de565b602060405180830381600087803b1580156105d257600080fd5b505af11580156105e6573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061060a9190611400565b505050565b60055481565b6000600a8261ffff16101561065f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610656906117b1565b60405180910390fd5b60648261ffff16101561067557600190506106de565b6103e88261ffff16101561068c57600290506106de565b6127108261ffff1610156106a357600390506106de565b6040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106d5906117f1565b60405180910390fd5b919050565b6106eb611148565b73ffffffffffffffffffffffffffffffffffffffff16610709610d23565b73ffffffffffffffffffffffffffffffffffffffff1614610792576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b42600581905550565b6107a3611148565b73ffffffffffffffffffffffffffffffffffffffff166107c1610d23565b73ffffffffffffffffffffffffffffffffffffffff161461084a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a360008060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b606060088261ffff168161091857fe5b04915060008360ff168302905060008382019050600060608581525b8261ffff168461ffff1610156109a657600260008561ffff1661ffff16815260200190815260200160002060009054906101000a900460ff16818361ffff168151811061097d57fe5b602002602001019060ff16908160ff168152505081806001019250508380600101945050610934565b596040528094505050505092915050565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600042905090565b600460149054906101000a900460ff16158015610a0a5750600554610a086109dd565b115b610a49576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a40906117d1565b60405180910390fd5b600080600090505b838390508160ff161015610c6d57600084848360ff16818110610a7057fe5b9050602002016020810190610a859190611429565b90503373ffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636352211e836040518263ffffffff1660e01b8152600401610af9919061184c565b60206040518083038186803b158015610b1157600080fd5b505afa158015610b25573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b499190611356565b73ffffffffffffffffffffffffffffffffffffffff1614610b9f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b9690611811565b60405180910390fd5b610ba881610428565b610c2757610be060016000610bbc84610615565b60ff1660ff168152602001908152602001600020548461115090919063ffffffff16565b9250610beb816111d8565b7f8357b7cc123a6e8fe3739217d8a978c9ce32211b7ffe2799cf67dd211ed93ce081604051610c1a9190611831565b60405180910390a1610c5f565b7f0af875050dac9daa78c864b492f6180ca5886897dc0421e62dbded38509d1e6f81604051610c569190611831565b60405180910390a15b508080600101915050610a51565b50600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33836040518363ffffffff1660e01b8152600401610ccb9291906116de565b602060405180830381600087803b158015610ce557600080fd5b505af1158015610cf9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d1d9190611400565b50505050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b610d54611148565b73ffffffffffffffffffffffffffffffffffffffff16610d72610d23565b73ffffffffffffffffffffffffffffffffffffffff1614610dfb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b8173ffffffffffffffffffffffffffffffffffffffff166323b872dd3033846040518463ffffffff1660e01b8152600401610e3893929190611707565b600060405180830381600087803b158015610e5257600080fd5b505af1158015610e66573d6000803e3d6000fd5b505050505050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60016020528060005260406000206000915090505481565b600460149054906101000a900460ff1681565b600080600090505b838390508160ff161015610f4f57600084848360ff16818110610ee657fe5b9050602002016020810190610efb9190611429565b9050610f0681610428565b610f4157610f3e60016000610f1a84610615565b60ff1660ff168152602001908152602001600020548461115090919063ffffffff16565b92505b508080600101915050610ec7565b5092915050565b610f5e611148565b73ffffffffffffffffffffffffffffffffffffffff16610f7c610d23565b73ffffffffffffffffffffffffffffffffffffffff1614611005576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141561108b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526026815260200180611a4e6026913960400191505060405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600033905090565b6000808284019050838110156111ce576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f536166654d6174683a206164646974696f6e206f766572666c6f77000000000081525060200191505060405180910390fd5b8091505092915050565b600060088261ffff16816111e857fe5b049050600060088202830360ff1690508061ffff1660020a600260008461ffff1661ffff16815260200190815260200160002060009054906101000a900460ff1660ff1617600260008461ffff1661ffff16815260200190815260200160002060006101000a81548160ff021916908360ff160217905550505050565b600081359050611274816119da565b92915050565b600081519050611289816119da565b92915050565b60008083601f8401126112a157600080fd5b8235905067ffffffffffffffff8111156112ba57600080fd5b6020830191508360208202830111156112d257600080fd5b9250929050565b6000815190506112e8816119f1565b92915050565b6000813590506112fd81611a08565b92915050565b60008135905061131281611a1f565b92915050565b60008135905061132781611a36565b92915050565b60006020828403121561133f57600080fd5b600061134d84828501611265565b91505092915050565b60006020828403121561136857600080fd5b60006113768482850161127a565b91505092915050565b6000806040838503121561139257600080fd5b60006113a085828601611265565b92505060206113b185828601611303565b9150509250929050565b600080602083850312156113ce57600080fd5b600083013567ffffffffffffffff8111156113e857600080fd5b6113f48582860161128f565b92509250509250929050565b60006020828403121561141257600080fd5b6000611420848285016112d9565b91505092915050565b60006020828403121561143b57600080fd5b6000611449848285016112ee565b91505092915050565b60006020828403121561146457600080fd5b600061147284828501611318565b91505092915050565b6000806040838503121561148e57600080fd5b600061149c85828601611318565b92505060206114ad858286016112ee565b9150509250929050565b60006114c383836116a5565b60208301905092915050565b6114d88161194a565b82525050565b6114e7816118e7565b82525050565b60006114f8826118ad565b61150281856118c5565b935061150d8361189d565b8060005b8381101561153e57815161152588826114b7565b9750611530836118b8565b925050600181019050611511565b5085935050505092915050565b611554816118f9565b82525050565b6115638161195c565b82525050565b61157281611980565b82525050565b60006115856014836118d6565b91507f4361726454797065206e6f7420616c6c6f7765640000000000000000000000006000830152602082019050919050565b60006115c5600f836118d6565b91507f436f6e7472616374206c6f636b656400000000000000000000000000000000006000830152602082019050919050565b60006116056012836118d6565b91507f4361726454797065206e6f7420666f756e6400000000000000000000000000006000830152602082019050919050565b6000611645601a836118d6565b91507f4552433732313a206e6f74206f776e6572206f6620746f6b656e0000000000006000830152602082019050919050565b61168181611905565b82525050565b611690816119c8565b82525050565b61169f81611933565b82525050565b6116ae8161193d565b82525050565b6116bd8161193d565b82525050565b60006020820190506116d860008301846114de565b92915050565b60006040820190506116f360008301856114cf565b6117006020830184611696565b9392505050565b600060608201905061171c60008301866114de565b61172960208301856114cf565b6117366040830184611696565b949350505050565b6000602082019050818103600083015261175881846114ed565b905092915050565b6000602082019050611775600083018461154b565b92915050565b6000602082019050611790600083018461155a565b92915050565b60006020820190506117ab6000830184611569565b92915050565b600060208201905081810360008301526117ca81611578565b9050919050565b600060208201905081810360008301526117ea816115b8565b9050919050565b6000602082019050818103600083015261180a816115f8565b9050919050565b6000602082019050818103600083015261182a81611638565b9050919050565b60006020820190506118466000830184611678565b92915050565b60006020820190506118616000830184611687565b92915050565b600060208201905061187c6000830184611696565b92915050565b600060208201905061189760008301846116b4565b92915050565b6000819050602082019050919050565b600081519050919050565b6000602082019050919050565b600082825260208201905092915050565b600082825260208201905092915050565b60006118f282611913565b9050919050565b60008115159050919050565b600061ffff82169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b6000611955826119a4565b9050919050565b60006119678261196e565b9050919050565b600061197982611913565b9050919050565b600061198b82611992565b9050919050565b600061199d82611913565b9050919050565b60006119af826119b6565b9050919050565b60006119c182611913565b9050919050565b60006119d382611905565b9050919050565b6119e3816118e7565b81146119ee57600080fd5b50565b6119fa816118f9565b8114611a0557600080fd5b50565b611a1181611905565b8114611a1c57600080fd5b50565b611a2881611933565b8114611a3357600080fd5b50565b611a3f8161193d565b8114611a4a57600080fd5b5056fe4f776e61626c653a206e6577206f776e657220697320746865207a65726f2061646472657373a264697066735822122053b4ddd95eb9cb8874a67987b0f4ee85ba618bb12964b31df04a7806a13c2bed64736f6c63430007050033";

export class DustForPunksAllocator__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _erc721: string,
    _erc20: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<DustForPunksAllocator> {
    return super.deploy(
      _erc721,
      _erc20,
      overrides || {}
    ) as Promise<DustForPunksAllocator>;
  }
  getDeployTransaction(
    _erc721: string,
    _erc20: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_erc721, _erc20, overrides || {});
  }
  attach(address: string): DustForPunksAllocator {
    return super.attach(address) as DustForPunksAllocator;
  }
  connect(signer: Signer): DustForPunksAllocator__factory {
    return super.connect(signer) as DustForPunksAllocator__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DustForPunksAllocatorInterface {
    return new utils.Interface(_abi) as DustForPunksAllocatorInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DustForPunksAllocator {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as DustForPunksAllocator;
  }
}
