import React from "react";
import { Calendar, Activity, Users, Building2 } from "lucide-react";

const QuickActions = () => {
  const actions = [
    { icon: Calendar, label: "Schedule" },
    { icon: Activity, label: "Records" },
    { icon: Users, label: "Doctors" },
    { icon: Building2, label: "Hospitals" },
  ];

  return (
    <div className="bg-gradient-to-r from-gray-800/60 to-slate-800/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
      <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {actions.map((action, index) => {
          // FIX: Assign the component to a capitalized variable
          const Icon = action.icon;
          return (
            <button
              key={index}
              className="flex flex-col items-center gap-2 p-4 bg-gray-700/50 hover:bg-emerald-600/20 rounded-xl transition-all duration-300 group hover:-translate-y-1"
            >
              {/* FIX: Render the capitalized variable */}
              <Icon className="w-6 h-6 text-emerald-400 group-hover:text-emerald-300" />
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
