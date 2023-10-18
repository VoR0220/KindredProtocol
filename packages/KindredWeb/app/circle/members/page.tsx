'use client'

import React, { useState, useEffect } from "react";
import SectionHeader from "@/components/section-header"
import Container from "@/components/ui/container"
import Navigation from "@/components/circles/navigation"
import { Section } from "@/components/ui/section"
import { MoreVertical, Users2 } from 'lucide-react'
import {
  Card
} from "@/components/ui/card"
import Image from "next/image";

type UserStatus = 'late' | 'blacklisted' | 'good' | 'pending';

type User = {
  name: string;
  username: string;
  imageUrl: string;
  isOnline: boolean;
  status: UserStatus;
};

interface MenuVisibleState {
  [index: number]: boolean;
}

const initialUsers: User[] = [
  {
    name: "Leslie Alexander",
    username: "@lesliealexander",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    isOnline: true,
    status: 'good',
  },
  {
    name: "Beslie Alexander",
    username: "@lesliealexander",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    isOnline: true,
    status: 'pending',
  },
  {
    name: "Teslie Alexander",
    username: "@lesliealexander",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    isOnline: true,
    status: 'blacklisted',
  },
  {
    name: "Feslie Alexander",
    username: "@lesliealexander",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    isOnline: true,
    status: 'late',
  },
];

export default function Members() {
  const [users, setUsers] = useState<User[]>([]);
  const [menuVisible, setMenuVisible] = useState<MenuVisibleState>({});

  useEffect(() => {
    // call function to fetch users
    setUsers(initialUsers)
  }, []);

  const toggleMenu = (index: number) => {
    setMenuVisible(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  return (
    <Section>
      <Container>
        <SectionHeader title="Testing" hasMenu={false} />
        <Navigation />
        <ul role="list" className="flex-1 divide-y divide-gray-200 overflow-y-auto">
          {users.map((user, index) => (
            <li key={index}>
              <div className="group relative flex items-center px-5 py-6">
                <a href="#" className="-m-1 block flex-1 p-1">
                  <div className="absolute inset-0 group-hover:bg-gray-50" aria-hidden="true"></div>
                  <div className="relative flex min-w-0 flex-1 items-center">
                    <span className="relative inline-block flex-shrink-0">
                      <Image className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                      {/* Online: "bg-green-400", Offline: "bg-gray-300" */}
                      <span className="bg-green-400 absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white" aria-hidden="true"></span>
                    </span>
                    <div className="ml-4 truncate">
                      <p className="truncate text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="truncate text-sm text-gray-500">{user.username}</p>
                    </div>
                  </div>
                </a>
                <div className="relative ml-2 inline-block flex-shrink-0 text-left">
                  <button
                    type="button"
                    onClick={() => toggleMenu(index)} // passing index
                    className="group relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    id={`options-menu-${index}-button`}
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open options menu</span>
                    <span className="flex h-full w-full items-center justify-center rounded-full">
                      <MoreVertical className="w-5 h-5 text-gray-400"/>
                    </span>
                  </button>
                  {menuVisible[index] && ( // checking visibility by index
                    <div
                      className="absolute right-9 top-0 z-10 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby={`options-menu-${index}-button`}
                      tabIndex={-1}
                    >
                      <div className="py-1" role="none">
                      <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="options-menu-0-item-0">View profile</a>
                      <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="options-menu-0-item-1">Send message</a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </li>
            ))}
          </ul>
      </Container>
    </Section>
  )
} 



