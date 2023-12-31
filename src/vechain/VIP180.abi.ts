import { abi } from "thor-devkit"

/**
 * EVENTS
 */
const ApprovalEvent: abi.Event.Definition = {
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
}
const TransferEvent: abi.Event.Definition = {
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
}

/**
 * FUNCTIONS
 */
const allowance: abi.Function.Definition = {
  inputs: [
    {
      internalType: "address",
      name: "owner",
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
}
const approve: abi.Function.Definition = {
  inputs: [
    {
      internalType: "address",
      name: "spender",
      type: "address",
    },
    {
      internalType: "uint256",
      name: "amount",
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
}
const balanceOf: abi.Function.Definition = {
  inputs: [
    {
      internalType: "address",
      name: "account",
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
}
const decimals: abi.Function.Definition = {
  inputs: [],
  name: "decimals",
  outputs: [
    {
      internalType: "uint8",
      name: "",
      type: "uint8",
    },
  ],
  stateMutability: "view",
  type: "function",
}
const name: abi.Function.Definition = {
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
}
const supportsInterface = {
  inputs: [
    {
      internalType: "bytes4",
      name: "interfaceId",
      type: "bytes4",
    },
  ],
  name: "supportsInterface",
  outputs: [
    {
      internalType: "bool",
      name: "",
      type: "bool",
    },
  ],
  stateMutability: "view",
  type: "function",
}
const symbol: abi.Function.Definition = {
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
}
const totalSupply: abi.Function.Definition = {
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
}
const transfer: abi.Function.Definition = {
  inputs: [
    {
      internalType: "address",
      name: "to",
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
}
const transferFrom: abi.Function.Definition = {
  inputs: [
    {
      internalType: "address",
      name: "from",
      type: "address",
    },
    {
      internalType: "address",
      name: "to",
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
}
const mint: abi.Function.Definition = {
  inputs: [
    {
      internalType: "address",
      name: "to",
      type: "address",
    },
    {
      internalType: "uint256",
      name: "amount",
      type: "uint256",
    },
  ],
  name: "mint",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function",
}
const burn: abi.Function.Definition = {
  inputs: [
    {
      internalType: "uint256",
      name: "amount",
      type: "uint256",
    },
  ],
  name: "burn",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function",
}
const burnFrom: abi.Function.Definition = {
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
  ],
  name: "burnFrom",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function",
}

export default {
  ApprovalEvent,
  TransferEvent,
  allowance,
  approve,
  balanceOf,
  decimals,
  name,
  supportsInterface,
  symbol,
  totalSupply,
  transfer,
  transferFrom,
  mint,
  burn,
  burnFrom,
}
