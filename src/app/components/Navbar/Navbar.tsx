"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/" className="text-xl font-bold text-gray-900 tracking-tight">NTS BAUTH</Link>
          </div>

          {/* Desktop Navlinks (Visible on lg and larger) */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Home</Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">About</Link>
          </div>

          {/* Right Action Buttons & Hamburger */}
          <div className="flex items-center space-x-4">
            
            {/* Signin Button (Visible on md and larger) */}
            <div className="hidden md:block">
              <Link href="/signin" className="text-gray-600 hover:text-gray-900 font-medium px-3 py-2 rounded-md transition-colors">Signin</Link>
            </div>

            {/* Signup Button (Visible ONLY on lg and larger) */}
            <div className="hidden lg:block">
              <Link href="/signup" className="bg-gray-900 text-white hover:bg-gray-800 font-medium px-4 py-2 rounded-md transition-colors">Signup</Link>
            </div>

            {/* Hamburger Button (Visible on sm & md, hidden on lg) */}
            <div className="flex lg:hidden">
              <button onClick={toggleMenu} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none" aria-label="Toggle Menu">
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile / Medium Dropdown Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white px-4 pt-2 pb-4 space-y-3">
          {/* Navlinks in Mobile Drawer */}
          <div className="flex flex-col space-y-2">
            <Link href="/" onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-gray-900 font-medium px-2 py-1 rounded-md hover:bg-gray-50">Home</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-gray-900 font-medium px-2 py-1 rounded-md hover:bg-gray-50">About</Link>
          </div>

          <div className="pt-2 border-t border-gray-100 flex flex-col space-y-2">
            {/* Signin Link in menu ONLY for small devices (since md already displays it in the navbar header) */}
            <Link href="/signin" onClick={() => setIsOpen(false)} className="block md:hidden text-center text-gray-600 hover:text-gray-900 font-medium px-4 py-2 border border-gray-300 rounded-md">Signin</Link>

            {/* Signup Button in menu for small and medium devices */}
            <Link href="/signup" onClick={() => setIsOpen(false)} className="block text-center bg-gray-900 text-white hover:bg-gray-800 font-medium px-4 py-2 rounded-md">Signup</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;