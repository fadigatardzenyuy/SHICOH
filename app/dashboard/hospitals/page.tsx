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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-yellow-400"
            : i < rating
            ? "text-yellow-400 fill-yellow-400/50"
            : "text-gray-400"
        }`}
      />
    ));
  };

  const getPriceLevel = (price: string) => {
    const level = price.length;
    return {
      level,
      description:
        level === 1
          ? "Budget-friendly"
          : level === 2
          ? "Moderate"
          : level === 3
          ? "Premium"
          : "Luxury",
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading hospital details...</p>
        </div>
      </div>
    );
  }

  if (!hospital) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Hospital Not Found</h2>
          <p className="text-gray-400 mb-6">
            The hospital you're looking for doesn't exist.
          </p>
          <button
            onClick={handleBackClick}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-medium transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const priceInfo = getPriceLevel(hospital.price);
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "services", label: "Services" },
    { id: "contact", label: "Contact" },
  ];

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
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div
            className={`mb-8 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={handleBackClick}
                className="p-2 hover:bg-gray-800/50 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold mb-1">
                  {hospital.name}
                </h1>
                <div className="flex items-center gap-2 text-gray-300">
                  <MapPin className="w-4 h-4" />
                  <span>{hospital.location}</span>
                </div>
              </div>
              {hospital.isPreferred && (
                <div className="flex items-center gap-2 px-3 py-1 bg-emerald-600/20 border border-emerald-500/30 rounded-full text-emerald-400 text-sm">
                  <Award className="w-4 h-4" />
                  Preferred
                </div>
              )}
            </div>
          </div>

          {/* Hero Image and Quick Info */}
          <div
            className={`mb-8 transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="bg-gradient-to-r from-gray-800/50 to-slate-800/50 backdrop-blur-xl rounded-2xl overflow-hidden border border-gray-700/50">
              <div className="relative h-64 sm:h-80">
                <img
                  src={hospital.image}
                  alt={hospital.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        {renderStars(hospital.rating)}
                        <span className="ml-2 text-white font-semibold">
                          {hospital.rating}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-200">
                        <Clock className="w-4 h-4" />
                        <span>{hospital.waitTime} wait</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCallHospital}
                        className="p-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-colors"
                      >
                        <Phone className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleGetDirections}
                        className="p-2 bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors"
                      >
                        <Navigation className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div
            className={`mb-8 transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex gap-2 p-2 bg-gray-800/50 rounded-xl backdrop-blur-xl border border-gray-700/50">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-emerald-600 text-white"
                      : "text-gray-300 hover:bg-gray-700/50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div
            className={`transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-r from-gray-800/40 to-slate-800/40 backdrop-blur-xl rounded-xl p-4 border border-gray-700/50 text-center">
                    <Users className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white mb-1">
                      {hospital.totalDoctors}
                    </div>
                    <div className="text-gray-400 text-sm">Doctors</div>
                  </div>
                  <div className="bg-gradient-to-r from-gray-800/40 to-slate-800/40 backdrop-blur-xl rounded-xl p-4 border border-gray-700/50 text-center">
                    <Bed className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white mb-1">
                      {hospital.beds}
                    </div>
                    <div className="text-gray-400 text-sm">Beds</div>
                  </div>
                  <div className="bg-gradient-to-r from-gray-800/40 to-slate-800/40 backdrop-blur-xl rounded-xl p-4 border border-gray-700/50 text-center">
                    <Calendar className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white mb-1">
                      {hospital.established}
                    </div>
                    <div className="text-gray-400 text-sm">Established</div>
                  </div>
                  <div className="bg-gradient-to-r from-gray-800/40 to-slate-800/40 backdrop-blur-xl rounded-xl p-4 border border-gray-700/50 text-center">
                    <MapPin className="w-6 h-6 text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white mb-1">
                      {hospital.distance}
                    </div>
                    <div className="text-gray-400 text-sm">Distance</div>
                  </div>
                </div>

                {/* Hospital Information */}
                <div className="bg-gradient-to-r from-gray-800/40 to-slate-800/40 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50">
                  <h3 className="text-xl font-bold mb-4">
                    Hospital Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Building className="w-4 h-4 text-emerald-400" />
                        <span className="font-medium">Status</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        {hospital.status === "open" ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-400" />
                        )}
                        <span className="capitalize">{hospital.status}</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-4 h-4 text-emerald-400" />
                        <span className="font-medium">Emergency Services</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        {hospital.emergencyAvailable ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-400" />
                        )}
                        <span>
                          {hospital.emergencyAvailable
                            ? "Available 24/7"
                            : "Not Available"}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium">Price Range</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <span className="text-emerald-400">
                          {hospital.price}
                        </span>
                        <span>({priceInfo.description})</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-emerald-400" />
                        <span className="font-medium">Average Wait Time</span>
                      </div>
                      <div className="text-gray-300">{hospital.waitTime}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "services" && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-gray-800/40 to-slate-800/40 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Stethoscope className="w-5 h-5 text-emerald-400" />
                    Medical Specialties
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {hospital.specialties.map((specialty, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-3 bg-gray-700/30 rounded-lg border border-gray-600/30"
                      >
                        <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span className="text-gray-200">{specialty}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "contact" && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-gray-800/40 to-slate-800/40 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50">
                  <h3 className="text-xl font-bold mb-4">
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-medium mb-1">Phone Number</div>
                        <div className="text-gray-300">{hospital.phone}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapIcon className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-medium mb-1">Address</div>
                        <div className="text-gray-300">{hospital.address}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={handleCallHospital}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-medium transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      Call Hospital
                    </button>
                    <button
                      onClick={handleGetDirections}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-medium transition-colors"
                    >
                      <Navigation className="w-4 h-4" />
                      Get Directions
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDetailsPage;
