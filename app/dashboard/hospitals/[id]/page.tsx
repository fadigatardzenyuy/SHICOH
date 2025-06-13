"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  Phone,
  Calendar,
  Bed,
  Users,
  Heart,
  Activity,
  Shield,
  Navigation,
  CheckCircle,
  XCircle,
  Stethoscope,
  Building,
  Award,
  MapIcon,
} from "lucide-react";
import { getHospitalById } from "@/data/hospital";
import { Hospital } from "@/lib/utils/hospitalsUtils";

const HospitalDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const hospitalId = parseInt(params.id as string);

  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    loadHospitalDetails();
    setIsVisible(true);
  }, [hospitalId]);

  const loadHospitalDetails = async () => {
    try {
      const hospitalData = getHospitalById(hospitalId);
      if (hospitalData) {
        setHospital(hospitalData);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error loading hospital details:", error);
      setLoading(false);
    }
  };

  const handleBackClick = () => {
    router.back();
  };

  const handleCallHospital = () => {
    if (hospital?.phone) {
      window.location.href = `tel:${hospital.phone}`;
    }
  };

  const handleGetDirections = () => {
    if (hospital?.address) {
      const encodedAddress = encodeURIComponent(hospital.address);
      window.open(`https://maps.google.com/maps?q=${encodedAddress}`, "_blank");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!hospital) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Hospital Not Found</h2>
          <button
            onClick={handleBackClick}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-6">
        <button
          onClick={handleBackClick}
          className="flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="relative h-64 sm:h-80 lg:h-96 rounded-3xl overflow-hidden group shadow-2xl mb-8">
            <img
              src={hospital.image}
              alt={hospital.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

            {/* Hospital Status Badges */}
            <div className="absolute top-6 left-6 flex gap-3">
              {hospital.isPreferred && (
                <div className="bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                  Preferred Hospital
                </div>
              )}
              {hospital.emergencyAvailable && (
                <div className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                  24/7 Emergency
                </div>
              )}
            </div>

            {/* Hospital Info Overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                {hospital.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center gap-2 text-emerald-100">
                  <MapPin className="w-5 h-5" />
                  <span className="font-medium">{hospital.location}</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-100">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-medium">{hospital.rating}</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-100">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">
                    {hospital.waitTime} avg wait
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() =>
                    router.push(
                      `/dashboard/appointments/new?hospitalId=${hospital.id}`
                    )
                  }
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
                >
                  Book Appointment
                </button>
                <button
                  onClick={handleCallHospital}
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 border border-white/30 hover:border-white/50"
                >
                  <Phone className="w-5 h-5 inline mr-2" />
                  Call Now
                </button>
                <button
                  onClick={handleGetDirections}
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 border border-white/30 hover:border-white/50"
                >
                  <Navigation className="w-5 h-5 inline mr-2" />
                  Navigate
                </button>
              </div>
            </div>
          </div>

          {/* Hospital Info Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-gray-800/60 to-slate-800/60 backdrop-blur-xl rounded-2xl p-4 border border-gray-700/50 text-center">
              <Stethoscope className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-emerald-400">
                {hospital.totalDoctors}
              </div>
              <div className="text-sm text-gray-400">Doctors</div>
            </div>
            <div className="bg-gradient-to-br from-gray-800/60 to-slate-800/60 backdrop-blur-xl rounded-2xl p-4 border border-gray-700/50 text-center">
              <Bed className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">
                {hospital.beds}
              </div>
              <div className="text-sm text-gray-400">Beds</div>
            </div>
            <div className="bg-gradient-to-br from-gray-800/60 to-slate-800/60 backdrop-blur-xl rounded-2xl p-4 border border-gray-700/50 text-center">
              <Award className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-400">
                {new Date().getFullYear() - hospital.established}
              </div>
              <div className="text-sm text-gray-400">Years</div>
            </div>
            <div className="bg-gradient-to-br from-gray-800/60 to-slate-800/60 backdrop-blur-xl rounded-2xl p-4 border border-gray-700/50 text-center">
              <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">
                {hospital.rating}
              </div>
              <div className="text-sm text-gray-400">Rating</div>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-gradient-to-br from-gray-800/60 to-slate-800/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 mb-8">
            <h2 className="text-2xl font-bold mb-4">About {hospital.name}</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              {hospital.name} is a leading healthcare institution in{" "}
              {hospital.location}, providing comprehensive medical services with
              state-of-the-art facilities and experienced medical professionals.
              We are committed to delivering exceptional patient care across all
              specialties.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {hospital.specialties.map((specialty, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <Stethoscope className="w-5 h-5 text-emerald-400" />
                  <span className="text-gray-300">{specialty}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-br from-gray-800/60 to-slate-800/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-emerald-400" />
                <div>
                  <div className="font-semibold">Address</div>
                  <div className="text-gray-400 text-sm">
                    {hospital.address}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-6 h-6 text-emerald-400" />
                <div>
                  <div className="font-semibold">Phone</div>
                  <div className="text-gray-400 text-sm">{hospital.phone}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Activity className="w-6 h-6 text-emerald-400" />
                <div>
                  <div className="font-semibold">Emergency</div>
                  <div className="text-green-400 text-sm font-medium">
                    {hospital.emergencyAvailable
                      ? "Available 24/7"
                      : "Not Available"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDetailsPage;
