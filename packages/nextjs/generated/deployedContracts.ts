const contracts = {
  31337: [
    {
      chainId: "31337",
      name: "localhost",
      contracts: {
        KindredCore: {
          address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
          abi: [
            {
              inputs: [],
              name: "ECDSAInvalidSignature",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "length",
                  type: "uint256",
                },
              ],
              name: "ECDSAInvalidSignatureLength",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "s",
                  type: "bytes32",
                },
              ],
              name: "ECDSAInvalidSignatureS",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "blacklistee",
                  type: "address",
                },
              ],
              name: "BlackListed",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address[]",
                  name: "participants",
                  type: "address[]",
                },
                {
                  indexed: false,
                  internalType: "uint256[]",
                  name: "shares",
                  type: "uint256[]",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "totalEarned",
                  type: "uint256",
                },
              ],
              name: "FinalYieldDistribution",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "LoanTaken",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "poolId",
                  type: "uint256",
                },
              ],
              name: "PaymentMade",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "poolId",
                  type: "uint256",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "payAmount",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "address[]",
                  name: "users",
                  type: "address[]",
                },
                {
                  indexed: false,
                  internalType: "uint256[]",
                  name: "dueDates",
                  type: "uint256[]",
                },
              ],
              name: "PoolRegistered",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "poolId",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "_user",
                  type: "address",
                },
                {
                  internalType: "bool",
                  name: "_recalibrateLoan",
                  type: "bool",
                },
              ],
              name: "addToBlacklist",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "poolId",
                  type: "uint256",
                },
                {
                  internalType: "uint256[]",
                  name: "sharesDistribution",
                  type: "uint256[]",
                },
              ],
              name: "distributeYield",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "users",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "dueDate",
                  type: "uint256",
                },
              ],
              name: "madePaymentsForDueDate",
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
              inputs: [
                {
                  internalType: "uint256",
                  name: "poolId",
                  type: "uint256",
                },
              ],
              name: "payPool",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "poolId",
                  type: "uint256",
                },
              ],
              name: "pools",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "termsHash",
                  type: "bytes32",
                },
                {
                  internalType: "uint256",
                  name: "payAmount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "currentPot",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "expectedTermPot",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "latefee",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "shares",
                  type: "uint256",
                },
                {
                  internalType: "uint8",
                  name: "currentDueDate",
                  type: "uint8",
                },
                {
                  internalType: "enum KindredCore.PoolStage",
                  name: "stage",
                  type: "uint8",
                },
                {
                  internalType: "contract IERC4626",
                  name: "vault",
                  type: "address",
                },
                {
                  internalType: "contract IERC20",
                  name: "token",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "currentRecipient",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes[]",
                  name: "_signatures",
                  type: "bytes[]",
                },
                {
                  internalType: "uint256[]",
                  name: "_dueDates",
                  type: "uint256[]",
                },
                {
                  internalType: "bytes",
                  name: "_terms",
                  type: "bytes",
                },
              ],
              name: "register",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "poolId",
                  type: "uint256",
                },
              ],
              name: "takeLoan",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "partipants",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "poolId",
                  type: "uint256",
                },
              ],
              name: "users",
              outputs: [
                {
                  internalType: "bool",
                  name: "isBlacklisted",
                  type: "bool",
                },
                {
                  internalType: "bool",
                  name: "isParticipant",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
