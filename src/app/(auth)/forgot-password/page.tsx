"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle BetterAuth forgot password / password reset logic here
    console.log("Password reset requested for:", email);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-semibold tracking-tight text-gray-900">
          Forgot your password?
        </h2>
        <p className="mt-2 text-center text-sm font-medium text-gray-500">
          No worries, we&apos;ll send you reset instructions.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-4 shadow-sm border border-gray-200 rounded-lg sm:px-10">
          {!isSubmitted ? (
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Email Address Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>

                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 text-sm text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors"
                >
                  Send reset instructions
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-md border border-gray-100">
                If an account exists for <span className="font-medium text-gray-900">{email}</span>, you will receive a password reset link shortly.
              </div>
            </div>
          )}

          {/* Back to Sign In Link */}
          <div className="mt-6 flex items-center justify-center">
            <Link
              href="/sign-in"
              className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to sign in
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}