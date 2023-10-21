"use client";

import Container from "@/components/ui/container"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import axios from 'axios';
import { ProviderType } from "@lit-protocol/constants";
import { LitAuthClient } from "@lit-protocol/lit-auth-client";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { LitAbility, LitActionResource } from "@lit-protocol/auth-helpers";
import { AuthCallbackParams } from "@lit-protocol/types";
import { PKPEthersWallet } from "@lit-protocol/pkp-ethers";
import * as LitJsSdk from "@lit-protocol/lit-node-client";
interface IStytchResponse {
    phone_id: string;
    request_id: string;
    status_code: number;
    user_created: boolean;
    user_id: string;
}

interface ISessionStatus {
    request_id: string;
    session_jwt: string;
    session_token: string;
    status_code: number;
    session: {
        user_id: string;
    };
}

export default function SignIn() {

  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isError, setIsError] = useState(false);
  const [existPhoneNumber, setExistPhoneNumber] = useState(false);
   

    let stytchResponse: IStytchResponse = new Object() as IStytchResponse;
    const [stytchResponseState, setStytchResponseState] = useState(stytchResponse);
    let sessionStatus: ISessionStatus = new Object() as ISessionStatus;
    const [sessionStatusResponse, setSessionStatusResponse] = useState(Object() as ISessionStatus);

    const processOTP = async () => {
        let otpInput = '';
        if (isValidPasscode()) {
            const inputs = document.getElementsByClassName('OTPInput');
            //console.log(inputs);
            for (let i = 0; i < inputs.length; i++) {
              otpInput += (inputs[i] as HTMLInputElement).value;
            }
            console.log("OTP:" + otpInput);
            try {
                console.log(stytchResponseState);
                const response = await axios.post(`/api/lit/authorization?otpInput=${encodeURIComponent(otpInput)}&method_id=${encodeURIComponent(stytchResponseState.phone_id)}`);  
                console.log(response);
                sessionStatus = response.data.sessionStatus;
                setSessionStatusResponse(sessionStatus);
                console.log(sessionStatusResponse);

                // *******************

                const litClient = new LitAuthClient({
                    litRelayConfig: {
                        relayApiKey: 'fbb8ccef-963b-4717-8e80-26ed20646d79_kindred',
                    }
                });
                 
                const session = litClient.initProvider(ProviderType.StytchOtp, {
                    userId: sessionStatus.session.user_id,
                    appId: "project-test-1c809a1a-25f9-406a-b39a-d05cfbf2f49a"
                })
                 
                const authMethod = await session.authenticate({ 
                    accessToken: sessionStatus.session_jwt 
                })
                 
                await session.mintPKPThroughRelayer(authMethod)
                const pkps = await session.fetchPKPsThroughRelayer(authMethod)

                console.log(pkps);

                // *******************
              
                const litNodeClient = new LitJsSdk.LitNodeClient({
                  litNetwork: "cayenne",
                  debug: false
                });
              
                await litNodeClient.connect();

                console.log(litNodeClient);
                
                const resourceAbilities = [
                    {
                        resource: new LitActionResource("*"),
                        ability: LitAbility.PKPSigning,
                    },
                ];
                
                const sessionKeyPair = litNodeClient.getSessionKey();
                
                console.log(sessionKeyPair);

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
                }).catch((err: any) => {
                    console.log("error while attempting to access session signatures: ", err)
                    throw err;
                });

                console.log(sessionSigs);

                // *******************

                const pkpWallet = new PKPEthersWallet({
                  pkpPubKey: pkps[pkps.length - 1].publicKey,
                  rpc: "https://1rpc.io/gnosis", // e.g. https://rpc.ankr.com/eth_goerli // https://1rpc.io/gnosis
                  controllerSessionSigs: sessionSigs
                });
                
                await pkpWallet.init();

                console.log(pkpWallet);

                // *******************
                router.push("/dashboard");
                // *******************
        
              } catch(error) {
                console.log(error);
                setIsError(true);
                resetPasscode();
              }
        }
    };

    const processSignIn = async () => {
        const response = await axios.post(`/api/lit/login?phoneNumber=${encodeURIComponent(phoneNumber)}`);  
        if (response && response.data && response.data.stytchResponse) {
            stytchResponse = response.data.stytchResponse;
            setStytchResponseState(stytchResponse);
            console.log(stytchResponse);
            setExistPhoneNumber(true);
        }
    };

    const resendCode = async () => {
        const response = await axios.post(`/api/lit/login?phoneNumber=${encodeURIComponent(phoneNumber)}`);  
        if (response && response.data && response.data.stytchResponse) {
            stytchResponse = response.data.stytchResponse;
            console.log(stytchResponse);
            setStytchResponseState(stytchResponse);
            resetPasscode();
            setIsError(false);    
            }
    };

    const autoTab = (target: HTMLInputElement, key?: string) => {
        if (target.value.length >= target.maxLength) {
          let next = target;
          while ((next = next.nextElementSibling as HTMLInputElement)) {
            if (next == null) break;
            if (next.tagName.toLowerCase() === 'input') {
              next?.focus();
              break;
            }
          }
        }
        // Move to previous field if empty (user pressed backspace)
        else if (target.value.length === 0) {
          let previous = target;
          while ((previous = previous.previousElementSibling as HTMLInputElement)) {
            if (previous == null) break;
            if (previous.tagName.toLowerCase() === 'input') {
              previous.focus();
              break;
            }
          }
        }
      };

    const resetPasscode = () => {
        const inputs = document.getElementsByClassName('OTPInput');
        for (let i = 0; i < inputs.length; i++) {
          (inputs[i] as HTMLInputElement).value = '';
        }
        document.getElementById('digit-0')?.focus();
        setIsDisabled(true);
      };
        
    const isValidPasscode = () => {
        const regex = /^[0-9]$/g;
        const inputs = document.getElementsByClassName('OTPInput');
        for (let i = 0; i < inputs.length; i++) {
          if (!(inputs[i] as HTMLInputElement).value.match(regex)) {
            return false;
          }
        }
        return true;
      };
    
    const onPasscodeDigitChange = () => {
        if (isValidPasscode()) {
          setIsDisabled(false);
          setIsError(false);
        } else {
          setIsDisabled(true);
        }
      };    

    const renderPasscodeInputs = () => {
        const inputs = [];
        for (let i = 0; i < 6; i += 1) {
          inputs.push(
            <input
              autoFocus={i === 0}
              className="OTPInput text-black"
              id={`digit-${i}`}
              key={i}
              maxLength={1}
              onChange={onPasscodeDigitChange}
              onKeyUp={(e) => autoTab(e.target as HTMLInputElement, e.key)}
              placeholder="0"
              size={1}
              type="text"
              style={styles.passcodeInput}
            />,
          );
        }
        return inputs;
      };


  return (
    <>
    { (!existPhoneNumber) &&
    
    (
      <section className="w-full max-w-sm bg-gray-100 h-screen">
        <Container>
          <div className=" min-h-screen flex items-center justify-center mt-[150px]">
            <div className="rounded-lg shadow-lg bg-white p-6 space-y-6 border border-gray-200 dark:border-gray-700">
                <div className="space-y-2 text-center">
                    {/* <h1 className="text-3xl font-bold text-black">Kindred</h1> */}
                  <div className="my-8 h-[70px] items-center justify-center">
                  <Image
                    src="https://bafybeifix2isnviipo2vnmtornurxnju7rlt3wsdemut5usswwcyulojjq.ipfs.w3s.link/logo-full%4030x.jpg"
                    alt="logo"
                    height={150} width={250}
                    className="img-wrapper aspect-auto object-cover rounded-lg transition-all duration-300 hover:scale-105"
                  />
                  </div>
                    <p className="text-zinc-500 dark:text-zinc-400">
                      Enter your phone below to login to your Kindred account
                    </p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Telephone</Label>
                    <Input id="email" placeholder="Telephone Number" required type="email" onChange={(e) => setPhoneNumber(e.target.value)} />
                  </div>
                  <Button className="w-full text-white" variant="default" onClick={() => processSignIn()}>
                    <div className="flex items-center justify-center">
                      Login
                    </div>
                  </Button>
                </div>
            </div>
          </div>
        </Container>
      </section>
    )
    
    }
    {( existPhoneNumber) && (
    <Container>
      <div className=" min-h-screen flex items-center justify-center mt-[150px]">
          <div className="rounded-lg shadow-lg bg-white p-6 space-y-6 border border-gray-200 dark:border-gray-700">
              <Label className="text-black">Enter passcode</Label>
              <br />
              <Label className="text-black">
                  A 6-digit passcode was sent to you at <strong>{phoneNumber}</strong>.
              </Label>
              <div>
                  <p style={styles.error}>{isError ? 'Invalid code. Please try again.' : ''}</p>
                  <div style={styles.passcodeInputContainer}>{renderPasscodeInputs()}</div>
                  <Button className="w-full" variant="link" onClick={() => resendCode()}>
                      <div className="flex items-center justify-center">
                      Resend code
                      </div>
                  </Button>
                  <Button className="w-full bg-[#4285F4] text-white mt-4" variant="outline" onClick={() => processOTP()}>
                      <div className="flex items-center justify-center">
                      Continue
                      </div>
                  </Button>
              </div>
          </div>
      </div>
    </Container>
    )}
    </>
      )
}


const styles: Record<string, React.CSSProperties> = {
    passcodeInput: {
      borderRadius: '3px',
      fontSize: '20px',
      width: '48px',
      height: '45px',
      textAlign: 'center',
    },
    error: {
      color: 'red',
      fontSize: '14px',
      height: '20px',
      lineHeight: '20px',
    },
    passcodeInputContainer: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: '24px',
    },
    resendCodeContainer: {
      margin: '12px 0px',
    },
  };
  