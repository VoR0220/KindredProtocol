import AccountAbstraction, {
  AccountAbstractionConfig
} from '@safe-global/account-abstraction-kit-poc'
import { GelatoRelayPack } from '@safe-global/relay-kit'
import {
  MetaTransactionData,
  MetaTransactionOptions,
  OperationType
} from '@safe-global/safe-core-sdk-types'
import { ethers, Signer } from 'ethers'
import { PKPEthersWallet } from '@lit-protocol/pkp-ethers'

export async function createSafe(key: PKPEthersWallet | ethers.Wallet): Promise<AccountAbstraction> {
	const relayPack = new GelatoRelayPack(process.env.GELATO_RELAY_API_KEY!)
	const safeAccountAbstraction = new AccountAbstraction(key)
  	const sdkConfig: AccountAbstractionConfig = {
    	relayPack
 	}
	console.log("initializing safe")
  	await safeAccountAbstraction.init(sdkConfig)
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