import React from "react";
import {
  CheckCircle,
  Heart,
  Activity,
  Shield,
  Zap,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
// import { cn } from "../lib/utils";

// Enhanced FormInput Component
// @ts-ignore
export const FormInput = ({
  // @ts-ignore
  name,
  label,
  register,
  error,
  type = "text",
  icon: Icon,
  placeholder,
  className,
  ...props
}: any) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-emerald-400"
      >
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          type={type}
          id={name}
          placeholder={placeholder}
          {...register(name)}
          className={cn(
            "block w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-white placeholder-gray-400 transition-all duration-200 text-sm sm:text-base",
            error &&
              "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            Icon ? "pl-12" : "pl-4"
          )}
          {...props}
        />
        {error && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          </div>
        )}

        {/* Focus glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-emerald-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none"></div>
      </div>
      {error && <p className="text-sm text-red-400 mt-1">{error.message}</p>}
    </div>
  );
};
