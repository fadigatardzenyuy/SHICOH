"use client";
import React, { useState, useEffect } from "react";
import {
  MapPin,
  Star,
  Clock,
  Phone,
  Navigation,
  Stethoscope,
  CheckCircle,
  Search,
  Filter,
  SlidersHorizontal,
  Heart,
  Activity,
  Shield,
  ArrowLeft,
} from "lucide-react";
import { getHospitalsData, Hospital } from "@/data/hospital";

// Hospital Card Component
const HospitalCard = ({ hospital }: { hospital: Hospital }) => {
  return (
    <div className="bg-gradient-to-br from-gray-800/60 to-slate-800/60 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden hover:border-emerald-500/50 transition-all duration-300 group hover:shadow-2xl hover:shadow-emerald-500/10">
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
          {hospital.specialties.slice(0, 3).map((specialty, index) => (
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
              <span className="text-sm font-medium text-green-400">Open</span>
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
    </div>
  );
};

const HospitalsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [allHospitals, setAllHospitals] = useState<Hospital[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const hospitals = await getHospitalsData();
        setAllHospitals(hospitals);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHospitals();
    setIsVisible(true);
  }, []);

  const filterOptions = [
    { value: "all", label: "All Hospitals" },
    { value: "preferred", label: "Preferred" },
    { value: "emergency", label: "Emergency" },
    { value: "general", label: "General" },
    { value: "specialty", label: "Specialty" },
    { value: "nearby", label: "Nearby" },
  ];

  const filteredHospitals = allHospitals.filter((hospital) => {
    const matchesSearch =
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.specialties.some((specialty) =>
        specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "preferred" && hospital.isPreferred) ||
      (selectedFilter === "emergency" && hospital.emergencyAvailable) ||
      (selectedFilter === "nearby" && parseFloat(hospital.distance) < 10) ||
      hospital.category === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">Loading hospitals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white">
      {/* Background Elements */}
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
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div
            className={`mb-8 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center gap-4 mb-6">
              <button className="p-2 hover:bg-gray-800/50 rounded-xl transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                  Find Your Perfect
                  <span className="block bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
                    Healthcare Provider
                  </span>
                </h1>
                <p className="text-gray-300 text-lg">
                  Discover top-rated hospitals and medical centers near you
                </p>
              </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-gradient-to-r from-gray-800/50 to-slate-800/50 backdrop-blur-xl rounded-2xl p-4 border border-gray-700/50">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search hospitals, specialties, or locations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                {/* Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-medium transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </button>
              </div>

              {/* Filter Options */}
              {showFilters && (
                <div className="mt-4 pt-4 border-t border-gray-700/50">
                  <div className="flex flex-wrap gap-2">
                    {filterOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSelectedFilter(option.value)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                          selectedFilter === option.value
                            ? "bg-emerald-600 text-white"
                            : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Results Header */}
          <div
            className={`mb-6 transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {filteredHospitals.length} Hospitals Found
              </h2>
              <div className="text-sm text-gray-400">
                Showing results for "
                {selectedFilter === "all"
                  ? "all hospitals"
                  : filterOptions.find((f) => f.value === selectedFilter)
                      ?.label}
                "
              </div>
            </div>
          </div>

          {/* Hospital Grid */}
          <div
            className={`transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {filteredHospitals.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredHospitals.map((hospital, index) => (
                  <div
                    key={hospital.id}
                    className="animate-fadeInUp"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <HospitalCard hospital={hospital} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  No hospitals found
                </h3>
                <p className="text-gray-400 mb-4">
                  Try adjusting your search criteria or filters
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedFilter("all");
                  }}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-medium transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div
            className={`mt-16 transition-all duration-1000 delay-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="bg-gradient-to-r from-gray-800/40 to-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-emerald-400 mb-1">
                    {allHospitals.length}
                  </div>
                  <div className="text-gray-400 text-sm">Total Hospitals</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400 mb-1">
                    {allHospitals.filter((h) => h.emergencyAvailable).length}
                  </div>
                  <div className="text-gray-400 text-sm">24/7 Emergency</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400 mb-1">
                    {allHospitals.reduce((sum, h) => sum + h.totalDoctors, 0)}
                  </div>
                  <div className="text-gray-400 text-sm">Total Doctors</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-400 mb-1">
                    4.5
                  </div>
                  <div className="text-gray-400 text-sm">Avg Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalsPage;
