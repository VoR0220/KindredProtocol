"use client";

import { useEffect } from 'react';
import Container from "@/components/ui/container"
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Home() {

  const router = useRouter();

  console.log("router", router);
  
  useEffect(() => {
    setTimeout(() => {
      router.push("/signin");
    }, 3000); // 3000ms delay (3 seconds)
  });

  return (
    <>
      <Container>
        <div className="h-screen flex items-center justify-center bg-gray-100">
          <div className="m-12">
            <Image
                src="https://bafybeifrbeic5jy2vsfke2fsrfacec7abyullnne5crl6buoellb2flgvm.ipfs.w3s.link/logo-full%4030x.png"
                alt="logo"
                className="img-wrapper aspect-auto object-cover rounded-lg transition-all duration-300 hover:scale-105"
                width={200}
                height={200}
              />
          </div>
        </div>      
      </Container>
    </>
  )
}
