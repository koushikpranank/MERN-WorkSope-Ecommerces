import React from "react";
import UserNavBar from "../../components/UserNavBar";
import UserFooter from "../../components/UserFooter";
const Profile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-violet-900">
      <UserNavBar />

      <div className="max-w-4xl mx-auto px-6 py-12 flex justify-center">
        {/* Glassmorphism Profile Card */}
        <div className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col items-center text-center text-white transition-all duration-300 hover:-translate-y-1">
          {/* Avatar Area */}
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-teal-400 to-green-400 flex items-center justify-center mb-6 shadow-lg border-4 border-white/20">
            <span className="text-5xl font-bold text-gray-900">K</span>
          </div>

          {/* User Header */}
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
            Koushik Eslavath
          </h1>
          <p className="text-gray-300 text-lg mb-8">student@example.com</p>

          {/* Profile Details Grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-10">
            <div className="bg-white/5 p-5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
              <p className="text-sm text-teal-300 font-semibold mb-1">
                Phone Number
              </p>
              <p className="text-white text-lg">+91 98765 43210</p>
            </div>
            <div className="bg-white/5 p-5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
              <p className="text-sm text-teal-300 font-semibold mb-1">
                Shipping Address
              </p>
              <p className="text-white text-lg">Vijayawada, Andhra Pradesh</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-gradient-to-r from-teal-400 to-green-400 hover:from-teal-500 hover:to-green-500 text-gray-900 font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:scale-105 cursor-pointer">
              Edit Profile
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-full shadow-lg border border-white/20 transition-transform hover:scale-105 cursor-pointer">
              Order History
            </button>
          </div>
        </div>
      </div>
      <UserFooter />
    </div>
  );
};

export default Profile;
