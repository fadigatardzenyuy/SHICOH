import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Star,
  Clock,
  Phone,
  Navigation,
  Stethoscope,
  CheckCircle,
  Bed,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { Hospital } from "@/lib/utils/hospitalsUtils";

interface HospitalCardProps {
  hospital: Hospital;
}

const HospitalCard: React.FC<HospitalCardProps> = ({ hospital }) => {
  const router = useRouter();

  const handleBookAppointment = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent the Link navigation
    e.stopPropagation();

    // Navigate to the hospital details page with booking focus
    router.push(`/dashboard/hospitals/${hospital.id}?action=book`);
  };

  const handleCall = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (hospital.phone) {
      window.location.href = `tel:${hospital.phone}`;
    }
  };

  const handleNavigate = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (hospital.address) {
      const encodedAddress = encodeURIComponent(hospital.address);
      window.open(`https://maps.google.com/maps?q=${encodedAddress}`, "_blank");
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-800/60 to-slate-800/60 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden hover:border-emerald-500/50 transition-all duration-300 group hover:shadow-2xl hover:shadow-emerald-500/10">
      {/* Clickable area for hospital details */}
      <Link href={`/dashboard/hospitals/${hospital.id}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <img
            src={hospital.image}
            alt={hospital.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {hospital.isPreferred && (
              <div className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                Preferred
              </div>
            )}
            {hospital.rating >= 4.7 && (
              <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                Top Rated
              </div>
            )}
          </div>

          <div className="absolute top-4 right-4 flex flex-col gap-2">
            {hospital.emergencyAvailable && (
              <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                24/7 Emergency
              </div>
            )}
            <div
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                hospital.status === "open"
                  ? "bg-green-500 text-white"
                  : "bg-gray-500 text-white"
              }`}
            >
              {hospital.status.charAt(0).toUpperCase() +
                hospital.status.slice(1)}
            </div>
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-4 mb-2">
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
              <div className="flex items-center gap-1 text-white text-sm">
                <Calendar className="w-4 h-4" />
                <span>Est. {hospital.established}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-bold mb-1 group-hover:text-emerald-400 transition-colors">
            {hospital.name}
          </h3>
          <p className="text-gray-400 text-sm flex items-center gap-1 mb-3">
            <MapPin className="w-3 h-3" />
            {hospital.address}
          </p>

          {/* Specialties */}
          <div className="flex flex-wrap gap-2 mb-4">
            {hospital.specialties
              .slice(0, 3)
              .map((specialty: string, index: number) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-700/50 rounded-lg text-xs text-gray-300 hover:bg-emerald-500/20 hover:text-emerald-300 transition-colors"
                >
                  {specialty}
                </span>
              ))}
            {hospital.specialties.length > 3 && (
              <span className="px-2 py-1 bg-gray-600/50 rounded-lg text-xs text-gray-400">
                +{hospital.specialties.length - 3} more
              </span>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-3 mb-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Clock className="w-3 h-3 text-emerald-400" />
                <span className="text-sm font-medium text-emerald-400">
                  {hospital.waitTime}
                </span>
              </div>
              <span className="text-xs text-gray-400">Wait</span>
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
                <Bed className="w-3 h-3 text-purple-400" />
                <span className="text-sm font-medium text-purple-400">
                  {hospital.beds}
                </span>
              </div>
              <span className="text-xs text-gray-400">Beds</span>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <span className="text-sm font-medium text-orange-400">
                  {hospital.price}
                </span>
              </div>
              <span className="text-xs text-gray-400">Cost</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Action Buttons - Outside the Link to prevent nested interactive elements */}
      <div className="px-6 pb-6">
        <div className="flex gap-3">
          <button
            onClick={handleBookAppointment}
            className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            Book Appointment
          </button>
          <button
            onClick={handleCall}
            className="relative group px-4 py-2 border border-gray-600 hover:border-emerald-500 hover:bg-emerald-500/10 rounded-xl transition-colors duration-300 active:scale-95"
          >
            <Phone className="w-4 h-4" />
            <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-900 text-white px-2 py-1 text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {hospital.phone}
            </span>
          </button>
          <button
            onClick={handleNavigate}
            className="relative group px-4 py-2 border border-gray-600 hover:border-emerald-500 hover:bg-emerald-500/10 rounded-xl transition-colors duration-300 active:scale-95"
          >
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

export default HospitalCard;
