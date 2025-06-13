import React from "react";
import Link from "next/link";
import { User, BookOpen } from "lucide-react";

interface UserProfileCardProps {
  userData: any;
  clerkUser: any; // Using `any` to match original code, consider defining a type.
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  userData,
  clerkUser,
}) => {
  return (
    <div className="relative bg-gradient-to-r from-gray-800/60 to-slate-800/60 backdrop-blur-xl rounded-3xl p-6 border border-gray-700/50 mb-8 shadow-2xl">
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex-shrink-0 -mt-12 sm:-mt-16 self-center sm:self-start">
          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center ring-4 ring-gray-800/80">
            {clerkUser?.imageUrl ? (
              <img
                src={clerkUser.imageUrl}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="w-12 h-12 text-white" />
            )}
          </div>
        </div>
        <div className="flex-1 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-1">{userData.full_name}</h2>
              <p className="text-gray-400">{userData.email}</p>
            </div>
            <Link href="/dashboard/book">
              <button className="w-full sm:w-auto mt-3 sm:mt-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 group">
                <BookOpen className="w-4 h-4 transition-transform group-hover:rotate-[-5deg]" />
                View Digibook
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-gray-700/50 rounded-xl p-3 text-center">
              <div className="text-lg font-bold text-emerald-400">
                {userData.blood_type || "N/A"}
              </div>
              <div className="text-xs text-gray-400">Blood Type</div>
            </div>
            <div className="bg-gray-700/50 rounded-xl p-3 text-center">
              <div className="text-lg font-bold text-green-400">
                {userData.existing_conditions?.length || 0}
              </div>
              <div className="text-xs text-gray-400">Conditions</div>
            </div>
            <div className="bg-gray-700/50 rounded-xl p-3 text-center">
              <div className="text-lg font-bold text-teal-400">24/7</div>
              <div className="text-xs text-gray-400">Support</div>
            </div>
            <div className="bg-gray-700/50 rounded-xl p-3 text-center">
              <div className="text-lg font-bold text-yellow-400">4.9</div>
              <div className="text-xs text-gray-400">Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
