import React from "react";
import { Calendar, MapPin, Package, DollarSign, Copyright } from "lucide-react";

const Footer = () => {
  return (
    <div className="flex-col justify-around p-6 sm:p-10 md:p-15 lg:p-20 bg-[#1E293B]">
      <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-12 mb-8">
        <div className="flex-1 max-w-md">
          <h2 className="text-white text-xl sm:text-2xl font-bold mb-3">
            TripMate
          </h2>
          <p className="text-white text-sm sm:text-base pt-3 mb-6 sm:mb-10">
            Your personal travel companion to plan, explore, and experience the
            perfect journey around the world.
          </p>
          <div className="flex gap-3 sm:gap-4">
            <div className="h-10 w-10 rounded-full bg-[#2e3f5b] hover:bg-[#3d5170] transition cursor-pointer"></div>
            <div className="h-10 w-10 rounded-full bg-[#2e3f5b] hover:bg-[#3d5170] transition cursor-pointer"></div>
            <div className="h-10 w-10 rounded-full bg-[#2e3f5b] hover:bg-[#3d5170] transition cursor-pointer"></div>
            <div className="h-10 w-10 rounded-full bg-[#2e3f5b] hover:bg-[#3d5170] transition cursor-pointer"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 flex-1">
          <div>
            <h4 className="text-white text-base sm:text-lg mb-6">Features</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Calendar
                  color="#ffffff"
                  className="inline-block h-4 w-4 sm:h-5 sm:w-5"
                />
                <span className="text-[#8d9db8] text-sm sm:text-base ml-2 hover:text-white transition cursor-pointer">
                  Itinerary Planner
                </span>
              </div>
              <div className="flex items-center">
                <MapPin
                  color="#ffffff"
                  className="inline-block h-4 w-4 sm:h-5 sm:w-5"
                />
                <span className="text-[#8d9db8] text-sm sm:text-base ml-2 hover:text-white transition cursor-pointer">
                  World Map
                </span>
              </div>
              <div className="flex items-center">
                <Package
                  color="#ffffff"
                  className="inline-block h-4 w-4 sm:h-5 sm:w-5"
                />
                <span className="text-[#8d9db8] text-sm sm:text-base ml-2 hover:text-white transition cursor-pointer">
                  Packing Assistant
                </span>
              </div>
              <div className="flex items-center">
                <DollarSign
                  color="#ffffff"
                  className="inline-block h-4 w-4 sm:h-5 sm:w-5"
                />
                <span className="text-[#8d9db8] text-sm sm:text-base ml-2 hover:text-white transition cursor-pointer">
                  Expense Tracker
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white text-base sm:text-lg mb-6">Company</h4>
            <ul className="space-y-3">
              <li className="text-[#8d9db8] text-sm sm:text-base hover:text-white transition cursor-pointer">
                About Us
              </li>
              <li className="text-[#8d9db8] text-sm sm:text-base hover:text-white transition cursor-pointer">
                Careers
              </li>
              <li className="text-[#8d9db8] text-sm sm:text-base hover:text-white transition cursor-pointer">
                Blog
              </li>
              <li className="text-[#8d9db8] text-sm sm:text-base hover:text-white transition cursor-pointer">
                Press
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-base sm:text-lg mb-6">Support</h4>
            <ul className="space-y-3">
              <li className="text-[#8d9db8] text-sm sm:text-base hover:text-white transition cursor-pointer">
                Help Center
              </li>
              <li className="text-[#8d9db8] text-sm sm:text-base hover:text-white transition cursor-pointer">
                Contact Us
              </li>
              <li className="text-[#8d9db8] text-sm sm:text-base hover:text-white transition cursor-pointer">
                Privacy Policy
              </li>
              <li className="text-[#8d9db8] text-sm sm:text-base hover:text-white transition cursor-pointer">
                Terms of Service
              </li>
            </ul>
          </div>
        </div>
      </div>

      <hr className="border-[#4a5870] my-6" />

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-[#8d9db8] text-xs sm:text-sm flex items-center">
          <Copyright className="inline-block h-3 w-3 sm:h-4 sm:w-4 mr-1" /> 2025
          TripMate. All rights reserved.
        </p>
        <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6">
          <p className="text-[#8d9db8] text-xs sm:text-sm hover:text-white transition cursor-pointer">
            Privacy Policy
          </p>
          <p className="text-[#8d9db8] text-xs sm:text-sm hover:text-white transition cursor-pointer">
            Terms of Service
          </p>
          <p className="text-[#8d9db8] text-xs sm:text-sm hover:text-white transition cursor-pointer">
            Cookie Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
