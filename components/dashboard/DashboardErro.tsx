import React from "react";
import Link from "next/link";

interface DashboardErrorProps {
  error: string;
}

const DashboardError: React.FC<DashboardErrorProps> = ({ error }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center p-4">
      <div className="text-center text-white bg-gray-800/70 p-8 rounded-2xl border border-red-500/50 max-w-md">
        <h2 className="text-xl font-bold mb-3 text-red-400">Action Required</h2>
        <p className="text-gray-300">{error}</p>
        <Link href="/book">
          <button className="mt-6 px-6 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95">
            Create Digibook
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardError;
