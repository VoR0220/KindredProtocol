'use client'
import { usePkpWallet } from "@/components/pkp-wallet-context"

export default function Test({...props}){
	const { pkpWallet } = usePkpWallet();

	console.log('props', props)
	console.log('pkpWallet', pkpWallet)
	return(
		<div>
			This is a test
		</div>
	)
}
