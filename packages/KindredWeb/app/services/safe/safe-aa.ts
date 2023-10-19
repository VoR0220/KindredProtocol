import {ethers, Signer} from "ethers"
import Safe, { SafeFactory, SafeAccountConfig, EthersAdapter } from '@safe-global/protocol-kit'


class SAFEWalletService {

	private owners: Signer[] 
	private pimlico_api_key: string
	private provider_url: string
	private entryPointAddress: string
	private erc4337moduleAddress: string
	private safe_sdk: Safe

	private threshold: number = 1

	
	public get address() : Promise<string> {
		return this.safe_sdk.getAddress()
	}
	
	chainIdToChainName: Record<number, string> = {
		421613: "optimism-goerli",
		534353 : "scroll-alpha-testnet",
        80001: "mumbai"
    }

	// generate two addresses at the beginning
	constructor(signers: Signer[], erc4337moduleAddress?: string) {
		if (signers.length > 2) {
			throw new Error("Too many addresses")
		}

		this.owners = signers;
		this.pimlico_api_key = process.env.PIMLICO_API_KEY!
		this.provider_url = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY!
		this.safe_sdk = new Safe
		this.entryPointAddress = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"
        this.erc4337moduleAddress = erc4337moduleAddress ?? "0x86A74784381f8A28465383a6cA40C82d28f9895f"
	}

	async createSafeWallet(): Promise<string> {
		// hardcoding the salt as 1 so that we always get the same account
		// this is a temporary hack for the hackathon demo and needs to be fixed in future
		
		const ethAdapter = new EthersAdapter({
			ethers,
			signerOrProvider: this.owners[0] // make sure this one is the whatsApp address from lit protocol, it will come into play with the salt
		})
		
		const safeFactory = await SafeFactory.create({ ethAdapter })

		let addresses: string[] = []
		for (const signer of this.owners) {
			addresses.push(await signer.getAddress())
		}
		const safeAccountConfig: SafeAccountConfig = {
  		  owners: addresses,
		  threshold: this.threshold
		}

		const safeSdk: Safe = await safeFactory.deploySafe({ safeAccountConfig, saltNonce: "1" })
		this.safe_sdk = safeSdk
		const safeAddress = await safeSdk.getAddress()
		return safeAddress
	}

}
