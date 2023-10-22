import { PkpWalletProvider } from '@/components/pkp-wallet-context'
import Test from '@/components/test'

export default function Context(){
	
	return(
		<PkpWalletProvider>
			<Test />
		</PkpWalletProvider>
	)
}