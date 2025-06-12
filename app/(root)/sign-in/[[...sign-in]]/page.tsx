
"use client";

import React, { useState, useEffect } from "react";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

import Link from "next/link";
import {
  ArrowLeft,
  Shield,
  Heart,
  Activity,
  Zap,
  Bot,
  Clock,
  Smartphone,
  CheckCircle,
  Lock,
  Mail,
  Sparkles,
} from "lucide-react";

export default function SignInPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentBenefit, setCurrentBenefit] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentBenefit((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const benefits = [
    {
      icon: <Clock className="w-5 h-5 text-white" />,
      title: "Zero Wait Times",
      description: "Skip the queue with AI-powered scheduling",
    },
    {
      icon: <Bot className="w-5 h-5 text-white" />,
      title: "24/7 AI Support",
      description: "Instant healthcare assistance anytime",
    },
    {
      icon: <Shield className="w-5 h-5 text-white" />,
      title: "Secure & Private",
      description: "Your health data is always protected",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden text-white">
      {/* Animated background elements (no changes needed) */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-teal-500/5 rounded-full blur-2xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-emerald-500/5 rounded-full blur-xl animate-pulse delay-3000"></div>
      </div>

      {/* Floating medical icons (no changes needed) */}
      <div className="absolute inset-0 pointer-events-none">
        <Heart className="absolute top-20 left-10 w-4 h-4 text-emerald-400/20 animate-bounce" />
        <Activity className="absolute top-32 right-16 w-5 h-5 text-green-400/20 animate-pulse" />
        <Shield className="absolute bottom-40 left-8 w-4 h-4 text-teal-400/20 animate-bounce delay-1000" />
        <Zap className="absolute top-1/2 left-16 w-4 h-4 text-emerald-400/20 animate-pulse delay-500" />
        <Mail className="absolute bottom-32 right-20 w-4 h-4 text-green-400/20 animate-bounce delay-1500" />
        <Sparkles className="absolute top-40 left-1/2 w-4 h-4 text-teal-400/20 animate-pulse delay-2000" />
      </div>

      <div className="relative z-10 min-h-screen flex">
        {/* Left Panel - Branding & Benefits (no changes needed) */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-8 xl:px-12">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-full border border-emerald-500/30 backdrop-blur-sm mb-4">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-emerald-400 font-medium text-sm">
                  SHICo Platform
                </span>
              </div>
              <h1 className="text-4xl xl:text-5xl font-bold mb-4 leading-tight">
                Welcome Back to
                <span className="block bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
                  Smart Healthcare
                </span>
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed">
                Continue your journey with Cameroon's most advanced healthcare
                platform
              </p>
            </div>
            <div className="bg-gradient-to-r from-gray-800/50 to-slate-800/50 backdrop-blur-xl rounded-3xl p-6 border border-gray-700/50 shadow-2xl mb-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  {benefits[currentBenefit].icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">
                    {benefits[currentBenefit].title}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {benefits[currentBenefit].description}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 justify-center mt-4">
                {benefits.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentBenefit
                        ? "bg-emerald-400 w-6"
                        : "bg-gray-600"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-400" />
                <span>Bank-Level Security</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>15K+ Users</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Sign In Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 lg:px-8">
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            {/* Mobile Logo (no changes needed) */}
            <div className="lg:hidden text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-full border border-emerald-500/30 backdrop-blur-sm mb-4">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-emerald-400 font-medium text-sm">
                  SHICo Platform
                </span>
              </div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-400 text-sm">
                Sign in to access your healthcare dashboard
              </p>
            </div>

            {/* Sign In Container */}
            <div className="max-w-md mx-auto w-full">
              <SignedOut>
                <div className="bg-gradient-to-br from-gray-800/60 to-slate-800/60 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
                  {/* ... (inner content is the same) ... */}
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Lock className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Secure Sign In
                    </h2>
                    <p className="text-gray-400 text-sm">
                      Enter your credentials to continue
                    </p>
                  </div>
                  
                  {/* The <SignInButton> component from @clerk/nextjs works the same way */}
                  <SignInButton mode="modal">
                    <button className="w-full group relative inline-flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold text-lg rounded-2xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105 active:scale-95 mb-6">
                      <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span>Sign In to SHICo</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
                    </button>
                  </SignInButton>
                  {/* ... (rest of the SignedOut block is the same) ... */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-600"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-slate-900 text-gray-400">
                        Quick & Secure Access
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-xl border border-gray-600/50">
                      <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                        <Shield className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">
                          End-to-End Encryption
                        </p>
                        <p className="text-gray-400 text-xs">
                          Your data is always protected
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-xl border border-gray-600/50">
                      <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <Smartphone className="w-4 h-4 text-green-400" />
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">
                          Multi-Factor Authentication
                        </p>
                        <p className="text-gray-400 text-xs">
                          Extra layer of security
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8 text-gray-500 text-sm">
                  <p>
                    New to SHICo?{" "}
                    {/* Change 3: Use Link for navigation */}
                    <Link
                      href="/sign-up"
                      className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                    >
                      Create Account
                    </Link>
                  </p>
                  <p className="mt-2">
                    © 2024 SHICo. Transforming healthcare in Cameroon.
                  </p>
                </div>
              </SignedOut>

              <SignedIn>
                <div className="bg-gradient-to-br from-gray-800/60 to-slate-800/60 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Welcome Back!
                  </h2>
                  <p className="text-gray-400 text-sm mb-6">
                    You're successfully signed in to SHICo
                  </p>
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <UserButton
                      appearance={{
                        elements: {
                          avatarBox: "w-12 h-12 ring-2 ring-emerald-500/50",
                          userButtonTrigger: "focus:shadow-emerald-500/25",
                        },
                      }}
                    />
                    <div className="text-left">
                      <p className="text-white font-medium">Signed In</p>
                      <p className="text-gray-400 text-sm">
                        Access your dashboard
                      </p>
                    </div>
                  </div>

                  {/* Change 3: Use Link for navigation */}
                  <Link href="/dashboard">
                    <button className="w-full group relative inline-flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105 active:scale-95">
                      <span>Go to Dashboard</span>
                      <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}