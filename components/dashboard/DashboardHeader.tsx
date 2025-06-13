import React from "react";

interface DashboardHeaderProps {
  coverImage: string;
  userName?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  coverImage,
  userName,
}) => {
  return (
    <div className="relative h-48 sm:h-64 rounded-3xl mb-[-3rem] sm:mb-[-4rem] overflow-hidden group shadow-lg">
      <img
        src={coverImage}
        alt="Healthcare background"
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
      <div className="absolute bottom-6 left-6 right-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 drop-shadow-lg">
          Welcome back, {userName || "User"}!
        </h1>
        <p className="text-emerald-100 drop-shadow-sm">
          Your health is our priority.
        </p>
      </div>
    </div>
  );
};

export default DashboardHeader;
