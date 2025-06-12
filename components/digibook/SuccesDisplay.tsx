"use client";
import React from "react";
import {
  Sparkles,
  Heart,
  Activity,
  Shield,
  Zap,
  CheckCircle,
} from "lucide-react";

export const SuccessDisplay = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden flex items-center justify-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal-500/5 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating celebration icons */}
      <div className="absolute inset-0 pointer-events-none">
        <Sparkles className="absolute top-20 left-10 w-6 h-6 text-emerald-400/30 animate-bounce" />
        <Heart className="absolute top-32 right-16 w-5 h-5 text-green-400/30 animate-pulse" />
        <Activity className="absolute bottom-40 left-8 w-4 h-4 text-teal-400/30 animate-bounce delay-1000" />
        <Shield className="absolute bottom-20 right-12 w-5 h-5 text-emerald-400/30 animate-pulse delay-500" />
        <Zap className="absolute top-1/4 left-1/4 w-4 h-4 text-green-400/20 animate-bounce delay-700" />
        <CheckCircle className="absolute top-3/4 right-1/4 w-6 h-6 text-teal-400/30 animate-pulse delay-300" />
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Container */}
          <div className="bg-gradient-to-r from-gray-800/50 to-slate-800/50 backdrop-blur-xl rounded-3xl p-12 border border-gray-700/50 shadow-2xl">
            {/* Success Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-full border border-emerald-500/30 backdrop-blur-sm mb-8">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-emerald-400 font-medium text-sm">
                Registration Complete
              </span>
            </div>

            {/* Success Icon with Animation */}
            <div className="relative mb-8">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/30 animate-bounce">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>

              {/* Pulsing rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 border-2 border-emerald-400/30 rounded-full animate-ping"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 border border-green-400/20 rounded-full animate-ping animation-delay-75"></div>
              </div>
            </div>

            {/* Success Message */}
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Setup
              <span className="block bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
                Complete!
              </span>
            </h2>

            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg mx-auto">
              Thank you for setting up your Digital Hospital Book with SHICo.
              Your healthcare journey starts now with AI-powered care at your
              fingertips.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-gray-800/40 to-slate-800/40 backdrop-blur-xl rounded-2xl p-4 border border-gray-700/50">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <p className="text-white font-semibold text-sm">
                  Instant Access
                </p>
                <p className="text-gray-400 text-xs">24/7 healthcare</p>
              </div>

              <div className="bg-gradient-to-br from-gray-800/40 to-slate-800/40 backdrop-blur-xl rounded-2xl p-4 border border-gray-700/50">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <p className="text-white font-semibold text-sm">Secure Data</p>
                <p className="text-gray-400 text-xs">HIPAA compliant</p>
              </div>

              <div className="bg-gradient-to-br from-gray-800/40 to-slate-800/40 backdrop-blur-xl rounded-2xl p-4 border border-gray-700/50">
                <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Activity className="w-4 h-4 text-white" />
                </div>
                <p className="text-white font-semibold text-sm">AI Assistant</p>
                <p className="text-gray-400 text-xs">Personalized care</p>
              </div>
            </div>

            {/* Redirect Notice */}
            <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/20 rounded-2xl p-4 backdrop-blur-sm">
              <div className="flex items-center justify-center gap-2 text-emerald-400">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="font-medium text-sm">
                  Redirecting to your dashboard...
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="mt-6 text-gray-500 text-sm">
            Welcome to the future of healthcare in Cameroon
          </p>
        </div>
      </div>
    </div>
  );
};
