"use client";

import React from 'react'
import Link from 'next/link';
import { Button } from './ui/button';
import { ModeToggle } from './DarkMode';
import { useAuth } from '@/context/AuthContext';

export const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md w-full">
      <div className="container mx-auto px-4 ">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className='text-2xl font-bold text-shadow-black'>
            DevLink
          </Link>

          <div className='flex items-center space-x-4'>
            {isLoggedIn ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" className='font-bold text-lg cursor-pointer'>Dashboard</Button>
                </Link>
                <Button variant="ghost" className='font-bold text-lg cursor-pointer' onClick={logout}>Logout</Button>
                
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className='font-bold text-lg cursor-pointer'>Login</Button>
                </Link>
                <Link href="/register">
                  <Button variant="ghost" className='font-bold text-lg cursor-pointer'>Sign Up</Button>
                </Link>
              </>
            )}
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};