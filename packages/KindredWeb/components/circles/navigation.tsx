'use client'

import React, { ChangeEvent } from "react";
import Link from "next/link"; // for Next.js, use Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

type NavigationProps = {
  id: string;
};

const Navigation: React.FC<NavigationProps> = ({ id }) => {
  const path = usePathname();
  const router = useRouter();

  // Function to determine if the tab is active
  const isActive = (pathname: string): boolean => path.includes(pathname);


  // Function to handle select change on mobile view
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const value: string = event.target.value;
    // navigate to the selected path
    router.push(value); // or use history.push(value) with react-router's useHistory hook
  };

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="circle-tabs" className="sr-only">Select a tab</label>
        <select 
          id="circle-tabs" 
          name="tabs" 
          onChange={handleSelectChange} 
          className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        >
          <option value={isActive(`/circle/${id}`) ? "#" : `/circle/${id}`}>Overview</option>
          <option value={isActive(`/vault/${id}`) ? "#" : `/vault/${id}`}>Vault</option>
          <option value={isActive(`/members/${id}`) ? "#" : `/members/${id}`}>Members</option>
          <option value={isActive(`/chat/${id}`) ? "#" : `/chat/${id}`}>Chat</option>
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {/* Use Link instead of anchor tags, and apply styles conditionally based on the current route */}
            <Link href={isActive(`/circle/${id}`) ? "#" : `/circle/${id}`} className={`border-b-2 pb-4 px-1 text-sm font-medium whitespace-nowrap ${isActive('/circle') ? 'border-primary-700 text-primary-700' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}>
              Overview
            </Link>
            <Link href={isActive(`/vault/${id}`) ? "#" : `/vault/${id}`} className={`border-b-2 pb-4 px-1 text-sm font-medium whitespace-nowrap ${isActive('/vault') ? 'border-primary-700 text-primary-700' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}>
              Vault
            </Link>
            <Link href={isActive(`/members/${id}`) ? "#" : `/members/${id}`} className={`border-b-2 pb-4 px-1 text-sm font-medium whitespace-nowrap ${isActive('/members') ? 'border-primary-700 text-primary-700' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}>
              Members
            </Link>
            <Link href={isActive(`/chat/${id}`) ? "#" : `/chat/${id}`} className={`border-b-2 pb-4 px-1 text-sm font-medium whitespace-nowrap ${isActive('/chat') ? 'border-primary-700 text-primary-700' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}>
              Chat
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navigation