// components/navigation/Navbar.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Menu,
  X,
  Home,
  Hospital,
  BookOpen,
  Settings,
  User,
  LogOut,
} from "lucide-react";
import { useUser, useClerk } from "@clerk/nextjs";

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <Home className="w-5 h-5" />,
  },
  {
    name: "Hospitals",
    href: "/dashboard/hospitals",
    icon: <Hospital className="w-5 h-5" />,
  },
  {
    name: "Digibook",
    href: "/dashboard/book",
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: <Settings className="w-5 h-5" />,
  },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUser();
  const { signOut } = useClerk();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (href: string) => {
    router.push(href);
    setIsMobileMenuOpen(false);
  };

  const handleSignOut = () => {
    signOut(() => router.push("/"));
  };

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Desktop Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-gray-900/95 backdrop-blur-xl border-b border-gray-700/50"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div
              className="flex items-center cursor-pointer"
              onClick={() => handleNavigation("/dashboard")}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="ml-3 text-white font-bold text-xl">SHICo</span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? "bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-400 border border-emerald-500/30"
                      : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                  }`}
                >
                  {item.icon}
                  <span className="hidden lg:block">{item.name}</span>
                </button>
              ))}
            </div>

            {/* Desktop User Menu */}
            <div className="hidden md:flex items-center gap-3">
              {user && (
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-white text-sm font-medium">
                      {user.firstName || "User"}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {user.emailAddresses[0]?.emailAddress}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                    {user.imageUrl ? (
                      <img
                        src={user.imageUrl}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200"
                    title="Sign Out"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Mobile Menu Content */}
        <div
          className={`absolute top-16 left-4 right-4 bg-gradient-to-br from-gray-800/95 to-slate-800/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl transition-all duration-300 ${
            isMobileMenuOpen
              ? "translate-y-0 scale-100"
              : "-translate-y-4 scale-95"
          }`}
        >
          <div className="p-6">
            {/* User Info */}
            {user && (
              <div className="flex items-center gap-4 mb-6 p-4 bg-gradient-to-r from-gray-700/50 to-slate-700/50 rounded-xl border border-gray-600/50">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                  {user.imageUrl ? (
                    <img
                      src={user.imageUrl}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">
                    {user.firstName || "User"}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {user.emailAddresses[0]?.emailAddress}
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Links */}
            <div className="space-y-2 mb-6">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? "bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-400 border border-emerald-500/30"
                      : "text-gray-300 hover:text-white hover:bg-gray-700/50"
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </button>
              ))}
            </div>

            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl font-medium transition-all duration-200 border border-red-500/20 hover:border-red-500/40"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Spacer for fixed navbar */}
      <div className="h-16" />
    </>
  );
}

// Optional: Mobile Bottom Navbar
export function MobileNavbar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  const isActive = (href: string) => pathname === href;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="bg-gradient-to-r from-gray-900/95 to-slate-900/95 backdrop-blur-xl border-t border-gray-700/50">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.href)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 ${
                isActive(item.href)
                  ? "text-emerald-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <div
                className={`p-2 rounded-lg ${
                  isActive(item.href)
                    ? "bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30"
                    : "hover:bg-gray-800/50"
                }`}
              >
                {item.icon}
              </div>
              <span className="text-xs font-medium">{item.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
