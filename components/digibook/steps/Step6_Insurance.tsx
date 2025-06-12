"use client"
import { useFormContext } from "react-hook-form";
import { CreditCard, Shield, FileText } from "lucide-react";

export const Step6_Insurance = () => {
  const { register } = useFormContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header with icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-full border border-amber-500/30 backdrop-blur-sm mb-4">
            <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
            <span className="text-amber-400 font-semibold text-sm sm:text-base">
              Step 6 of 7
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent mb-3">
            Insurance Information
          </h3>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
            Provide your insurance details for seamless billing
          </p>
        </div>

        {/* Form Container */}
        <div className="space-y-6 sm:space-y-8">
          <div>
            <label
              htmlFor="insurance_provider"
              className="flex items-center gap-2 text-sm font-medium text-amber-400 mb-3"
            >
              <Shield className="w-4 h-4" />
              Insurance Provider
            </label>
            <input
              type="text"
              id="insurance_provider"
              {...register("insurance_provider")}
              placeholder="e.g., CNPS, Allianz, AXA"
              className="block w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-white placeholder-gray-400 transition-all duration-200"
            />
          </div>

          <div>
            <label
              htmlFor="insurance_policy_number"
              className="flex items-center gap-2 text-sm font-medium text-yellow-400 mb-3"
            >
              <CreditCard className="w-4 h-4" />
              Policy Number
            </label>
            <input
              type="text"
              id="insurance_policy_number"
              {...register("insurance_policy_number")}
              placeholder="Enter your insurance policy number"
              className="block w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 text-white placeholder-gray-400 transition-all duration-200"
            />
          </div>

          <div>
            <label
              htmlFor="coverage_details"
              className="flex items-center gap-2 text-sm font-medium text-orange-400 mb-3"
            >
              <FileText className="w-4 h-4" />
              Coverage Details
            </label>
            <textarea
              id="coverage_details"
              {...register("coverage_details")}
              placeholder="Describe your insurance coverage and any specific requirements"
              rows={3}
              className="block w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-white placeholder-gray-400 transition-all duration-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
