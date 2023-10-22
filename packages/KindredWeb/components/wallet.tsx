'use client'

import React, { useContext } from 'react';
import { PKPWalletContext } from '@/components/pkp-wallet-context';

export default function Wallet(){
	const { pkpWallet } = useContext(PKPWalletContext);
	console.log("pkpWallet", pkpWallet);
	return(
		<div className='w-full flex'>
			<div className="relative flex w-40 justify-self-end items-center space-x-3 rounded-lg border border-gray-300 bg-white px-3 py-2 mt-8 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400 self- ">
				<div className="flex-shrink-0">
					<div className="h-6 w-6 rounded-full relative bg-gradient-to-r from-violet-500 to-fuchsia-500">
					<span className="bg-green-400 absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white" aria-hidden="true"></span>
					</div>
				</div>
				<div className="min-w-0 flex-1">
					<a href="#" className="focus:outline-none">
					<span className="absolute inset-0" aria-hidden="true" />
					<p className="text-sm font-medium text-gray-900 truncate">{pkpWallet?.address}</p>
					</a>
				</div>
			</div>
		</div>
		
	)
}