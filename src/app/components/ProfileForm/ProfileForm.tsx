"use client";

import React, { useState, useEffect, useRef } from "react";
import { User, Mail, Lock, Edit3, X, CheckCircle2, ShieldCheck } from "lucide-react";

export default function ProfileForm() {
  // ডেমো ইনিশিয়াল ডাটা (BetterAuth বা ডাটাবেজ থেকে ডেটা এখানে ফেচ করতে হবে)
  const [userInfo, setUserInfo] = useState({
    username: "johndoe",
    email: "johndoe@example.com",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  });

  // Modal States
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  // Form States for Modals
  const [profileForm, setProfileForm] = useState({
    username: userInfo.username,
    email: userInfo.email,
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modals when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsProfileModalOpen(false);
        setIsPasswordModalOpen(false);
      }
    };
    if (isProfileModalOpen || isPasswordModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileModalOpen, isPasswordModalOpen]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // BetterAuth profile update API call logic here
    setUserInfo((prev) => ({
      ...prev,
      username: profileForm.username,
      email: profileForm.email,
    }));
    setIsProfileModalOpen(false);
    showNotification("Profile updated successfully!");
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // BetterAuth password update API call logic here
    setPasswordForm({ currentPassword: "", newPassword: "" });
    setIsPasswordModalOpen(false);
    showNotification("Password changed successfully!");
  };

  const showNotification = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(""), 3500);
  };

  return (
    <div className="space-y-6">
      {/* সাকসেস অ্যালার্ট */}
      {successMessage && (
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg flex items-center gap-3 text-emerald-800 text-sm shadow-sm transition-all">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Main Profile Info Card */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <img
              src={userInfo.image}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-200 shadow-sm"
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{userInfo.username}</h3>
              <p className="text-sm text-gray-500">{userInfo.email}</p>
            </div>
          </div>
          <button
            onClick={() => {
              setProfileForm({ username: userInfo.username, email: userInfo.email });
              setIsProfileModalOpen(true);
            }}
            className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Edit3 className="w-4 h-4 text-gray-500" />
            <span>Edit Profile</span>
          </button>
        </div>

        {/* Account Details & Security Section */}
        <div className="pt-6 space-y-4">
          <h4 className="text-sm font-semibold text-gray-900 tracking-wide uppercase">Security Settings</h4>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white border border-gray-200 rounded-md text-gray-700">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Password</p>
                <p className="text-xs text-gray-500">Last changed recently or during registration</p>
              </div>
            </div>
            <button
              onClick={() => setIsPasswordModalOpen(true)}
              className="inline-flex items-center gap-1.5 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* --- EDIT PROFILE MODAL --- */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div ref={modalRef} className="bg-white rounded-xl shadow-xl border border-gray-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900">Edit Profile</h3>
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-200/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleProfileSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    name="username"
                    type="text"
                    required
                    value={profileForm.username}
                    onChange={handleProfileChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900 text-sm text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    name="email"
                    type="email"
                    required
                    value={profileForm.email}
                    onChange={handleProfileChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900 text-sm text-gray-900"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsProfileModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- CHANGE PASSWORD MODAL --- */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div ref={modalRef} className="bg-white rounded-xl shadow-xl border border-gray-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
              <button
                onClick={() => setIsPasswordModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-200/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePasswordSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    name="currentPassword"
                    type="password"
                    placeholder="••••••••"
                    required
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900 text-sm text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <ShieldCheck className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    name="newPassword"
                    type="password"
                    placeholder="••••••••"
                    required
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900 text-sm text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}