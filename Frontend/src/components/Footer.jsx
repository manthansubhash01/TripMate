import React from "react";
import {
  Calendar,
  MapPin,
  Package,
  DollarSign,
  Copyright,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#1E293B] px-5 sm:px-8 md:px-12 lg:px-20 py-10 sm:py-14 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 md:gap-12 lg:gap-16 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <div className="lg:col-span-5 pb-4 md:pb-0">
            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              TripMate
            </h2>
            <p className="text-[#94a3b8] text-sm sm:text-base md:text-lg leading-relaxed mb-5 sm:mb-6 max-w-md">
              Your personal travel companion to plan, explore, and experience
              the perfect journey around the world.
            </p>
            <div className="flex gap-3">
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-[#334155] hover:bg-[#475569] active:scale-95 hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-center">
                <Facebook className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-[#334155] hover:bg-[#475569] active:scale-95 hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-center">
                <Twitter className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-[#334155] hover:bg-[#475569] active:scale-95 hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-center">
                <Instagram className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-[#334155] hover:bg-[#475569] active:scale-95 hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-center">
                <Linkedin className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 lg:col-span-7">
            <div>
              <h4 className="text-white text-base sm:text-lg md:text-xl font-semibold mb-4 sm:mb-5">
                Features
              </h4>
              <div className="space-y-3">
                <div className="flex items-start group cursor-pointer">
                  <Calendar className="h-4 w-4 text-[#94a3b8] group-hover:text-white transition-colors flex-shrink-0 mt-0.5" />
                  <span className="text-[#94a3b8] text-xs sm:text-sm md:text-base ml-2 group-hover:text-white transition-colors leading-tight">
                    Itinerary Planner
                  </span>
                </div>
                <div className="flex items-start group cursor-pointer">
                  <MapPin className="h-4 w-4 text-[#94a3b8] group-hover:text-white transition-colors flex-shrink-0 mt-0.5" />
                  <span className="text-[#94a3b8] text-xs sm:text-sm md:text-base ml-2 group-hover:text-white transition-colors leading-tight">
                    World Map
                  </span>
                </div>
                <div className="flex items-start group cursor-pointer">
                  <Package className="h-4 w-4 text-[#94a3b8] group-hover:text-white transition-colors flex-shrink-0 mt-0.5" />
                  <span className="text-[#94a3b8] text-xs sm:text-sm md:text-base ml-2 group-hover:text-white transition-colors leading-tight">
                    Packing Assistant
                  </span>
                </div>
                <div className="flex items-start group cursor-pointer">
                  <DollarSign className="h-4 w-4 text-[#94a3b8] group-hover:text-white transition-colors flex-shrink-0 mt-0.5" />
                  <span className="text-[#94a3b8] text-xs sm:text-sm md:text-base ml-2 group-hover:text-white transition-colors leading-tight">
                    Expense Tracker
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white text-base sm:text-lg md:text-xl font-semibold mb-4 sm:mb-5">
                Company
              </h4>
              <ul className="space-y-3">
                <li className="text-[#94a3b8] text-xs sm:text-sm md:text-base hover:text-white transition-colors cursor-pointer leading-tight">
                  About Us
                </li>
                <li className="text-[#94a3b8] text-xs sm:text-sm md:text-base hover:text-white transition-colors cursor-pointer leading-tight">
                  Careers
                </li>
                <li className="text-[#94a3b8] text-xs sm:text-sm md:text-base hover:text-white transition-colors cursor-pointer leading-tight">
                  Blog
                </li>
                <li className="text-[#94a3b8] text-xs sm:text-sm md:text-base hover:text-white transition-colors cursor-pointer leading-tight">
                  Press
                </li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-white text-base sm:text-lg md:text-xl font-semibold mb-4 sm:mb-5">
                Support
              </h4>
              <ul className="space-y-3">
                <li className="text-[#94a3b8] text-xs sm:text-sm md:text-base hover:text-white transition-colors cursor-pointer leading-tight">
                  Help Center
                </li>
                <li className="text-[#94a3b8] text-xs sm:text-sm md:text-base hover:text-white transition-colors cursor-pointer leading-tight">
                  Contact Us
                </li>
                <li className="text-[#94a3b8] text-xs sm:text-sm md:text-base hover:text-white transition-colors cursor-pointer leading-tight">
                  Privacy Policy
                </li>
                <li className="text-[#94a3b8] text-xs sm:text-sm md:text-base hover:text-white transition-colors cursor-pointer leading-tight">
                  Terms of Service
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-[#334155] my-6 sm:my-8"></div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
          <p className="text-[#94a3b8] text-xs sm:text-sm flex items-center order-2 sm:order-1">
            <Copyright className="inline-block h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-1.5" />
            2025 TripMate. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6 order-1 sm:order-2">
            <p className="text-[#94a3b8] text-xs sm:text-sm hover:text-white transition-colors cursor-pointer">
              Privacy
            </p>
            <p className="text-[#94a3b8] text-xs sm:text-sm hover:text-white transition-colors cursor-pointer">
              Terms
            </p>
            <p className="text-[#94a3b8] text-xs sm:text-sm hover:text-white transition-colors cursor-pointer">
              Cookies
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
