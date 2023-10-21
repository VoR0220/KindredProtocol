'use client'

import { useState } from "react"
import SectionHeader from "@/components/section-header"
import Container from "@/components/ui/container"
import Navigation from "@/components/circles/navigation"
import { Section } from "@/components/ui/section"
import { Coins } from 'lucide-react';
import { CheckCircle2 } from 'lucide-react';
import Divider from "@/components/ui/divider"

type VaultNumber = number;

export default function Vault() {
  // State to keep track of the selected vault
  const [selectedVault, setSelectedVault] = useState(0);

  // Function to handle click on vault
  const handleVaultClick = (vaultNumber: VaultNumber) => {
    setSelectedVault(vaultNumber);
  }

  // Generate the appropriate classes based on vault state
  const getVaultClasses = (vaultNumber: VaultNumber) => {
    let classes = 'relative flex items-start cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none ';
    classes += selectedVault === vaultNumber ? 'border-indigo-600 ring-2 ring-indigo-600' : 'border-gray-300';
    return classes;
  }

  const getCheckCircleClasses = (vaultNumber: VaultNumber) => {
    return selectedVault === vaultNumber ? 'text-primary-500' : 'invisible';
  }

  const getSpanClasses = (vaultNumber: VaultNumber) => {
    let classes = 'pointer-events-none absolute -inset-px rounded-lg ';
    classes += selectedVault === vaultNumber ? 'border border-indigo-600' : 'border-2 border-transparent';
    return classes;
  }
  return (
    <>
      <Section>
        <Container>
          <SectionHeader title="Silva Family Savings" titleClassName="text-2xl" hasMenu={false} />
        </Container>
        <Container>
          <Navigation />
        </Container>
      </Section>
      <Section>
        <Container>
        <SectionHeader title="Circle Vault Settings" titleClassName="text-md" description="Pick the vault that fits your circle." hasMenu={true} />
        <Divider />
        </Container>
      </Section>
      <Section>
        <Container>
          <h5 className="text-sm font-semibold text-gray-900">Current Vault</h5>
          <p className="text-sm text-gray-500">Strategies may change over time. This was selected upon the creation of the circle.</p>
          <div className="mt-5 grid grid-cols-1 gap-y-4">
            {[1, 2, 3].map((vaultNumber) => (
              <label 
                key={vaultNumber}
                className={getVaultClasses(vaultNumber)} 
                onClick={() => handleVaultClick(vaultNumber)}
              >
                <div className="bg-primary-50 rounded-full p-1 mr-4">
                  <div className="bg-primary-100 rounded-full p-2">
                    <Coins size={16} className="text-primary-700"/>
                  </div>
                </div>
                <input 
                  type="radio" 
                  name="vault-option" 
                  value={vaultNumber} 
                  className="sr-only" 
                  checked={selectedVault === vaultNumber} 
                  onChange={() => {}} // This is needed to avoid a warning for having an onChange handler with a checked input
                />
                <span className="flex flex-1">
                  <span className="flex flex-col">
                      <span className="flex items-baseline">
                        <span id="vault-1-label" className="block text-sm font-medium text-gray-900">Vault {vaultNumber}</span>
                        <span className="ml-2 flex items-baseline text-xs text-green-600"> 9.7% APY</span>
                      </span>
                      <span id="vault-1-description-0" className="mt-1 flex items-center text-sm text-gray-500">Maximize your yields using this strategy.</span>
                  </span>
                </span>
                <CheckCircle2 className={getCheckCircleClasses(vaultNumber)}/>
                <span className={getSpanClasses(vaultNumber)} aria-hidden="true"></span>
              </label>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
} 