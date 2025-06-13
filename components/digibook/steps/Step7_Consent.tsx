"use client";
import { useFormContext } from "react-hook-form";
import { CheckCircle, Shield, FileText } from "lucide-react";

export const Step7_Consent = () => {
  const { register } = useFormContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header with icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-500/20 to-pink-500/20 rounded-full border border-rose-500/30 backdrop-blur-sm mb-4">
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-rose-400" />
            <span className="text-rose-400 font-semibold text-sm sm:text-base">
              Step 7 of 7
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-rose-400 via-pink-400 to-fuchsia-400 bg-clip-text text-transparent mb-3">
            Consent & Agreements
          </h3>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
            Please review and agree to our terms and privacy policy
          </p>
        </div>

        {/* Form Container */}
        <div className="space-y-6 sm:space-y-8">
          <div className="bg-gradient-to-r from-rose-900/20 to-pink-900/20 p-6 rounded-xl border border-rose-500/30">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-rose-400" />
              Privacy Policy
            </h4>
            <p className="text-gray-300 text-sm mb-4">
              We are committed to protecting your privacy and ensuring the
              security of your personal and medical information. Your data will
              be handled in accordance with our privacy policy and applicable
              laws.
            </p>
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="consent_share_records"
                {...register("consent_share_records", { value: false })}
                className="mt-1 h-4 w-4 rounded border-gray-600 bg-gray-800 text-rose-500 focus:ring-rose-500/20"
              />
              <label
                htmlFor="consent_share_records"
                className="text-sm text-gray-300"
              >
                I consent to sharing my medical records with authorized
                healthcare providers
              </label>
            </div>
          </div>

          <div className="bg-gradient-to-r from-pink-900/20 to-fuchsia-900/20 p-6 rounded-xl border border-pink-500/30">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-pink-400" />
              Terms of Service
            </h4>
            <p className="text-gray-300 text-sm mb-4">
              By using our services, you agree to our terms of service,
              including our appointment policies, cancellation procedures, and
              payment terms.
            </p>
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="consent_notifications"
                {...register("consent_notifications", { value: false })}
                className="mt-1 h-4 w-4 rounded border-gray-600 bg-gray-800 text-pink-500 focus:ring-pink-500/20"
              />
              <label
                htmlFor="consent_notifications"
                className="text-sm text-gray-300"
              >
                I consent to receiving notifications about my appointments and
                healthcare updates
              </label>
            </div>
          </div>

          <div className="bg-gradient-to-r from-fuchsia-900/20 to-rose-900/20 p-6 rounded-xl border border-fuchsia-500/30">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-fuchsia-400" />
              Emergency Access
            </h4>
            <p className="text-gray-300 text-sm mb-4">
              In case of emergency, healthcare providers may need immediate
              access to your medical information to provide appropriate care.
            </p>
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="consent_emergency_access"
                {...register("consent_emergency_access", { value: false })}
                className="mt-1 h-4 w-4 rounded border-gray-600 bg-gray-800 text-fuchsia-500 focus:ring-fuchsia-500/20"
              />
              <label
                htmlFor="consent_emergency_access"
                className="text-sm text-gray-300"
              >
                I consent to emergency access of my medical information
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
