// This directive marks the component for client-side rendering,
// which is necessary because we are using hooks like useState and useEffect.
"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Clock,
  Bot,
  Smartphone,
  Calendar,
  Shield,
  Zap,
  Users,
  Star,
  CheckCircle,
  Heart,
  Activity,
} from "lucide-react";
// Change 1: Import useRouter from 'next/navigation' instead of 'react-router-dom'
import { useRouter } from "next/navigation";

// The component is renamed to 'HomePage' or 'Page' to follow Next.js conventions
export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  // Change 2: Use the useRouter hook from Next.js
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleGetStarted = () => {
    // Change 3: Use router.push() to navigate to the new page
    // This will navigate to the page located at `app/sign-in/page.tsx`
    router.push("/sign-in");
  };

  const features = [
    {
      icon: <Clock className="w-6 h-6 text-white" />,
      title: "Zero Wait Time",
      description: "AI-powered queue management eliminates waiting rooms",
    },
    {
      icon: <Bot className="w-6 h-6 text-white" />,
      title: "Smart AI Assistant",
      description: "24/7 intelligent healthcare support at your fingertips",
    },
    {
      icon: <Smartphone className="w-6 h-6 text-white" />,
      title: "Mobile-First Care",
      description: "Complete healthcare management in your pocket",
    },
  ];

  const stats = [
    { value: "98%", label: "Faster Check-ins" },
    { value: "24/7", label: "AI Support" },
    { value: "15K+", label: "Happy Patients" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden text-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal-500/5 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating medical icons */}
      <div className="absolute inset-0 pointer-events-none">
        <Heart className="absolute top-20 left-10 w-4 h-4 text-emerald-400/20 animate-bounce" />
        <Activity className="absolute top-40 right-16 w-5 h-5 text-green-400/20 animate-pulse" />
        <Shield className="absolute bottom-40 left-8 w-4 h-4 text-teal-400/20 animate-bounce delay-1000" />
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <div className="max-w-md mx-auto sm:max-w-2xl lg:max-w-4xl">
          {/* Header */}
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-full border border-emerald-500/30 backdrop-blur-sm mb-6">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-emerald-400 font-medium text-sm">
                SHICo Platform
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Healthcare That
              <span className="block bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
                Actually Works
              </span>
            </h1>

            <p className="text-gray-300 text-lg sm:text-xl mb-8 leading-relaxed max-w-2xl mx-auto">
              Revolutionary AI-powered platform eliminating wait times and
              transforming patient care in Cameroon
            </p>

            {/* CTA Button */}
            <button
              onClick={handleGetStarted}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 font-semibold text-lg rounded-2xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
            </button>
          </div>

          {/* Hero Features Carousel */}
          <div
            className={`mb-16 transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="bg-gradient-to-r from-gray-800/50 to-slate-800/50 backdrop-blur-xl rounded-3xl p-6 border border-gray-700/50 shadow-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  {features[currentFeature].icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">
                    {features[currentFeature].title}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {features[currentFeature].description}
                  </p>
                </div>
              </div>

              {/* Feature indicators */}
              <div className="flex gap-2 justify-center">
                {features.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentFeature
                        ? "bg-emerald-400 w-6"
                        : "bg-gray-600"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div
            className={`grid grid-cols-3 gap-4 mb-16 transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-800/60 to-slate-800/60 backdrop-blur-xl rounded-2xl p-4 border border-gray-700/50 text-center hover:border-emerald-500/50 transition-all duration-300 hover:scale-105"
              >
                <div className="text-2xl sm:text-3xl font-bold mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-xs sm:text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Key Benefits */}
          <div
            className={`space-y-4 mb-16 transition-all duration-1000 delay-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-2xl font-bold text-center mb-8">
              Why Choose SHICo?
            </h2>

            <div className="space-y-3">
              <div className="bg-gradient-to-r from-gray-800/40 to-slate-800/40 backdrop-blur-xl rounded-2xl p-4 border border-gray-700/50 hover:border-emerald-500/50 transition-all duration-300 group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Instant Appointments</h3>
                    <p className="text-gray-400 text-sm">
                      Book and confirm in under 30 seconds
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-gray-800/40 to-slate-800/40 backdrop-blur-xl rounded-2xl p-4 border border-gray-700/50 hover:border-emerald-500/50 transition-all duration-300 group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Smart Queue Management</h3>
                    <p className="text-gray-400 text-sm">
                      AI predicts and optimizes your visit time
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-gray-800/40 to-slate-800/40 backdrop-blur-xl rounded-2xl p-4 border border-gray-700/50 hover:border-emerald-500/50 transition-all duration-300 group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">AI Health Assistant</h3>
                    <p className="text-gray-400 text-sm">
                      Personalized health insights and reminders
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div
            className={`text-center transition-all duration-1000 delay-900 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="bg-gradient-to-r from-gray-800/40 to-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 mb-8">
              <div className="flex items-center justify-center gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span className="text-gray-300 text-sm">HIPAA Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span className="text-gray-300 text-sm">Encrypted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-gray-300 text-sm">4.9/5</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2">
                <Users className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 text-sm">
                  Trusted by 15,000+ patients across Cameroon
                </span>
              </div>
            </div>

            <p className="text-gray-500 text-sm">
              © 2024 SHICo. Revolutionizing healthcare in Cameroon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
