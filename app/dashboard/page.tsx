// app/(dashboard)/page.tsx or your dashboard route file

"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import {
  User,
  MapPin,
  Star,
  Clock,
  Phone,
  Calendar,
  Heart,
  Activity,
  Shield,
  BookOpen, // Changed from Edit3 for better context
  Navigation,
  Stethoscope,
  Building2,
  CheckCircle,
  Users,
} from "lucide-react";

// Assuming your action is correctly set up.
// Ensure the path is correct for your project structure.
import { getUserDigibook } from "@/lib/actions/book.action";

// Array of high-quality cover images for a random selection
const coverImages = [
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=2138&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1476703993599-0035a21b17a8?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1579684385127-6ab180507744?q=80&w=2070&auto=format&fit=crop",
];

// Mock hospital data (can be replaced with a real API call later)
const recommendedHospitals = [
  {
    id: 1,
    name: "Central Hospital Yaoundé",
    location: "Centre, Yaoundé",
    rating: 4.8,
    distance: "2.3 km",
    specialties: ["Cardiology", "Neurology", "Emergency"],
    waitTime: "15 mins",
    price: "₦₦₦",
    image:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=200&fit=crop",
    isPreferred: true,
    totalDoctors: 45,
    emergencyAvailable: true,
  },
  {
    id: 2,
    name: "Douala General Hospital",
    location: "Littoral, Douala",
    rating: 4.6,
    distance: "15.7 km",
    specialties: ["Surgery", "Pediatrics", "Oncology"],
    waitTime: "25 mins",
    price: "₦₦",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=200&fit=crop",
    isPreferred: false,
    totalDoctors: 38,
    emergencyAvailable: true,
  },
  {
    id: 3,
    name: "University Teaching Hospital",
    location: "Centre, Yaoundé",
    rating: 4.7,
    distance: "5.1 km",
    specialties: ["Internal Medicine", "Dermatology"],
    waitTime: "30 mins",
    price: "₦₦₦₦",
    image:
      "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=200&fit=crop",
    isPreferred: false,
    totalDoctors: 52,
    emergencyAvailable: false,
  },
  {
    id: 4,
    name: "Bamenda Regional Hospital",
    location: "North-West, Bamenda",
    rating: 4.4,
    distance: "8.9 km",
    specialties: ["Maternity", "General Practice"],
    waitTime: "20 mins",
    price: "₦₦",
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop",
    isPreferred: false,
    totalDoctors: 28,
    emergencyAvailable: true,
  },
];

export default function PatientDashboard() {
  const { user: clerkUser } = useUser();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const coverImage = useMemo(
    () => coverImages[Math.floor(Math.random() * coverImages.length)],
    []
  );

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
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">Loading your health dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center p-4">
        <div className="text-center text-white bg-gray-800/70 p-8 rounded-2xl border border-red-500/50 max-w-md">
          <h2 className="text-xl font-bold mb-3 text-red-400">
            Action Required
          </h2>
          <p className="text-gray-300">{error}</p>
          <Link href="/book">
            <button className="mt-6 px-6 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95">
              Create Digibook
            </button>
          </Link>
        </div>
      </div>
    );
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
          <div className="relative h-48 sm:h-64 rounded-3xl mb-[-3rem] sm:mb-[-4rem] overflow-hidden group shadow-lg">
            <img
              src={coverImage}
              alt="Healthcare background"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 drop-shadow-lg">
                Welcome back, {userData.full_name?.split(" ")[0] || "User"}!
              </h1>
              <p className="text-emerald-100 drop-shadow-sm">
                Your health is our priority.
              </p>
            </div>
          </div>

          <div className="relative bg-gradient-to-r from-gray-800/60 to-slate-800/60 backdrop-blur-xl rounded-3xl p-6 border border-gray-700/50 mb-8 shadow-2xl">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-shrink-0 -mt-12 sm:-mt-16 self-center sm:self-start">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center ring-4 ring-gray-800/80">
                  {clerkUser?.imageUrl ? (
                    <img
                      src={clerkUser.imageUrl}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-12 h-12 text-white" />
                  )}
                </div>
              </div>
              <div className="flex-1 pt-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">
                      {userData.full_name}
                    </h2>
                    <p className="text-gray-400">{userData.email}</p>
                  </div>
                  <Link href="/book">
                    <button className="w-full sm:w-auto mt-3 sm:mt-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 group">
                      <BookOpen className="w-4 h-4 transition-transform group-hover:rotate-[-5deg]" />
                      View Digibook
                    </button>
                  </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-gray-700/50 rounded-xl p-3 text-center">
                    <div className="text-lg font-bold text-emerald-400">
                      {userData.blood_type || "N/A"}
                    </div>
                    <div className="text-xs text-gray-400">Blood Type</div>
                  </div>
                  <div className="bg-gray-700/50 rounded-xl p-3 text-center">
                    <div className="text-lg font-bold text-green-400">
                      {userData.existing_conditions?.length || 0}
                    </div>
                    <div className="text-xs text-gray-400">Conditions</div>
                  </div>
                  <div className="bg-gray-700/50 rounded-xl p-3 text-center">
                    <div className="text-lg font-bold text-teal-400">24/7</div>
                    <div className="text-xs text-gray-400">Support</div>
                  </div>
                  <div className="bg-gray-700/50 rounded-xl p-3 text-center">
                    <div className="text-lg font-bold text-yellow-400">4.9</div>
                    <div className="text-xs text-gray-400">Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              {
                icon: Heart,
                title: "Emergency Contact",
                value: userData.emergency_contact?.name || "Not specified",
                subValue: userData.emergency_contact?.phone || "No phone",
                color: "from-red-500 to-pink-600",
              },
              {
                icon: Shield,
                title: "Insurance",
                value: userData.insurance_provider || "Not specified",
                subValue: "Active Coverage",
                color: "from-blue-500 to-indigo-600",
              },
              {
                icon: Activity,
                title: "Allergies",
                value: userData.allergies_text || "None specified",
                subValue: "Important Alerts",
                color: "from-purple-500 to-violet-600",
              },
            ].map((card, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-800/60 to-slate-800/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover:border-emerald-500/50 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center shadow-lg`}
                  >
                    <card.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{card.title}</h3>
                    <p className="text-gray-400 text-sm">{card.subValue}</p>
                  </div>
                </div>
                <p className="text-gray-200 text-sm font-medium truncate">
                  {card.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Recommended Hospitals</h2>
              <button className="text-emerald-400 hover:text-emerald-300 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendedHospitals.map((hospital) => (
                <Link
                  href="/dashboard/123"
                  key={hospital.id}
                  className="bg-gradient-to-br from-gray-800/60 to-slate-800/60 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden hover:border-emerald-500/50 transition-all duration-300 group hover:shadow-2xl hover:shadow-emerald-500/10"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={hospital.image}
                      alt={hospital.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    {hospital.isPreferred && (
                      <div className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                        Preferred
                      </div>
                    )}
                    {hospital.emergencyAvailable && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                        24/7 Emergency
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white text-sm font-medium">
                            {hospital.rating}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-white text-sm">
                          <MapPin className="w-4 h-4" />
                          <span>{hospital.distance}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-1">{hospital.name}</h3>
                    <p className="text-gray-400 text-sm flex items-center gap-1 mb-3">
                      <MapPin className="w-3 h-3" />
                      {hospital.location}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {hospital.specialties
                        .slice(0, 3)
                        .map((specialty, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-700/50 rounded-lg text-xs text-gray-300"
                          >
                            {specialty}
                          </span>
                        ))}
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Clock className="w-3 h-3 text-emerald-400" />
                          <span className="text-sm font-medium text-emerald-400">
                            {hospital.waitTime}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">Wait Time</span>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Stethoscope className="w-3 h-3 text-blue-400" />
                          <span className="text-sm font-medium text-blue-400">
                            {hospital.totalDoctors}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">Doctors</span>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <CheckCircle className="w-3 h-3 text-green-400" />
                          <span className="text-sm font-medium text-green-400">
                            Open
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">Status</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95">
                        Book Appointment
                      </button>
                      <button className="relative group px-4 py-2 border border-gray-600 hover:border-emerald-500 hover:bg-emerald-500/10 rounded-xl transition-colors duration-300 active:scale-95">
                        <Phone className="w-4 h-4" />
                        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-900 text-white px-2 py-1 text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          Call
                        </span>
                      </button>
                      <button className="relative group px-4 py-2 border border-gray-600 hover:border-emerald-500 hover:bg-emerald-500/10 rounded-xl transition-colors duration-300 active:scale-95">
                        <Navigation className="w-4 h-4" />
                        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-900 text-white px-2 py-1 text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          Navigate
                        </span>
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-800/60 to-slate-800/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <button className="flex flex-col items-center gap-2 p-4 bg-gray-700/50 hover:bg-emerald-600/20 rounded-xl transition-all duration-300 group hover:-translate-y-1">
                <Calendar className="w-6 h-6 text-emerald-400 group-hover:text-emerald-300" />
                <span className="text-sm font-medium">Schedule</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 bg-gray-700/50 hover:bg-emerald-600/20 rounded-xl transition-all duration-300 group hover:-translate-y-1">
                <Activity className="w-6 h-6 text-emerald-400 group-hover:text-emerald-300" />
                <span className="text-sm font-medium">Records</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 bg-gray-700/50 hover:bg-emerald-600/20 rounded-xl transition-all duration-300 group hover:-translate-y-1">
                <Users className="w-6 h-6 text-emerald-400 group-hover:text-emerald-300" />
                <span className="text-sm font-medium">Doctors</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 bg-gray-700/50 hover:bg-emerald-600/20 rounded-xl transition-all duration-300 group hover:-translate-y-1">
                <Building2 className="w-6 h-6 text-emerald-400 group-hover:text-emerald-300" />
                <span className="text-sm font-medium">Hospitals</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
