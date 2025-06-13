"use client"; // This component must be a Client Component

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { DigibookFormData } from "@/lib/types/digibook";
import { Step1_Personal } from "./steps/Step1_Personal";
import { Step2_Emergency } from "./steps/Step2_Emergency";
import { Step3_MedicalHistory } from "./steps/Step3_Emergency";
import { Step4_CurrentHealth } from "./steps/Step4_MedicalHistory";
import { Step5_Preferences } from "./steps/Step5_CurrentHealth";
import { Step6_Insurance } from "./steps/Step6_Insurance";
import { Step7_Consent } from "./steps/Step7_Consent";
import { SuccessDisplay } from "./SuccesDisplay";
import {
  Heart,
  Activity,
  Shield,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const TOTAL_STEPS = 7;

export const DigibookForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formError, setFormError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<DigibookFormData>({
    defaultValues: {
      full_name: "",
      date_of_birth: "",
      gender: "",
      phone_number: "",
      home_address: "",
      next_of_kin_name: "",
      next_of_kin_relationship: "",
      next_of_kin_phone: "",
      emergency_contact_name: "",
      emergency_contact_phone: "",
      emergency_contact_relationship: "",
      blood_type: "",
      allergies: "",
      existing_conditions: "",
      past_hospital_visits: "",
      surgeries: "",
      family_medical_history: "",
      current_medications: "",
      primary_doctor_name: "",
      primary_doctor_contact: "",
      preferred_hospital: "",
      preferred_language: "",
      preferred_department: "",
      accessibility_needs: "",
      insurance_provider: "",
      insurance_policy_number: "",
      insurance_contact_info: "",
      consent_share_records: false,
      consent_notifications: false,
      consent_emergency_access: false,
    },
  });

  const { trigger } = methods;

  const handleSubmitAllData = async () => {
    setIsLoading(true);
    try {
      // Here you would typically send the data to your backend
      console.log("Form data:", methods.getValues());
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCurrentStep((prev) => prev + 1);
    } catch (error) {
      setFormError("Failed to submit form. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = async () => {
    // Clear previous errors
    setFormError(null);

    // Validate current step
    const isStepValid = await trigger();
    if (!isStepValid) {
      setFormError("Please fill in all required fields correctly.");
      return;
    }

    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Final step - submit all data
      await handleSubmitAllData();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setFormError(null);
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Renders the correct step component based on the current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1_Personal />;
      case 2:
        return <Step2_Emergency />;
      case 3:
        return <Step3_MedicalHistory />;
      case 4:
        return <Step4_CurrentHealth />;
      case 5:
        return <Step5_Preferences />;
      case 6:
        return <Step6_Insurance />;
      case 7:
        return <Step7_Consent />;
      default:
        return <Step1_Personal />;
    }
  };

  // Provides the title for the current step
  const getStepTitle = () => {
    const titles = [
      "Personal Information",
      "Emergency Contacts",
      "Medical History",
      "Current Health Status",
      "Care Preferences",
      "Insurance Information",
      "Consent & Privacy",
    ];
    return titles[currentStep - 1];
  };

  // Provides the description for the current step
  const getStepDescription = () => {
    const descriptions = [
      "Help us get to know you better",
      "Who should we contact in emergencies?",
      "Tell us about your medical background",
      "Current medications and health status",
      "Your healthcare preferences and needs",
      "Insurance and billing information",
      "Privacy settings and data sharing consent",
    ];
    return descriptions[currentStep - 1];
  };

  // If form is submitted, show the success screen
  if (currentStep > TOTAL_STEPS) {
    return <SuccessDisplay />;
  }

  // Main JSX for the form
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden text-white">
      {/* Background and decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-[800px] h-[800px] bg-green-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-teal-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating icons */}
      <div className="absolute inset-0 pointer-events-none">
        <Heart className="absolute top-20 left-10 w-4 h-4 text-emerald-400/20 animate-bounce" />
        <Activity className="absolute top-40 right-16 w-5 h-5 text-green-400/20 animate-pulse" />
        <Shield className="absolute bottom-40 left-8 w-4 h-4 text-teal-400/20 animate-bounce delay-1000" />
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-full border border-emerald-500/30 backdrop-blur-sm mb-4">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-emerald-400 font-medium text-sm">
              Digital Health Setup
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            {getStepTitle()}
          </h1>
          <p className="text-gray-300 text-base mb-6">{getStepDescription()}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-3">
            <span className="text-emerald-400 font-semibold">
              Step {currentStep} of {TOTAL_STEPS}
            </span>
            <span className="text-gray-400 text-sm">
              {Math.round((currentStep / TOTAL_STEPS) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-green-600 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form */}
        <FormProvider {...methods}>
          <form className="space-y-6">
            <div className="min-h-[400px] w-full">{renderStep()}</div>

            {formError && (
              <div className="max-w-4xl mx-auto p-4 bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-xl backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                  <span className="text-red-300 font-medium">{formError}</span>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-700/50">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 1 || isLoading}
                className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-700/60 to-slate-700/60 text-white font-medium rounded-xl border border-gray-600/50 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed hover:from-gray-600/60 hover:to-slate-600/60 transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={isLoading}
                className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 px-8 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:from-emerald-600 hover:to-green-700 transform hover:scale-105"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <span>
                      {currentStep === TOTAL_STEPS
                        ? "Complete Setup"
                        : "Continue"}
                    </span>
                    {currentStep === TOTAL_STEPS ? (
                      <CheckCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    ) : (
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    )}
                  </>
                )}
              </button>
            </div>
          </form>
        </FormProvider>

        {/* Footer */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="text-gray-300 text-sm">Secure & Encrypted</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span className="text-gray-300 text-sm">HIPAA Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
