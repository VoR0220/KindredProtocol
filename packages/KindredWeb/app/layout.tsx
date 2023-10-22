import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import { PKPWalletProvider } from '@/components/pkp-wallet-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kindred App',
  description: 'A platform for p2p lending among trusted peers to achieve 0% interest loans and hyper savings.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
          <PKPWalletProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </PKPWalletProvider>
      </body>
    </html>
  </>
  )
}