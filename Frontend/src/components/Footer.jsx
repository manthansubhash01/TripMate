import React from "react";
import { Calendar, MapPin, Plane, Hotel, Copyright } from "lucide-react";

const Footer = () => {
  return (
    <div className="flex-col justify-around p-15 bg-[#1E293B] ">
      <div className="h-70 flex justify-between">
        <div>
          <img className="text-white" src="" alt="TripMate"></img>
          <p className="text-white pt-3 mb-10">
            Your personal travel companion <br /> to plan, explore, and
            experience the <br />
            perfect journey around the world.
          </p>
          <div className="flex justify-between w-60">
            <div className="h-10 w-10 rounded-full bg-[#2e3f5b]"></div>
            <div className="h-10 w-10 rounded-full bg-[#2e3f5b]"></div>
            <div className="h-10 w-10 rounded-full bg-[#2e3f5b]"></div>
            <div className="h-10 w-10 rounded-full bg-[#2e3f5b]"></div>
          </div>
        </div>
        <div>
          <h4 className="text-white text-lg pt-3 mb-10">Feature</h4>
          <div className="mt-3 mb-3">
            <Calendar color="#ffffff" className="inline-block" />
            <span className="text-[#8d9db8] ml-2">Itinerary Planner</span>
          </div>
          <div className="mt-3 mb-3">
            <MapPin color="#ffffff" className="inline-block" />
            <span className="text-[#8d9db8] ml-2">World Map</span>
          </div>
          <div className="mt-3 mb-3">
            <Plane color="#ffffff" className="inline-block" />
            <span className="text-[#8d9db8] ml-2">Flight Finder</span>
          </div>
          <div className="mt-3 mb-3">
            <Hotel color="#ffffff" className="inline-block" />
            <span className="text-[#8d9db8] ml-2">Hotel Suggestions</span>
          </div>
        </div>
        <div>
          <h4 className="text-white text-lg pt-3 mb-10">Company</h4>
          <ul>
            <li className="text-[#8d9db8] mt-3 mb-3">About Us</li>
            <li className="text-[#8d9db8] mt-3 mb-3">Careers</li>
            <li className="text-[#8d9db8] mt-3 mb-3">Blog</li>
            <li className="text-[#8d9db8] mt-3 mb-3">Press</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white text-lg pt-3 mb-10">Support</h4>
          <ul>
            <li className="text-[#8d9db8] mt-3 mb-3">Help Center</li>
            <li className="text-[#8d9db8] mt-3 mb-3">Contact Us</li>
            <li className="text-[#8d9db8] mt-3 mb-3">Privacy Policy</li>
            <li className="text-[#8d9db8] mt-3 mb-3">Terms of Service</li>
          </ul>
        </div>
      </div>
      <hr className="text-[#4a5870] " />
      <div className="h-15 flex justify-between">
        <p className="text-[#8d9db8] mt-7 mb-7">
          <Copyright className="inline-block h-4 mb-1" /> 2025 TripMate. All rights reserved.
        </p>
        <div className="w-100 flex justify-between">
          <p className="text-[#8d9db8] mt-7 mb-7">Privacy Policy</p>
          <p className="text-[#8d9db8] mt-7 mb-7">Terms of Service</p>
          <p className="text-[#8d9db8] mt-7 mb-7">Cookie Policy</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
