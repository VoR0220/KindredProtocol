'use client'

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

interface ProviderProps {
  children: ReactNode;
}

interface PkpWalletContextType {
  pkpWallet: null | any; // for now, we don't know what the pkpWallet object looks like
  setPkpWallet: Dispatch<SetStateAction<null | any>>;
}

const PkpWalletContext = createContext<PkpWalletContextType>({
  pkpWallet: null,
  setPkpWallet: () => null
});

export const usePkpWallet = () => {
  return useContext(PkpWalletContext);
}

export const PkpWalletProvider = ({ children }: ProviderProps) => {
  const [pkpWallet, setPkpWallet] = useState<null | any>(null);
  
  return (
    <PkpWalletContext.Provider value={{ pkpWallet, setPkpWallet }}>
      {children}
    </PkpWalletContext.Provider>
  );
};
