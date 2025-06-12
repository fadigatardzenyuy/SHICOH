"use client"
import { useFormContext } from "react-hook-form";
import { FormInput } from "../FormInput";
import { User, Phone, MapPin, Users } from "lucide-react";

export const Step1_Personal = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="w-full bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-[800px] h-[800px] bg-green-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-teal-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 w-full px-4 py-6 sm:px-6 lg:px-8">
        {/* Header with icon */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-full border border-emerald-500/30 backdrop-blur-sm mb-4">
            <User className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
            <span className="text-emerald-400 font-semibold text-sm sm:text-base">
              Step 1 of 7
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent mb-3">
            Personal Information
          </h3>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
            Let's start with your basic details to create your health profile
          </p>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-4xl mx-auto">
          {/* Personal Details Section */}
          <div className="space-y-6 sm:space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <FormInput
                name="full_name"
                label="Full Name"
                register={register}
                error={errors.full_name}
                placeholder="John Doe"
                className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500/20 text-sm sm:text-base"
              />
              <FormInput
                name="date_of_birth"
                label="Date of Birth"
                type="date"
                register={register}
                error={errors.date_of_birth}
                className="bg-gray-800/50 border-gray-600/50 text-white focus:border-emerald-500 focus:ring-emerald-500/20 text-sm sm:text-base"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <FormInput
                name="gender"
                label="Gender"
                register={register}
                error={errors.gender}
                placeholder="e.g., Male, Female, Prefer not to say"
                className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500/20 text-sm sm:text-base"
              />
              <FormInput
                name="phone_number"
                label="Phone Number"
                type="tel"
                register={register}
                error={errors.phone_number}
                placeholder="e.g., +237 123 456 789"
                className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500/20 text-sm sm:text-base"
              />
            </div>

            <FormInput
              name="home_address"
              label="Home Address"
              register={register}
              error={errors.home_address}
              placeholder="Street, City, Region, Cameroon"
              className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500/20 text-sm sm:text-base"
            />
          </div>

          {/* Next of Kin Section */}
          <div className="mt-8 sm:mt-12 bg-gradient-to-r from-emerald-900/20 to-green-900/20 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-emerald-500/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-lg sm:text-xl font-semibold text-white">
                Next of Kin
              </h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <FormInput
                name="next_of_kin_name"
                label="Name"
                register={register}
                error={errors.next_of_kin_name}
                placeholder="Full name of next of kin"
                className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500/20 text-sm sm:text-base"
              />
              <FormInput
                name="next_of_kin_relationship"
                label="Relationship"
                register={register}
                error={errors.next_of_kin_relationship}
                placeholder="e.g., Spouse, Parent, Sibling"
                className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500/20 text-sm sm:text-base"
              />
              <FormInput
                name="next_of_kin_phone"
                label="Phone"
                type="tel"
                register={register}
                error={errors.next_of_kin_phone}
                placeholder="e.g., +237 123 456 789"
                className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500/20 text-sm sm:text-base"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
