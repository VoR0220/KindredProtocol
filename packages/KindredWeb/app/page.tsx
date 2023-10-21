"use client";

import { useEffect } from 'react';
import { ThemeButton } from "@/components/theme-button"
import Container from "@/components/ui/container"

export default function Home() {

  useEffect(() => {
    setTimeout(() => {
      window.location.href = "/signin"
    }, 3000); // 3000ms delay (3 seconds)
  });

  return (
    <>
      <Container>
        <div className="h-screen flex items-center justify-center bg-gray-100">
          <div className="m-12">
            <img
                src="https://bafybeifrbeic5jy2vsfke2fsrfacec7abyullnne5crl6buoellb2flgvm.ipfs.w3s.link/logo-full%4030x.png"
                alt="logo"
                className="img-wrapper aspect-auto object-cover rounded-lg transition-all duration-300 hover:scale-105"
              />
          </div>
        </div>      
      </Container>
    </>
  )
}
