
import stytch, { OTPsWhatsappLoginOrCreateResponse } from 'stytch'
import { LitAuthClient,  } from '@lit-protocol/lit-auth-client';
import { PKPEthersWallet } from '@lit-protocol/pkp-ethers'
import { ProviderType } from '@lit-protocol/constants'
import {AuthCallbackParams} from '@lit-protocol/types'
import {LitActionResource, LitAbility } from '@lit-protocol/auth-helpers'

class WhatsappKey {


	constructor() {

	}

	async pingWhatsAppForAuth(phoneNumber: string) {
		const stytchClient = new stytch.Client({
    		project_id: "project-test-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
    		secret: "secret-test-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		});
		const stytchResponse = await stytchClient.otps.whatsapp.loginOrCreate({
    		phone_number: phoneNumber,
		})
		return stytchResponse
	}

	async authenticateAndGetKey(otpCode: string, stytchResp: OTPsWhatsappLoginOrCreateResponse) {
		
		const stytchClient = new stytch.Client({
    		project_id: "project-test-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
    		secret: "secret-test-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		});
		const authResponse = await stytchClient.otps.authenticate({
			method_id: stytchResp.phone_id,
			code: otpCode,
			session_duration_minutes: 60 * 24 * 7,
		})
 
		const sessionStatus = await stytchClient.sessions.authenticate({
			session_token: authResponse.session_token,
		})

		const litClient = new LitAuthClient({
			litRelayConfig: {
				relayApiKey: '<Your Lit Relay Server API Key from the previous step>',
			}
		});
		
		const session = litClient.initProvider(ProviderType.StytchOtp, {
			userId: sessionStatus.session.user_id,
			appId: "project-test-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
		})
		
		const authMethod = await session.authenticate({ 
			accessToken: sessionStatus.session_jwt 
		})
		
		await session.mintPKPThroughRelayer(authMethod)
		const pkps = await session.fetchPKPsThroughRelayer(authMethod)

		const litNodeClient = new LitNodeClientNodeJs({
			litNetwork: 'serrano',
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
		}).catch((err) => {
			console.log("error while attempting to access session signatures: ", err)
			throw err;
		});

		const pkpWallet = new PKPEthersWallet({
			pkpPubKey: pkps[pkps.length - 1].publicKey,
			rpc: "<standard RPC URL for the chain you are using>", // e.g. https://rpc.ankr.com/eth_goerli
			controllerSessionSigs: sessionSigs
		});
		
		await pkpWallet.init();
	}	

}