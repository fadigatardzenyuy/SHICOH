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
import { Hospital } from "@/lib/utils/hospitalsUtils";
import { getHospitalById } from "@/data/hospital";
import { AppointmentFlowModal } from "@/components/AppoitmentFlowModel/AppoitmentFlowModel";
// Corrected import paths for consistency
const HospitalDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const hospitalId = parseInt(params.id as string);

  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleBookAppointmentClick = () => {
    if (hospital) {
      setIsModalOpen(true);
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
        <div className="text-center px-4">
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
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
        </div>

        {/* Header */}
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
          <button
            onClick={handleBackClick}
            className="flex items-center gap-2 text-gray-300 hover:text-white mb-4 sm:mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
        </div>

        {/* Hero Section */}
        <div className="relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="relative h-[70vh] sm:h-64 md:h-80 lg:h-96 rounded-2xl sm:rounded-3xl overflow-hidden group shadow-2xl mb-6 sm:mb-8">
              <img
                src={hospital.image}
                alt={hospital.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              <div className="absolute top-4 sm:top-4 md:top-6 left-4 sm:left-4 md:left-6 flex flex-col gap-2">
                {/* Status Badges - Restored */}
                {hospital.isPreferred && (
                  <div className="bg-emerald-500 text-white px-3 sm:px-3 md:px-4 py-2 sm:py-2 rounded-full text-sm sm:text-sm font-medium shadow-lg backdrop-blur-sm flex items-center gap-2">
                    <Star className="w-4 h-4 fill-current" />
                    Preferred Hospital
                  </div>
                )}
                {hospital.emergencyAvailable && (
                  <div className="bg-red-500 text-white px-3 sm:px-3 md:px-4 py-2 sm:py-2 rounded-full text-sm sm:text-sm font-medium shadow-lg backdrop-blur-sm flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    24/7 Emergency
                  </div>
                )}
              </div>

              <div className="absolute bottom-4 sm:bottom-4 md:bottom-6 left-4 sm:left-4 md:left-6 right-4 sm:right-4 md:right-6">
                <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 sm:mb-3 drop-shadow-lg leading-tight">
                  {hospital.name}
                </h1>

                <div className="flex flex-col gap-2 mb-6 sm:mb-6">
                  {/* Hospital Stats - Restored */}
                  <div className="flex items-center gap-2 text-emerald-100 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1.5 w-fit">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <span className="font-medium text-sm sm:text-base">
                      {hospital.location}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex items-center gap-2 text-emerald-100 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1.5">
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current flex-shrink-0" />
                      <span className="font-medium text-sm sm:text-base">
                        {hospital.rating}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-100 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1.5">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                      <span className="font-medium text-sm sm:text-base">
                        {hospital.waitTime}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 sm:space-y-0 sm:flex sm:flex-wrap sm:gap-3">
                  <button
                    onClick={handleBookAppointmentClick}
                    className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white px-6 sm:px-6 py-4 sm:py-3 rounded-xl font-bold text-lg sm:text-base transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl backdrop-blur-sm border border-emerald-500/50 flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-5 h-5" />
                    Book Appointment
                  </button>

                  <div className="grid grid-cols-2 gap-3 sm:contents">
                    <button
                      onClick={handleCallHospital}
                      className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 sm:px-6 py-4 sm:py-3 rounded-xl font-semibold transition-all duration-300 border border-white/30 hover:border-white/50 text-sm sm:text-base shadow-lg flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                      Call Now
                    </button>
                    <button
                      onClick={handleGetDirections}
                      className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 sm:px-6 py-4 sm:py-3 rounded-xl font-semibold transition-all duration-300 border border-white/30 hover:border-white/50 text-sm sm:text-base shadow-lg flex items-center justify-center gap-2"
                    >
                      <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />
                      Navigate
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Hospital Info Cards - Restored */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="bg-gradient-to-br from-gray-800/60 to-slate-800/60 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-gray-700/50 text-center">
                <Stethoscope className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400 mx-auto mb-1 sm:mb-2" />
                <div className="text-lg sm:text-2xl font-bold text-emerald-400">
                  {hospital.totalDoctors}
                </div>
                <div className="text-xs sm:text-sm text-gray-400">Doctors</div>
              </div>
              <div className="bg-gradient-to-br from-gray-800/60 to-slate-800/60 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-gray-700/50 text-center">
                <Bed className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 mx-auto mb-1 sm:mb-2" />
                <div className="text-lg sm:text-2xl font-bold text-blue-400">
                  {hospital.beds}
                </div>
                <div className="text-xs sm:text-sm text-gray-400">Beds</div>
              </div>
              <div className="bg-gradient-to-br from-gray-800/60 to-slate-800/60 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-gray-700/50 text-center">
                <Award className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 mx-auto mb-1 sm:mb-2" />
                <div className="text-lg sm:text-2xl font-bold text-yellow-400">
                  {new Date().getFullYear() - hospital.established}
                </div>
                <div className="text-xs sm:text-sm text-gray-400">Years</div>
              </div>
              <div className="bg-gradient-to-br from-gray-800/60 to-slate-800/60 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-gray-700/50 text-center">
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 mx-auto mb-1 sm:mb-2" />
                <div className="text-lg sm:text-2xl font-bold text-green-400">
                  {hospital.rating}
                </div>
                <div className="text-xs sm:text-sm text-gray-400">Rating</div>
              </div>
            </div>

            {/* About Section - Restored */}
            <div className="bg-gradient-to-br from-gray-800/60 to-slate-800/60 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-700/50 mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                About {hospital.name}
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                {hospital.name} is a leading healthcare institution in{" "}
                {hospital.location}, providing comprehensive medical services
                with state-of-the-art facilities and experienced medical
                professionals. We are committed to delivering exceptional
                patient care across all specialties.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
                {hospital.specialties.map((specialty, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-xs sm:text-sm"
                  >
                    <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-gray-300">{specialty}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information - Restored */}
            <div className="bg-gradient-to-br from-gray-800/60 to-slate-800/60 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-700/50 mb-6">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm sm:text-base">
                      Address
                    </div>
                    <div className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                      {hospital.address}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm sm:text-base">
                      Phone
                    </div>
                    <div className="text-gray-400 text-xs sm:text-sm">
                      {hospital.phone}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm sm:text-base">
                      Emergency
                    </div>
                    <div className="text-green-400 text-xs sm:text-sm font-medium">
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

      <AppointmentFlowModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        hospital={hospital}
      />
    </>
  );
};

export default HospitalDetailsPage;
