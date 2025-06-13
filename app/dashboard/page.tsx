// app/(dashboard)/page.tsx

"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useUser } from "@clerk/nextjs";
import { getUserDigibook } from "@/lib/actions/book.action";

import { getRecommendedHospitals, Hospital } from "@/lib/utils/hospitalsUtils";

import LoadingSpinner from "@/components/dashboard/LoadingSpinner";
import DashboardError from "@/components/dashboard/DashboardErro";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import UserProfileCard from "@/components/dashboard/UserProfileCard";
import InfoCards from "@/components/dashboard/InfoCard";
import RecommendedHospitals from "@/components/dashboard/RecommendedHospitals";
import QuickActions from "@/components/dashboard/QuickAction";
import { getHospitalsData } from "@/data/hospital";

// Import hospital data and utilities

// Array of high-quality cover images for a random selection
const coverImages = [
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=2138&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1476703993599-0035a21b17a8?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1579684385127-6ab180507744?q=80&w=2070&auto=format&fit=crop",
];

export default function PatientDashboard() {
  const { user: clerkUser } = useUser();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [hospitalsLoading, setHospitalsLoading] = useState(true);

  const coverImage = useMemo(
    () => coverImages[Math.floor(Math.random() * coverImages.length)],
    []
  );

  // Get recommended hospitals based on rating and distance
  const recommendedHospitals = useMemo(() => {
    if (hospitals.length === 0) return [];
    return getRecommendedHospitals(hospitals, 4.5, 4);
  }, [hospitals]);

  // Fetch hospital data
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        setHospitalsLoading(true);
        const hospitalData = await getHospitalsData();
        setHospitals(hospitalData);
      } catch (error) {
        console.error("Failed to fetch hospitals:", error);
        // Fallback to static data
        setHospitals(hospitalsData);
      } finally {
        setHospitalsLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getUserDigibook();
        if (response.success) {
          if (response.data) {
            setUserData(response.data);
          } else {
            setError(
              "Welcome! Please create your health profile (Digibook) to view your dashboard."
            );
          }
        } else {
          setError(
            response.error || "Failed to load user data. Please try again."
          );
        }
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        setError("An unexpected error occurred. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <DashboardError error={error} />;
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center text-gray-300">
        No health data available. Please try refreshing the page.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white">
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <div className="max-w-6xl mx-auto">
          <DashboardHeader
            coverImage={coverImage}
            userName={userData.full_name?.split(" ")[0]}
          />

          <UserProfileCard userData={userData} clerkUser={clerkUser} />

          <InfoCards userData={userData} />

          {hospitalsLoading ? (
            <div className="mb-8 p-8 bg-gradient-to-br from-gray-800/60 to-slate-800/60 backdrop-blur-xl rounded-2xl border border-gray-700/50">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
                <span className="ml-3 text-gray-300">Loading hospitals...</span>
              </div>
            </div>
          ) : (
            <RecommendedHospitals
              hospitals={recommendedHospitals}
              allHospitals={hospitals}
            />
          )}

          <QuickActions />
        </div>
      </div>
    </div>
  );
}
