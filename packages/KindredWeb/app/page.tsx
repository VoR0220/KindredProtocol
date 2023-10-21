"use client";

import Container from "@/components/ui/container"
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <section className="w-full max-w-sm bg-gray-100">
        <Container>
          <div className=" flex flex-col items-center h-screen justify-between space ">
            <div className="py-40">
              <Image
                src="https://bafybeifrbeic5jy2vsfke2fsrfacec7abyullnne5crl6buoellb2flgvm.ipfs.w3s.link/logo-full%4030x.png"
                alt="logo"
                className="img-wrapper aspect-auto object-cover rounded-lg transition-all duration-300 hover:scale-105"
                height={300}
                width={300}
              />
            </div>
            <div className="p-6 w-full">
              <Button className="w-full">
                <Link href="/signin">Sign In</Link>
              </Button>
            </div>
          </div>      
        </Container>
      </section>
    </>
    
  )
}
