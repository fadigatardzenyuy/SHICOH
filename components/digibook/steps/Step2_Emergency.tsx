"use client";

import { useFormContext } from "react-hook-form";
import { Phone, Heart, AlertCircle } from "lucide-react";

export const Step2_Emergency = () => {
  const { register } = useFormContext();

  // No other changes are needed to this component's logic or JSX.
  return (
    <div className="w-full bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden text-white">
      {/* ... (rest of the component JSX is identical) ... */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      <div className="relative z-10 w-full px-4 py-6 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full border border-red-500/30 backdrop-blur-sm mb-4">
            <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
            <span className="text-red-400 font-semibold text-sm sm:text-base">
              Step 2 of 7
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-amber-400 bg-clip-text text-transparent mb-3">
            Emergency Information
          </h3>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
            Help us ensure your safety with emergency contact details
          </p>
        </div>
        <div className="w-full max-w-4xl mx-auto">
          <div className="space-y-6 sm:space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label
                  htmlFor="emergency_contact_name"
                  className="flex items-center gap-2 text-sm font-medium text-red-400 mb-3"
                >
                  <Phone className="w-4 h-4" />
                  Emergency Contact Name
                </label>
                <input
                  type="text"
                  id="emergency_contact_name"
                  {...register("emergency_contact_name")}
                  placeholder="Full name of emergency contact"
                  className="block w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-white placeholder-gray-400 transition-all duration-200"
                />
              </div>
              <div>
                <label
                  htmlFor="emergency_contact_phone"
                  className="flex items-center gap-2 text-sm font-medium text-orange-400 mb-3"
                >
                  <Phone className="w-4 h-4" />
                  Emergency Contact Phone
                </label>
                <input
                  type="tel"
                  id="emergency_contact_phone"
                  {...register("emergency_contact_phone")}
                  placeholder="e.g., +237 123 456 789"
                  className="block w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-white placeholder-gray-400 transition-all duration-200"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="emergency_contact_relationship"
                className="flex items-center gap-2 text-sm font-medium text-amber-400 mb-3"
              >
                <Heart className="w-4 h-4" />
                Relationship to Emergency Contact
              </label>
              <input
                type="text"
                id="emergency_contact_relationship"
                {...register("emergency_contact_relationship")}
                placeholder="e.g., Spouse, Parent, Sibling"
                className="block w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-white placeholder-gray-400 transition-all duration-200"
              />
            </div>
          </div>
          <div className="mt-8 sm:mt-12 bg-gradient-to-r from-red-900/20 to-orange-900/20 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-red-500/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-lg sm:text-xl font-semibold text-white">
                Medical Information
              </h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label
                  htmlFor="blood_type"
                  className="flex items-center gap-2 text-sm font-medium text-red-400 mb-3"
                >
                  <Heart className="w-4 h-4" />
                  Blood Type
                </label>
                <input
                  type="text"
                  id="blood_type"
                  {...register("blood_type")}
                  placeholder="e.g., A+, B-, O+, AB+"
                  className="block w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-white placeholder-gray-400 transition-all duration-200"
                />
              </div>
              <div>
                <label
                  htmlFor="allergies"
                  className="flex items-center gap-2 text-sm font-medium text-orange-400 mb-3"
                >
                  <AlertCircle className="w-4 h-4" />
                  Allergies
                </label>
                <input
                  type="text"
                  id="allergies"
                  {...register("allergies")}
                  placeholder="e.g., Penicillin, Peanuts, Latex"
                  className="block w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-white placeholder-gray-400 transition-all duration-200"
                />
              </div>
            </div>
            <div className="mt-6">
              <label
                htmlFor="existing_conditions"
                className="flex items-center gap-2 text-sm font-medium text-amber-400 mb-3"
              >
                <AlertCircle className="w-4 h-4" />
                Existing Medical Conditions
              </label>
              <input
                type="text"
                id="existing_conditions"
                {...register("existing_conditions")}
                placeholder="e.g., Diabetes, Hypertension, Asthma"
                className="block w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-white placeholder-gray-400 transition-all duration-200"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};