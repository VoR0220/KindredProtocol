"use client";

import Container from "@/components/ui/container"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import axios from 'axios';

interface IStytchResponse {
    phone_id: string;
    request_id: string;
    status_code: number;
    user_created: boolean;
    user_id: string;
}

export default function SignIn() {

    const [phoneNumber, setPhoneNumber] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);
    const [isError, setIsError] = useState(false);

    let stytchResponse: IStytchResponse = new Object() as IStytchResponse;
    const [stytchResponseState, setStytchResponseState] = useState(stytchResponse);

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
        
              } catch {
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
              className="OTPInput"
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
    <Container>
        <div className=" min-h-screen flex items-center justify-center mt-[150px]">
            <div className="rounded-lg shadow-lg bg-white p-6 space-y-6 border border-gray-200 dark:border-gray-700">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold text-black">Kindred</h1>
                    <p className="text-zinc-500 dark:text-zinc-400">
                        Enter your phone below to login to your Kindred account
                    </p>
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Telephone</Label>
                        <Input id="email" placeholder="Telephone Number" required type="email" onChange={(e) => setPhoneNumber(e.target.value)} />
                    </div>
                    <Button className="w-full bg-[#4285F4] text-white" variant="outline" onClick={() => processSignIn()}>
                        <div className="flex items-center justify-center">
                        Login
                        </div>
                    </Button>
                </div>
            </div>
        </div>
    </Container>
    <br />
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
  