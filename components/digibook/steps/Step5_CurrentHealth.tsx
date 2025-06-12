"use client"
import { useFormContext } from "react-hook-form";
import { Calendar, Clock, MapPin, Globe } from "lucide-react";

export const Step5_Preferences = () => {
  const { register } = useFormContext();

  return (
    <div className="w-full bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-[800px] h-[800px] bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 w-full px-4 py-6 sm:px-6 lg:px-8">
        {/* Header with icon */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-indigo-500/20 to-violet-500/20 rounded-full border border-indigo-500/30 backdrop-blur-sm mb-4">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />
            <span className="text-indigo-400 font-semibold text-sm sm:text-base">
              Step 5 of 7
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent mb-3">
            Appointment Preferences
          </h3>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
            Let us know your preferred appointment times and locations
          </p>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-4xl mx-auto">
          <div className="space-y-6 sm:space-y-8">
            {/* Language Preference */}
            <div>
              <label
                htmlFor="preferred_language"
                className="flex items-center gap-2 text-sm font-medium text-indigo-400 mb-3"
              >
                <Globe className="w-4 h-4" />
                Preferred Language
              </label>
              <select
                id="preferred_language"
                {...register("preferred_language")}
                className="block w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-white placeholder-gray-400 transition-all duration-200"
              >
                <option value="">Select your preferred language</option>
                <option value="english">English</option>
                <option value="french">French</option>
                <option value="pidgin">Pidgin</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Preferred Days */}
            <div>
              <label
                htmlFor="preferred_days"
                className="flex items-center gap-2 text-sm font-medium text-violet-400 mb-3"
              >
                <Calendar className="w-4 h-4" />
                Preferred Days
              </label>
              <textarea
                id="preferred_days"
                {...register("preferred_days")}
                placeholder="e.g., Monday, Wednesday, Friday"
                rows={2}
                className="block w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 text-white placeholder-gray-400 transition-all duration-200"
              />
            </div>

            {/* Preferred Times */}
            <div>
              <label
                htmlFor="preferred_times"
                className="flex items-center gap-2 text-sm font-medium text-purple-400 mb-3"
              >
                <Clock className="w-4 h-4" />
                Preferred Times
              </label>
              <textarea
                id="preferred_times"
                {...register("preferred_times")}
                placeholder="e.g., Morning (9 AM - 12 PM), Afternoon (2 PM - 5 PM)"
                rows={2}
                className="block w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-white placeholder-gray-400 transition-all duration-200"
              />
            </div>

            {/* Preferred Locations */}
            <div>
              <label
                htmlFor="preferred_locations"
                className="flex items-center gap-2 text-sm font-medium text-indigo-400 mb-3"
              >
                <MapPin className="w-4 h-4" />
                Preferred Locations
              </label>
              <textarea
                id="preferred_locations"
                {...register("preferred_locations")}
                placeholder="e.g., Central Hospital Yaoundé, Douala Medical Center"
                rows={2}
                className="block w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-white placeholder-gray-400 transition-all duration-200"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
