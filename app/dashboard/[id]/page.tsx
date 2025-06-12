"use client";
import React, { useState } from "react";
import {
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  Phone,
  Navigation,
  Stethoscope,
  Users,
  Calendar,
  Heart,
  Brain,
  Baby,
  Eye,
  Bone,
  Activity,
  Shield,
  Ambulance,
  Award,
  CheckCircle,
  Wifi,
  Car,
  Coffee,
  Utensils,
} from "lucide-react";

// Mock hospital data with departments
const hospitalData = {
  id: 1,
  name: "Central Hospital Yaoundé",
  location: "Centre, Yaoundé",
  fullAddress: "Avenue Kennedy, Centre Ville, Yaoundé, Cameroon",
  rating: 4.8,
  totalReviews: 1247,
  distance: "2.3 km",
  waitTime: "15 mins",
  price: "₦₦₦",
  totalDoctors: 45,
  totalBeds: 180,
  emergencyAvailable: true,
  isPreferred: true,
  established: 1985,
  phone: "+237 222 234 567",
  email: "info@centralhospital.cm",
  website: "www.centralhospital.cm",
  description:
    "Central Hospital Yaoundé is a leading healthcare institution in Cameroon, providing comprehensive medical services with state-of-the-art facilities and experienced medical professionals. We are committed to delivering exceptional patient care across all specialties.",
  coverImage:
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2070&auto=format&fit=crop",
  facilities: [
    { icon: Ambulance, name: "24/7 Emergency" },
    { icon: Car, name: "Free Parking" },
    { icon: Wifi, name: "Free WiFi" },
    { icon: Coffee, name: "Cafeteria" },
    { icon: Utensils, name: "Restaurant" },
    { icon: Shield, name: "Insurance Accepted" },
  ],
  departments: [
    {
      id: 1,
      name: "Cardiology",
      icon: Heart,
      description:
        "Comprehensive heart care with advanced cardiac procedures and monitoring",
      doctors: 8,
      waitTime: "20 mins",
      availability: "24/7",
      services: ["ECG", "Echocardiography", "Cardiac Surgery", "Angioplasty"],
      headDoctor: "Dr. Jean Mbeki",
      color: "from-red-500 to-pink-600",
    },
    {
      id: 2,
      name: "Neurology",
      icon: Brain,
      description:
        "Expert neurological care for brain and nervous system disorders",
      doctors: 6,
      waitTime: "30 mins",
      availability: "Mon-Sat",
      services: ["MRI", "CT Scan", "EEG", "Neurotherapy"],
      headDoctor: "Dr. Marie Fosso",
      color: "from-purple-500 to-violet-600",
    },
    {
      id: 3,
      name: "Pediatrics",
      icon: Baby,
      description: "Specialized care for infants, children, and adolescents",
      doctors: 12,
      waitTime: "15 mins",
      availability: "24/7",
      services: ["Vaccination", "Growth Monitoring", "Pediatric Surgery"],
      headDoctor: "Dr. Paul Nguema",
      color: "from-blue-500 to-cyan-600",
    },
    {
      id: 4,
      name: "Ophthalmology",
      icon: Eye,
      description:
        "Complete eye care services and vision correction procedures",
      doctors: 4,
      waitTime: "25 mins",
      availability: "Mon-Fri",
      services: ["Eye Exams", "Cataract Surgery", "Laser Treatment"],
      headDoctor: "Dr. Grace Atanga",
      color: "from-green-500 to-emerald-600",
    },
    {
      id: 5,
      name: "Orthopedics",
      icon: Bone,
      description: "Treatment of bone, joint, and musculoskeletal conditions",
      doctors: 7,
      waitTime: "35 mins",
      availability: "Mon-Sat",
      services: ["Joint Replacement", "Sports Medicine", "Fracture Care"],
      headDoctor: "Dr. Samuel Tchami",
      color: "from-orange-500 to-red-600",
    },
    {
      id: 6,
      name: "Emergency",
      icon: Activity,
      description: "24/7 emergency medical services and trauma care",
      doctors: 15,
      waitTime: "5 mins",
      availability: "24/7",
      services: ["Trauma Care", "Critical Care", "Emergency Surgery"],
      headDoctor: "Dr. Alice Biya",
      color: "from-red-600 to-rose-700",
    },
  ],
};

export default function HospitalDetailPage() {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleBookAppointment = (department) => {
    setSelectedDepartment(department);
    setShowBookingModal(true);
  };

  const handleCallHospital = () => {
    window.open(`tel:${hospitalData.phone}`, "_self");
  };

  const handleNavigate = () => {
    window.open(
      `https://maps.google.com?q=${encodeURIComponent(
        hospitalData.fullAddress
      )}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-6">
        <button className="flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="relative h-64 sm:h-80 lg:h-96 rounded-3xl overflow-hidden group shadow-2xl mb-8">
            <img
              src={hospitalData.coverImage}
              alt={hospitalData.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

            {/* Hospital Status Badges */}
            <div className="absolute top-6 left-6 flex gap-3">
              {hospitalData.isPreferred && (
                <div className="bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                  Preferred Hospital
                </div>
              )}
              {hospitalData.emergencyAvailable && (
                <div className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                  24/7 Emergency
                </div>
              )}
            </div>

            {/* Hospital Info Overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                {hospitalData.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center gap-2 text-emerald-100">
                  <MapPin className="w-5 h-5" />
                  <span className="font-medium">{hospitalData.location}</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-100">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-medium">{hospitalData.rating}</span>
                  <span className="text-sm opacity-80">
                    ({hospitalData.totalReviews} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-2 text-emerald-100">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">
                    {hospitalData.waitTime} avg wait
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleBookAppointment(null)}
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
                  onClick={handleNavigate}
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
                {hospitalData.totalDoctors}
              </div>
              <div className="text-sm text-gray-400">Doctors</div>
            </div>
            <div className="bg-gradient-to-br from-gray-800/60 to-slate-800/60 backdrop-blur-xl rounded-2xl p-4 border border-gray-700/50 text-center">
              <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">
                {hospitalData.totalBeds}
              </div>
              <div className="text-sm text-gray-400">Beds</div>
            </div>
            <div className="bg-gradient-to-br from-gray-800/60 to-slate-800/60 backdrop-blur-xl rounded-2xl p-4 border border-gray-700/50 text-center">
              <Award className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-400">
                {new Date().getFullYear() - hospitalData.established}
              </div>
              <div className="text-sm text-gray-400">Years</div>
            </div>
            <div className="bg-gradient-to-br from-gray-800/60 to-slate-800/60 backdrop-blur-xl rounded-2xl p-4 border border-gray-700/50 text-center">
              <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">
                {hospitalData.rating}
              </div>
              <div className="text-sm text-gray-400">Rating</div>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-gradient-to-br from-gray-800/60 to-slate-800/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 mb-8">
            <h2 className="text-2xl font-bold mb-4">
              About {hospitalData.name}
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              {hospitalData.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {hospitalData.facilities.map((facility, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <facility.icon className="w-5 h-5 text-emerald-400" />
                  <span className="text-gray-300">{facility.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Departments Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Departments & Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hospitalData.departments.map((department) => (
                <div
                  key={department.id}
                  className="bg-gradient-to-br from-gray-800/60 to-slate-800/60 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden hover:border-emerald-500/50 transition-all duration-300 group hover:shadow-2xl hover:shadow-emerald-500/10"
                >
                  <div
                    className={`h-2 bg-gradient-to-r ${department.color}`}
                  ></div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${department.color} rounded-xl flex items-center justify-center shadow-lg`}
                      >
                        <department.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">{department.name}</h3>
                        <p className="text-sm text-gray-400">
                          {department.headDoctor}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                      {department.description}
                    </p>

                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="text-center">
                        <div className="text-emerald-400 font-bold">
                          {department.doctors}
                        </div>
                        <div className="text-xs text-gray-400">Doctors</div>
                      </div>
                      <div className="text-center">
                        <div className="text-blue-400 font-bold">
                          {department.waitTime}
                        </div>
                        <div className="text-xs text-gray-400">Wait Time</div>
                      </div>
                      <div className="text-center">
                        <div className="text-green-400 font-bold text-xs">
                          {department.availability}
                        </div>
                        <div className="text-xs text-gray-400">Available</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {department.services.slice(0, 3).map((service, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-700/50 rounded-lg text-xs text-gray-300"
                        >
                          {service}
                        </span>
                      ))}
                      {department.services.length > 3 && (
                        <span className="px-2 py-1 bg-gray-700/50 rounded-lg text-xs text-gray-400">
                          +{department.services.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleBookAppointment(department)}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95"
                      >
                        Book Appointment
                      </button>
                      <button
                        onClick={handleCallHospital}
                        className="px-4 py-2 border border-gray-600 hover:border-emerald-500 hover:bg-emerald-500/10 rounded-xl transition-colors duration-300 active:scale-95"
                      >
                        <Phone className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
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
                    {hospitalData.fullAddress}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-6 h-6 text-emerald-400" />
                <div>
                  <div className="font-semibold">Phone</div>
                  <div className="text-gray-400 text-sm">
                    {hospitalData.phone}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Activity className="w-6 h-6 text-emerald-400" />
                <div>
                  <div className="font-semibold">Emergency</div>
                  <div className="text-green-400 text-sm font-medium">
                    Available 24/7
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-gray-800 to-slate-800 rounded-2xl p-6 max-w-md w-full border border-gray-700">
            <h3 className="text-xl font-bold mb-4">Book Appointment</h3>
            {selectedDepartment ? (
              <p className="text-gray-300 mb-4">
                Booking appointment for {selectedDepartment.name} department
                with {selectedDepartment.headDoctor}
              </p>
            ) : (
              <p className="text-gray-300 mb-4">
                Select your preferred department and doctor
              </p>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => setShowBookingModal(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowBookingModal(false);
                  // Here you would integrate with your booking system
                }}
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-2 px-4 rounded-xl transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
