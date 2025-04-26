import React from "react";
import { useState, useEffect, useRef } from "react";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";



const Itinerary = () => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const { token } = useAuth();

    const originRef = useRef();
    const destinationRef = useRef();
    const startDateRef = useRef();
    const endDateRef = useRef();
    const descriptionRef = useRef();

    const handleSubmit = async(eve) => {
      eve.preventDefault();
      setLoading(true);
      const form = {
        origin: originRef.current.value,
        destination: destinationRef.current.value,
        startDate: startDateRef.current.value,
        endDate: endDateRef.current.value,
      };

      try{
        const response = await fetch(
          "http://localhost:7001/api/trip/itinerary",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(form),
          }
        );
        
        const data = await response.json()

        if (! response.ok){
          setErr(data.message)
          console.error("API Error:", data.message);
          return;
        }
        console.log(data)
        ;
      }catch(err){
        console.error(err)
      }finally{
        setLoading(false)
      }
      
    }

  return (
    <div>
      <div className="grid grid-cols-2 m-20">
        <div className="m-2">
          <h1 className="text-5xl font-bold text-[#0F172A] mb-10">
            Plan Your Dream Journey
          </h1>
          <p>
            Create personalized itineraries with our intuitive planner. Get
            recommendations, organize activities, and craft the perfect travel
            experience.
          </p>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-2 gap-x-4 gap-y-2 palce-items-center pl-4 mt-10 mb-10 p-2 bg-[#eeeeee] border border-[#a6a6a6] rounded-lg shadow-2xl shadow-zinc-700"
          >
            <div className="m-2">
              <label className="m-1 text-sm">Origin</label>
              <input
                type="text"
                name="origin"
                ref={originRef}
                placeholder="Mumbai"
                className="w-70 px-4 py-2 bg-[#FFFFFF] border border-[#a6a6a6] rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
              ></input>
            </div>
            <div className="m-2">
              <label className="m-1 text-sm">Destination</label>
              <input
                type="text"
                name="destination"
                ref={destinationRef}
                placeholder="Paris"
                className="w-70 px-4 py-2 bg-[#FFFFFF] border border-[#a6a6a6] rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
              ></input>
            </div>
            <div className="m-2">
              <label className="m-1 text-sm">Start Date</label>
              <input
                type="Date"
                name="startDate"
                ref={startDateRef}
                className="w-70 px-4 py-2 bg-[#FFFFFF] border border-[#a6a6a6] rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
              ></input>
            </div>
            <div className="m-2">
              <label className="m-1 text-sm">End Date</label>
              <input
                type="Date"
                name="endDate"
                ref={endDateRef}
                className="w-70 px-4 py-2 bg-[#FFFFFF] border border-[#a6a6a6] rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
              ></input>
            </div>
            <div className="m-2 col-span-2">
              <label className="m-1 text-sm">Trip Description</label>
              <textarea
                placeholder="Describe your trip..."
                name="Trip Description"
                ref={descriptionRef}
                className="h-25 w-150 px-4 py-2 bg-[#FFFFFF] border border-[#a6a6a6] rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-150 px-4 py-2  text-[#FFFFFF] m-2 col-span-2 rounded-lg transition-all duration-200 ${
                loading
                  ? "bg-[#172341] cursor-not-allowed"
                  : "bg-[#0F172A] hover:bg-[#1E293B] active:scale-95"
              }`}
            >
              {loading ? "Generating..." : "Generate Itinerary"}
            </button>
          </form>
        </div>
        <div className="m-2 mt-20 flex justify-center align-baseline w-full h-full">
          <img
            src="https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            className="h-100 rounded-2xl shadow-2xl shadow-zinc-700"
          ></img>
        </div>
      </div>

      <div className="h-200 w-335 m-20 bg-[#eeeeee] rounded-xl"></div>
      <div className="flex justify-center">
        <div className="h-150 w-250 m-20 bg-[#eeeeee] rounded-xl"></div>
      </div>
      <Footer />
    </div>
  );
};

export default Itinerary;