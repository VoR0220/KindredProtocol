import * as stytch from 'stytch';
import { OTPsWhatsappLoginOrCreateResponse } from 'stytch';
import { LitAuthClient  } from '@lit-protocol/lit-auth-client';
import { PKPEthersWallet } from '@lit-protocol/pkp-ethers'
import { ProviderType } from '@lit-protocol/constants'
import {AuthCallbackParams} from '@lit-protocol/types'
import {LitActionResource, LitAbility } from '@lit-protocol/auth-helpers'
import * as LitJsSdk from "@lit-protocol/lit-node-client";
import ethers from 'ethers';

import { NextRequest, NextResponse } from 'next/server';

// To handle a GET request to /api
export async function GET(request: NextRequest, response: NextResponse) {
  const phoneNumber = request.nextUrl.searchParams.get('phoneNumber');
  return NextResponse.json({ message: phoneNumber }, { status: 200 });
}

// To handle a POST request to /api
export async function POST(request: NextRequest) {
  // Do whatever you want
  const phoneNumber = request.nextUrl.searchParams.get('phoneNumber');
  if (!phoneNumber) {
    return NextResponse.json({ response: "Error" }, { status: 200 });  
  }
  console.log("Sign In with Phone Nomber:" + phoneNumber);
  const stytchClient = new stytch.Client({
      project_id: "project-test-1c809a1a-25f9-406a-b39a-d05cfbf2f49a",
      secret: "secret-test-VycwWC5zAwG1FA1UTyk1_g6VR4ZMuY9TCbI=",
  });
  const stytchResponse = await stytchClient.otps.whatsapp.loginOrCreate({
      phone_number: phoneNumber,
  })
  console.log(stytchResponse);  

  return NextResponse.json({ stytchResponse }, { status: 200 });
}

