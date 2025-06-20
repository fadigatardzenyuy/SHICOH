"use client";
import { useFormContext } from "react-hook-form";
import { FormSelect } from "../FormSelect";
import { Heart, Activity, AlertCircle } from "lucide-react";

export const Step4_CurrentHealth = () => {
  const { register } = useFormContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header with icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-full border border-green-500/30 backdrop-blur-sm mb-4">
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
            <span className="text-green-400 font-semibold text-sm sm:text-base">
              Step 4 of 7
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent mb-3">
            Current Health Status
          </h3>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
            Tell us about your current health condition and any ongoing
            treatments
          </p>
        </div>

        {/* Form Container */}
        <div className="space-y-6 sm:space-y-8">
          <div>
            <label
              htmlFor="current_medications"
              className="flex items-center gap-2 text-sm font-medium text-green-400 mb-3"
            >
              <Activity className="w-4 h-4" />
              Current Medications
            </label>
            <textarea
              id="current_medications"
              {...register("current_medications")}
              placeholder="List all medications you are currently taking, including dosage and frequency"
              rows={4}
              className="block w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 text-white placeholder-gray-400 transition-all duration-200"
            />
          </div>

          <FormSelect
            name="common_allergies"
            label="Common Allergies"
            register={register}
            options={[
              { value: "penicillin", label: "Penicillin" },
              { value: "aspirin", label: "Aspirin" },
              { value: "sulfa_drugs", label: "Sulfa Drugs" },
              { value: "peanuts", label: "Peanuts" },
              { value: "shellfish", label: "Shellfish" },
              { value: "dairy", label: "Dairy" },
              { value: "eggs", label: "Eggs" },
              { value: "latex", label: "Latex" },
              { value: "pollen", label: "Pollen" },
              { value: "dust", label: "Dust" },
              { value: "pet_dander", label: "Pet Dander" },
              { value: "other", label: "Other" },
            ]}
            placeholder="Select common allergies"
            className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-rose-500 focus:ring-rose-500/20 text-sm sm:text-base"
          />

          <div>
            <label
              htmlFor="other_allergies"
              className="flex items-center gap-2 text-sm font-medium text-rose-400 mb-3"
            >
              <AlertCircle className="w-4 h-4" />
              Other Allergies (if selected)
            </label>
            <input
              type="text"
              id="other_allergies"
              {...register("other_allergies")}
              placeholder="Specify other allergies"
              className="block w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-white placeholder-gray-400 transition-all duration-200"
            />
          </div>

          <FormSelect
            name="common_symptoms"
            label="Common Symptoms"
            register={register}
            options={[
              { value: "fever", label: "Fever" },
              { value: "cough", label: "Cough" },
              { value: "headache", label: "Headache" },
              { value: "fatigue", label: "Fatigue" },
              { value: "nausea", label: "Nausea" },
              { value: "dizziness", label: "Dizziness" },
              { value: "chest_pain", label: "Chest Pain" },
              { value: "shortness_of_breath", label: "Shortness of Breath" },
              { value: "muscle_pain", label: "Muscle Pain" },
              { value: "joint_pain", label: "Joint Pain" },
              { value: "rash", label: "Rash" },
              { value: "abdominal_pain", label: "Abdominal Pain" },
              { value: "other", label: "Other" },
            ]}
            placeholder="Select common symptoms"
            className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-rose-500 focus:ring-rose-500/20 text-sm sm:text-base"
          />

          <div>
            <label
              htmlFor="other_symptoms"
              className="flex items-center gap-2 text-sm font-medium text-rose-400 mb-3"
            >
              <AlertCircle className="w-4 h-4" />
              Other Symptoms (if selected)
            </label>
            <input
              type="text"
              id="other_symptoms"
              {...register("other_symptoms")}
              placeholder="Specify other symptoms"
              className="block w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-white placeholder-gray-400 transition-all duration-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
