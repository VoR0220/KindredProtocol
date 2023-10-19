import * as stytch from 'stytch';
import { OTPsWhatsappLoginOrCreateResponse } from 'stytch';
//import { LitAuthClient  } from '@lit-protocol/lit-auth-client';
import { PKPEthersWallet } from '@lit-protocol/pkp-ethers'
import { ProviderType } from '@lit-protocol/constants'
import {AuthCallbackParams} from '@lit-protocol/types'
import {LitActionResource, LitAbility } from '@lit-protocol/auth-helpers'
import * as LitJsSdk from "@lit-protocol/lit-node-client";
import ethers from 'ethers';
import {
  LitAuthClient,
  StytchOtpProvider,
} from "@lit-protocol/lit-auth-client";

import { NextRequest, NextResponse } from 'next/server';

// To handle a GET request to /api
export async function GET(request: NextRequest, response: NextResponse) {
  //const phoneNumber = request.nextUrl.searchParams.get('phoneNumber');

  const phoneNumbers = ["+17038632462","+16305966776","+13122787863"];

	const client = new stytch.Client({
    project_id: "project-test-1c809a1a-25f9-406a-b39a-d05cfbf2f49a",
    secret: "secret-test-VycwWC5zAwG1FA1UTyk1_g6VR4ZMuY9TCbI=",
});

	const lit = new LitJsSdk.LitNodeClient({
		litNetwork: "cayenne",
		debug: false
	});
  const litNodeClient = new LitNodeClientNodeJs({
    litNetwork: "cayenne",
    debug: false,
  });

	await lit.connect();
  await litNodeClient.connect();

  const authClient = new LitAuthClient({
    litRelayConfig: {
      relayApiKey: "fbb8ccef-963b-4717-8e80-26ed20646d79_kindred",
    },
    litNodeClient,
  });

	const addresses: string[] = [];

	for (const phoneNumber of phoneNumbers) {
		const stytchResponse = await client.otps.whatsapp.loginOrCreate({
			phone_number: phoneNumber,
		})
		stytchResponse.user_id
    console.log(stytchResponse.user_id)
		const keyId = lit.computeHDKeyId(stytchResponse.user_id, "fbb8ccef-963b-4717-8e80-26ed20646d79_kindred")
    console.log("Key ID:" + keyId);

    const session = authClient.initProvider<StytchOtpProvider>(
      ProviderType.StytchOtp,
      {
        userId: stytchResponse.user_id,
        appId: "project-test-1c809a1a-25f9-406a-b39a-d05cfbf2f49a",
      }
    );
    // const publicKey = await session.computePublicKeyFromAuthMethod(authMethod);
    // console.log("local public key computed: ", publicKey);
		// const publicKey = lit.computeHDPubKey(keyId)
    // console.log("Public Key:" + publicKey);
		//addresses.push(ethers.utils.computeAddress(publicKey)) // this should work
	}

  return NextResponse.json({ message: addresses }, { status: 200 });
}

// To handle a POST request to /api
// export async function POST(request: NextRequest) {
//   // Do whatever you want
//   const phoneNumber = request.nextUrl.searchParams.get('phoneNumber');
//   if (!phoneNumber) {
//     return NextResponse.json({ response: "Error" }, { status: 200 });  
//   }
//   console.log("Sign In with Phone Nomber:" + phoneNumber);
//   const stytchClient = new stytch.Client({
//       project_id: "project-test-1c809a1a-25f9-406a-b39a-d05cfbf2f49a",
//       secret: "secret-test-VycwWC5zAwG1FA1UTyk1_g6VR4ZMuY9TCbI=",
//   });
//   const stytchResponse = await stytchClient.otps.whatsapp.loginOrCreate({
//       phone_number: phoneNumber,
//   })
//   console.log(stytchResponse);  

//   return NextResponse.json({ stytchResponse }, { status: 200 });
// }

