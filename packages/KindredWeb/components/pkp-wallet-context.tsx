'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PKPEthersWallet } from "@lit-protocol/pkp-ethers";

interface ProviderProps {
  children: ReactNode;
}

interface IPKPWalletContext {
  pkpWallet: PKPEthersWallet | null;
  setPKPWallet: React.Dispatch<React.SetStateAction<PKPEthersWallet | null>>;
}

export const PKPWalletContext = createContext<IPKPWalletContext>({
  pkpWallet: null,
  setPKPWallet: () => {},
});

export const PKPWalletProvider = ({ children }: ProviderProps) => {
  const [pkpWallet, setPKPWallet] = useState<any>(null); // Replace 'any' with your wallet type

  return (
    <PKPWalletContext.Provider value={{ pkpWallet, setPKPWallet }}>
      {children}
    </PKPWalletContext.Provider>
  );
};


