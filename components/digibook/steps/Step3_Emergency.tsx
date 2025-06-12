"use client";

import { useFormContext } from "react-hook-form";
import { FileText, Activity, Users } from "lucide-react";

export const Step3_MedicalHistory = () => {
  const { register } = useFormContext();

  // No other changes are needed to this component's logic or JSX.
  return (
    <div className="w-full bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden text-white">
      {/* ... (rest of the component JSX is identical) ... */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      <div className="relative z-10 w-full px-4 py-6 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30 backdrop-blur-sm mb-4">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
            <span className="text-blue-400 font-semibold text-sm sm:text-base">
              Step 3 of 7
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
            Medical History
          </h3>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
            Share your medical background to help us provide better care
          </p>
        </div>
        <div className="w-full max-w-4xl mx-auto">
          <div className="space-y-6 sm:space-y-8">
            <p className="text-sm text-gray-400 bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-4 rounded-xl border border-blue-500/20">
              Please list major events. You can add more details later from your
              dashboard.
            </p>
            <div>
              <label
                htmlFor="past_hospital_visits"
                className="flex items-center gap-2 text-sm font-medium text-blue-400 mb-3"
              >
                <Activity className="w-4 h-4" />
                Past Hospital Visits (Optional)
              </label>
              <textarea
                id="past_hospital_visits"
                {...register("past_hospital_visits")}
                placeholder="e.g., Central Hospital Yaoundé, Cardiology, Jan 2022, Chest Pain evaluation"
                rows={4}
                className="block w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-white placeholder-gray-400 transition-all duration-200"
              />
            </div>
            <div>
              <label
                htmlFor="surgeries"
                className="flex items-center gap-2 text-sm font-medium text-purple-400 mb-3"
              >
                <FileText className="w-4 h-4" />
                Surgeries (Optional)
              </label>
              <textarea
                id="surgeries"
                {...register("surgeries")}
                placeholder="e.g., Appendectomy, June 2018, Douala General Hospital"
                rows={4}
                className="block w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-white placeholder-gray-400 transition-all duration-200"
              />
            </div>
            <div>
              <label
                htmlFor="family_medical_history"
                className="flex items-center gap-2 text-sm font-medium text-pink-400 mb-3"
              >
                <Users className="w-4 h-4" />
                Family Medical History (Optional)
              </label>
              <textarea
                id="family_medical_history"
                {...register("family_medical_history")}
                placeholder="e.g., Mother - Diabetes, Father - Heart Disease"
                rows={3}
                className="block w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 text-white placeholder-gray-400 transition-all duration-200"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};