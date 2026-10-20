import React from "react";
import ProfileForm from "@/app/components/ProfileForm/ProfileForm";

export default function UpdateProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Account Settings</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your account details, profile preferences, and security settings securely.
          </p>
        </div>

        {/* Profile Component with Modal Functionality */}
        <ProfileForm />

      </div>
    </div>
  );
}