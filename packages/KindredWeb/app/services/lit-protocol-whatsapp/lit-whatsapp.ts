
import stytch, { OTPsWhatsappLoginOrCreateResponse } from 'stytch'
import { LitAuthClient  } from '@lit-protocol/lit-auth-client';
import { PKPEthersWallet } from '@lit-protocol/pkp-ethers'
import { ProviderType } from '@lit-protocol/constants'
import {AuthCallbackParams} from '@lit-protocol/types'
import {LitActionResource, LitAbility } from '@lit-protocol/auth-helpers'
import * as LitJsSdk from "@lit-protocol/lit-node-client";
import ethers from 'ethers';


export async function claimKeysForGroup(phoneNumbers: string[]) {
	const client = new stytch.Client({
		project_id: process.env.STYTCH_API_KEY!,
		secret: process.env.STYTCH_SECRET!,
	});

	const lit = new LitJsSdk.LitNodeClient({
		litNetwork: "cayenne",
		debug: false
	});

	await lit.connect();

	const addresses = []
	for (const phoneNumber of phoneNumbers) {
		const stytchResponse = await client.otps.whatsapp.loginOrCreate({
			phone_number: phoneNumber,
		})
		stytchResponse.user_id
		const keyId = lit.computeHDKeyId(stytchResponse.user_id, process.env.LIT_PROTOCOL_API_KEY!)
		const publicKey = lit.computeHDPubKey(keyId)
		addresses.push(ethers.utils.computeAddress(publicKey)) // this should work
	}

	return addresses
}

export async function pingWhatsAppForAuth(phoneNumber: string) {
	const stytchClient = new stytch.Client({
		project_id: process.env.STYTCH_API_KEY!,
		secret: process.env.STYTCH_SECRET!,
	});
	const stytchResponse = await stytchClient.otps.whatsapp.loginOrCreate({
		phone_number: phoneNumber,
	})
	return stytchResponse
}

// once you've pinged whatsapp, this will return a PKPEthers Wallet, use that to create the Smart Contract Wallet
export async function authenticateAndGetKey(otpCode: string, stytchResp: OTPsWhatsappLoginOrCreateResponse) {
	
	const stytchClient = new stytch.Client({
		project_id: process.env.STYTCH_API_KEY!,
		secret: process.env.STYTCH_SECRET!,
	});
	const authResponse = await stytchClient.otps.authenticate({
		method_id: stytchResp.phone_id,
		code: otpCode,
		session_duration_minutes: 60 * 24 * 7, // a day to authenticate
	})

	const sessionStatus = await stytchClient.sessions.authenticate({
		session_token: authResponse.session_token,
	})

	const litClient = new LitAuthClient({
		litRelayConfig: {
			relayApiKey: process.env.LIT_PROTOCOL_API_KEY!,
		}
	});
	
	const session = litClient.initProvider(ProviderType.StytchOtp, {
		userId: sessionStatus.session.user_id,
		appId: process.env.LIT_PROTOCOL_API_KEY!
	})
	
	const authMethod = await session.authenticate({ 
		accessToken: sessionStatus.session_jwt 
	})
	
	await session.mintPKPThroughRelayer(authMethod)
	const pkps = await session.fetchPKPsThroughRelayer(authMethod)

	const litNodeClient = new LitNodeClientNodeJs({
		litNetwork: 'cayenne',
		debug: false,
	})
	await litNodeClient.connect();
	
	const resourceAbilities = [
		{
			resource: new LitActionResource("*"),
			ability: LitAbility.PKPSigning,
		},
	];
	
	const sessionKeyPair = litNodeClient.getSessionKey();
	
	const authNeededCallback = async (params: AuthCallbackParams) => {
		const response = await litNodeClient.signSessionKey({
			sessionKey: sessionKeyPair,
			statement: params.statement,
			authMethods: [authMethod],
			pkpPublicKey: pkps[pkps.length - 1].publicKey,
			expiration: params.expiration,
			resources: params.resources,
			chainId: 1,
		});
		return response.authSig;
	};
	
	const sessionSigs = await litNodeClient.getSessionSigs({
		chain: "ethereum",
		expiration: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
		resourceAbilityRequests: resourceAbilities,
		sessionKey: sessionKeyPair,
		authNeededCallback	
	}).catch((err: Error) => {
		console.log("error while attempting to access session signatures: ", err)
		throw err;
	});

	const pkpWallet = new PKPEthersWallet({
		pkpPubKey: pkps[pkps.length - 1].publicKey,
		rpc: "https://rpc.ankr.com/polygon_mumbai", // e.g. https://rpc.ankr.com/eth_goerli
		controllerSessionSigs: sessionSigs
	});
	
	await pkpWallet.init();
}	
