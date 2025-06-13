import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-300">Loading your health dashboard...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
