"use client";

import Container from "@/components/ui/container"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SignIn() {

    const processSignIn = () => {
        console.log("Sign In");
    }

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
                    <Input id="email" placeholder="Telephone Number" required type="email" />
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
    </>
      )
}