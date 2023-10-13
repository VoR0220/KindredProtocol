'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { buttonVariants } from "@/components/ui/button"
import { Home } from 'lucide-react'

import { User2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CreateCircle from '@/components/create-circle'

export default function Navbar() {
    const pathname = usePathname()
    
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex justify-around items-center py-4">
                  <div>
                    <Link className={ `link ${pathname === '/dashboard' ? 'text-primary' : 'text-gray-400'}`} href="/dashboard">
                      <Home />
                    </Link>
                  </div>
                  <div>
                    <CreateCircle />
                  </div>
                  <div>
                    <Link className={`link ${pathname === '/account' ? 'text-primary' : 'text-gray-400'}`} href="/account">
                      <User2 />
                    </Link>
                  </div>
                </div>
            </div>
        </div>
    );
}
