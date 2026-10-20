"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, User, LogOut, ChevronDown, ChevronUp } from "lucide-react";
import { signOut, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false);

  const router = useRouter();
  
  const { data: sessionData, isPending } = useSession();
  console.log("Session form nav:", sessionData);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
    // Reset mobile profile open state when closing main menu
    if (isOpen) {
      setIsMobileProfileOpen(false);
    }
  };

  const handleSignOut = async() => {
    // BetterAuth signout logic here
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/sign-in');
        }
      }
    });

    // console.log("Signing out...");
    setIsDropdownOpen(false);
    setIsOpen(false);
    setIsMobileProfileOpen(false);
  };

  // Extract user info safely from session
  const user = sessionData?.user;
  const userName = user?.name || user?.email || "User";
  const userInitial = userName.charAt(0).toUpperCase();
  const userImage = user?.image;

  return (
    <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/" className="text-xl font-bold text-gray-900 tracking-tight">
              NTS BAUTH
            </Link>
          </div>

          {/* Desktop Navlinks */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              About
            </Link>
          </div>

          {/* Right Action Buttons & Hamburger */}
          <div className="flex items-center space-x-4">
            
            {/* Auth section for Desktop & Tablet */}
            <div className="hidden md:flex items-center space-x-4">
              {isPending ? (
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
              ) : user ? (
                /* Profile Dropdown Component for Desktop */
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-900 text-white font-semibold text-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors overflow-hidden border border-gray-300"
                  >
                    {userImage ? (
                      <img src={userImage} alt={userName} className="w-full h-full object-cover" />
                    ) : (
                      <span>{userInitial}</span>
                    )}
                  </button>

                  {/* Dropdown Modal */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        {/* <p className="text-xs text-gray-500">Signed in as</p> */}
                        <p className="text-sm font-medium text-slate-800 truncate">{userName}</p>
                      </div>

                      <Link href="/dashboard/profile" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                        <User className="w-4 h-4 text-gray-500" /> Profile
                      </Link>

                      <button onClick={handleSignOut} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors text-left"> <LogOut className="w-4 h-4" />Signout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    className="text-gray-600 hover:text-gray-900 font-medium px-3 py-2 rounded-md transition-colors"
                  >
                    Signin
                  </Link>
                  <Link
                    href="/sign-up"
                    className="bg-gray-900 text-white hover:bg-gray-800 font-medium px-4 py-2 rounded-md transition-colors"
                  >
                    Signup
                  </Link>
                </>
              )}
            </div>

            {/* Hamburger Button (Visible on small devices) */}
            <div className="flex md:hidden">
              <button
                onClick={toggleMenu}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile / Small Device Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 pt-3 pb-5 space-y-3">
          {/* Navlinks */}
          <div className="flex flex-col space-y-2">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="text-gray-600 hover:text-gray-900 font-medium px-2 py-1.5 rounded-md hover:bg-gray-50"
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className="text-gray-600 hover:text-gray-900 font-medium px-2 py-1.5 rounded-md hover:bg-gray-50"
            >
              About
            </Link>
          </div>

          <div className="pt-3 border-t border-gray-100">
            {isPending ? (
              <div className="h-8 bg-gray-100 rounded animate-pulse" />
            ) : user ? (
              <div className="space-y-2">
                {/* Clickable Profile Header for Mobile */}
                <button
                  onClick={() => setIsMobileProfileOpen((prev) => !prev)}
                  className="w-full flex items-center justify-between px-2 py-2 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-900 text-white font-semibold text-xs overflow-hidden shrink-0">
                      {userImage ? (
                        <img src={userImage} alt={userName} className="w-full h-full object-cover" />
                      ) : (
                        <span>{userInitial}</span>
                      )}
                    </div>
                    <div className="overflow-hidden text-left">
                      <p className="text-xs text-gray-500">Logged in as</p>
                      <p className="text-sm font-medium text-gray-900 truncate">{userName}</p>
                    </div>
                  </div>
                  <div>
                    {isMobileProfileOpen ? (
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    )}
                  </div>
                </button>

                {/* Collapsible Mobile Profile Options */}
                {isMobileProfileOpen && (
                  <div className="pl-2 space-y-2 pt-1">
                    <Link
                      href="/profile"
                      onClick={() => {
                        setIsOpen(false);
                        setIsMobileProfileOpen(false);
                      }}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      <User className="w-4 h-4 text-gray-500" />
                      Profile
                    </Link>

                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Signout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link
                  href="/sign-in"
                  onClick={() => setIsOpen(false)}
                  className="block text-center text-gray-600 hover:text-gray-900 font-medium px-4 py-2 border border-gray-300 rounded-md"
                >
                  Signin
                </Link>
                <Link
                  href="/sign-up"
                  onClick={() => setIsOpen(false)}
                  className="block text-center bg-gray-900 text-white hover:bg-gray-800 font-medium px-4 py-2 rounded-md"
                >
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
