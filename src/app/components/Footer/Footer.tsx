import React from 'react'
import Link from 'next/link'
import { UserRoundSearch } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 text-gray-600 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand & Description */}
          <div className="space-y-3 md:col-span-1">
            <Link href="/" className="text-xl font-bold text-gray-900 tracking-tight">
              NTS BAUTH
            </Link>
            <p className="text-gray-500 leading-relaxed">
              A secure and seamless authentication framework built for modern web applications.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-gray-900 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gray-900 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/signin" className="hover:text-gray-900 transition-colors">
                  Signin
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-gray-900 transition-colors">
                  Signup
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="hover:text-gray-900 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-gray-900 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/security" className="hover:text-gray-900 transition-colors">
                  Security
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Connect</h3>
            <div className="flex space-x-4 text-gray-500">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-900 transition-colors"
                aria-label="GitHub"
              >
                <UserRoundSearch className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-900 transition-colors"
                aria-label="Twitter"
              >
                <UserRoundSearch className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-900 transition-colors"
                aria-label="LinkedIn"
              >
                <UserRoundSearch className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 space-y-2 sm:space-y-0">
          <p>&copy; {new Date().getFullYear()} NTS BAUTH. All rights reserved.</p>
          <p>Built with Next.js & BetterAuth</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer