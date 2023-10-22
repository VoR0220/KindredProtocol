import {
  AccountAbstractionConfig
} from '@safe-global/account-abstraction-kit-poc'
import { GelatoRelayPack } from '@safe-global/relay-kit'
import {
  MetaTransactionData,
  MetaTransactionOptions,
  OperationType
} from '@safe-global/safe-core-sdk-types'
import { ethers, Signer } from 'ethers';
import { PKPEthersWallet } from '@lit-protocol/pkp-ethers'
import { encodeArguments } from '@nomiclabs/hardhat-etherscan/dist/src/ABIEncoder';

import Safe, {
  EthersAdapter,
  SafeAccountConfig,
  predictSafeAddress
} from '@safe-global/protocol-kit'
import { RelayPack } from '@safe-global/relay-kit'

class AccountAbstraction {
  private ethAdapterWriter: EthersAdapter
  private ethAdapterReader: EthersAdapter
  private signer: ethers.Signer
  private reader: ethers.VoidSigner | ethers.Signer
  private safeSdk?: Safe
  private safeSdkRead?: Safe
  private relayPack?: RelayPack

  constructor(signer: ethers.Signer, address?: string) {
    if (!signer.provider) {
		if (!address) throw new Error("Need address if provider not provided")
		this.reader = new ethers.VoidSigner(address, new ethers.providers.JsonRpcProvider(process.env.PROVIDER_RPC_URL!))
    } else {
		this.reader = signer;
	}
    this.signer = signer
    this.ethAdapterWriter = new EthersAdapter({
      ethers,
      signerOrProvider: this.signer
    })
	this.ethAdapterReader = new EthersAdapter({
      ethers,
      signerOrProvider: this.reader
    })
  }

  async init(options: AccountAbstractionConfig) {
    const { relayPack } = options
    this.setRelayPack(relayPack)

    const signer = await this.getSignerAddress()
    const owners = [signer]
    const threshold = 1

    const safeAccountConfig: SafeAccountConfig = {
      owners,
      threshold
    }

	console.log("predicting safe address")
    const safeAddress = await predictSafeAddress({
      ethAdapter: this.ethAdapterReader,
      safeAccountConfig
    })

	console.log("getting is safe deployed")
    const isSafeDeployed = await this.ethAdapterReader.isContractDeployed(safeAddress)

    if (isSafeDeployed) {
      this.safeSdk = await Safe.create({ ethAdapter: this.ethAdapterWriter, safeAddress })
	  this.safeSdkRead = await Safe.create({ ethAdapter: this.ethAdapterReader, safeAddress})
	} else {
      this.safeSdk = await Safe.create({
        ethAdapter: this.ethAdapterWriter,
        predictedSafe: { safeAccountConfig }
      })
	  this.safeSdkRead = await Safe.create({ ethAdapter: this.ethAdapterReader, predictedSafe: { safeAccountConfig }})
    }

  }

  setRelayPack(relayPack: RelayPack) {
    this.relayPack = relayPack
  }

  async getSignerAddress(): Promise<string> {
	console.log("getting signer address")
    const signerAddress = await this.signer.getAddress()
	console.log("signer address: ", signerAddress)
    return signerAddress
  }

  async getNonce(): Promise<number> {
    if (!this.safeSdk) {
      throw new Error('SDK not initialized')
    }

    return this.safeSdk.getNonce()
  }

  async getSafeAddress(): Promise<string> {
    if (!this.safeSdkRead) {
      throw new Error('SDK not initialized')
    }

    return this.safeSdkRead.getAddress()
  }

  async isSafeDeployed(): Promise<boolean> {
    if (!this.safeSdkRead) {
      throw new Error('SDK not initialized')
    }

    return this.safeSdkRead.isSafeDeployed()
  }

  async relayTransaction(
    transactions: MetaTransactionData[],
    options?: MetaTransactionOptions
  ): Promise<string> {
    if (!this.relayPack || !this.safeSdk) {
      throw new Error('SDK not initialized')
    }

    const relayedTransaction = await this.relayPack.createRelayedTransaction({
      safe: this.safeSdk,
      transactions,
      options
    })

    const signedSafeTransaction = await this.safeSdk.signTransaction(relayedTransaction)

    const response = await this.relayPack.executeRelayTransaction(
      signedSafeTransaction,
      this.safeSdk
    )

    return response.taskId
  }
}

export default AccountAbstraction



export async function createSafe(wallet: PKPEthersWallet | ethers.Signer): Promise<AccountAbstraction> {
	const relayPack = new GelatoRelayPack(process.env.GELATO_RELAY_API_KEY!)

	console.log(wallet);

	//const provider = new ethers.providers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com");
    //const signer = new ethers.Wallet(wallet, provider);
	let address;
	if (wallet instanceof PKPEthersWallet) {
		address = await wallet.getAddress()
	}
	const safeAccountAbstraction = new AccountAbstraction(wallet, address)
  	const sdkConfig: AccountAbstractionConfig = {
    	relayPack
 	}
	console.log("initializing safe")
  	await safeAccountAbstraction.init(sdkConfig)
	console.log("safe initialized")
	// to call address use safeAccountAbstraction.getSafeAddress()
	return safeAccountAbstraction
}

// run this after a contract.populateTransaction.<methodName(args)>
export function convertToSafeTx(tx: ethers.UnsignedTransaction): MetaTransactionData {
	const convertedToMetaTx: MetaTransactionData = {
		to: tx.to!,
		data: tx.data! as string,
		value: tx.value as string,
		operation: OperationType.Call
	}
	return convertedToMetaTx
}

export async function transactSafe(account: AccountAbstraction, txs: MetaTransactionData[]): Promise<string> {
	const sponsored: MetaTransactionOptions = {
		isSponsored: true
	}
	const id = await account.relayTransaction(txs, sponsored)
	return id
}