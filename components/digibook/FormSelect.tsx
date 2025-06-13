import React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps {
  name: string;
  label: string;
  register: any;
  error?: any;
  options: Option[];
  placeholder?: string;
  className?: string;
  icon?: React.ComponentType<any>;
}

export const FormSelect = ({
  name,
  label,
  register,
  error,
  options,
  placeholder = "Select an option",
  className,
  icon: Icon,
}: FormSelectProps) => {
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
        <select
          id={name}
          {...register(name)}
          className={cn(
            "block w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-white placeholder-gray-400 transition-all duration-200 text-sm sm:text-base appearance-none",
            error &&
              "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            Icon ? "pl-12" : "pl-4"
          )}
          {...className}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </div>
        {error && (
          <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          </div>
        )}
      </div>
      {error && <p className="text-sm text-red-400 mt-1">{error.message}</p>}
    </div>
  );
};
