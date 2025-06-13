import React from "react";
import { Heart, Shield, Activity } from "lucide-react";

interface InfoCardsProps {
  userData: any;
}

const InfoCards: React.FC<InfoCardsProps> = ({ userData }) => {
  const cards = [
    {
      icon: Heart,
      title: "Emergency Contact",
      value: userData.emergency_contact?.name || "Not specified",
      subValue: userData.emergency_contact?.phone || "No phone",
      color: "from-red-500 to-pink-600",
    },
    {
      icon: Shield,
      title: "Insurance",
      value: userData.insurance_provider || "Not specified",
      subValue: "Active Coverage",
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: Activity,
      title: "Allergies",
      value: userData.allergies_text || "None specified",
      subValue: "Important Alerts",
      color: "from-purple-500 to-violet-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => {
        // FIX: Assign the component to a capitalized variable
        const Icon = card.icon;
        return (
          <div
            key={index}
            className="bg-gradient-to-br from-gray-800/60 to-slate-800/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover:border-emerald-500/50 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <div
                className={`w-12 h-12 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center shadow-lg`}
              >
                {/* FIX: Render the capitalized variable */}
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">{card.title}</h3>
                <p className="text-gray-400 text-sm">{card.subValue}</p>
              </div>
            </div>
            <p className="text-gray-200 text-sm font-medium truncate">
              {card.value}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default InfoCards;
