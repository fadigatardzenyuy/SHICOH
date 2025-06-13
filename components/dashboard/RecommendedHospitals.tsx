import React, { useState, useEffect } from "react";
import Link from "next/link";
import HospitalCard from "./HospitalCard";
import { ArrowRight } from "lucide-react";
import {
  getHospitalStats,
  getRecommendedHospitals,
  Hospital,
} from "@/lib/utils/hospitalsUtils";
import { getHospitalsData } from "@/data/hospital";

interface RecommendedHospitalsProps {
  limit?: number; // Number of hospitals to display
  minRating?: number; // Minimum rating for recommendations
}

const RecommendedHospitals: React.FC<RecommendedHospitalsProps> = ({
  limit = 4,
  minRating = 4.5,
}) => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [allHospitals, setAllHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHospitals();
  }, []);

  const loadHospitals = async () => {
    try {
      const data = await getHospitalsData();
      const recommended = getRecommendedHospitals(data, minRating, limit);

      setAllHospitals(data);
      setHospitals(recommended);
      setLoading(false);
    } catch (error) {
      console.error("Error loading hospitals:", error);
      setLoading(false);
    }
  };

  const stats = getHospitalStats(allHospitals);

  if (loading) {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Recommended Hospitals</h2>
            <p className="text-gray-400 text-sm mt-1">Loading...</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-800/50 rounded-2xl h-80 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Recommended Hospitals</h2>
          <p className="text-gray-400 text-sm mt-1">
            Top-rated hospitals near you ({minRating}+ rating)
          </p>
        </div>
        <Link
          href="/dashboard/hospitals"
          className="group flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-all duration-300 hover:translate-x-1"
        >
          View All ({allHospitals.length})
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Statistics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gradient-to-r from-gray-800/40 to-slate-800/40 backdrop-blur-xl rounded-xl border border-gray-700/30">
        <div className="text-center">
          <div className="text-2xl font-bold text-emerald-400">
            {hospitals.length}
          </div>
          <div className="text-xs text-gray-400">Recommended</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400">
            {stats.emergencyHospitals}
          </div>
          <div className="text-xs text-gray-400">24/7 Emergency</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-400">
            {hospitals.length > 0
              ? Math.max(...hospitals.map((h) => h.rating)).toFixed(1)
              : "0.0"}
          </div>
          <div className="text-xs text-gray-400">Top Rating</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400">
            {hospitals.length > 0
              ? Math.min(...hospitals.map((h) => parseInt(h.waitTime)))
              : "0"}
            min
          </div>
          <div className="text-xs text-gray-400">Min Wait Time</div>
        </div>
      </div>

      {hospitals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hospitals.map((hospital) => (
            <HospitalCard key={hospital.id} hospital={hospital} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400 mb-4">
            No hospitals found matching the criteria
          </p>
          <Link
            href="/dashboard/hospitals"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-medium transition-colors"
          >
            View All Hospitals
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Show more button on mobile */}
      <div className="mt-6 md:hidden">
        <Link
          href="/dashboard/hospitals"
          className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          View All Hospitals ({allHospitals.length})
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default RecommendedHospitals;
