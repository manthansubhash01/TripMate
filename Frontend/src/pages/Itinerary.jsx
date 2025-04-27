import React from "react";
import { useState, useEffect, useRef } from "react";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { Calculator, Calendar, Clock10, Gem, Import, MapPin, Pencil } from "lucide-react";



const Itinerary = () => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [result, setResult] = useState({});
  const [formData, setFormData] = useState(null);

  const { token } = useAuth();

    const originRef = useRef();
    const destinationRef = useRef();
    const startDateRef = useRef();
    const endDateRef = useRef();
    const descriptionRef = useRef();

    const handleSubmit = async (eve) => {
      eve.preventDefault();
      setLoading(true);
      const form = {
        origin: originRef.current.value,
        destination: destinationRef.current.value,
        startDate: startDateRef.current.value,
        endDate: endDateRef.current.value,
      };

      setFormData(form);
    };

    useEffect(() => {
      const fetchData = async () => {
        if (!formData) return; // don't run if formData is null

        setLoading(true);
        setErr("");
        setResult({});

        try {
          const response = await fetch(
            "http://localhost:7001/api/trip/itinerary",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(formData),
            }
          );

          const data = await response.json();
          setResult(data);

          if (!response.ok) {
            setErr(data.message);
            console.error("API Error:", data.message);
            return;
          }
          console.log(data);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, [formData, token]);
    
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
              {loading ? <p>Generating...</p> : <p>Generate Itinerary</p>}
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

      <div className="h-250 w-340 p-15 m-20 bg-[#eeeeee] rounded-xl overflow-y-auto">
        {loading ? (
          <h1>Generating Itinerary.....</h1>
        ) : (
          <ul>
            {Array.isArray(result.enrichedDays) ? (
              <div className="flex-col justify-center">
                <h1 className="text-5xl text-center mb-15 text-[#0F172A]">Your Itinerary</h1>
                {result.enrichedDays.map((dayObj, index) => (
                  <li key={index}>
                    <div className="flex justify-between mb-5 mt-5 rounded-2xl h-75 w-auto bg-[#ffffff] shadow-2xl">
                      <div
                        style={{
                          backgroundImage: `url('${dayObj.Destination.image}')`,
                        }}
                        className="h-full w-100 bg-cover bg-center rounded-bl-2xl rounded-tl-2xl "
                      >
                        <h1 className="h-10 w-10 m-4 flex items-center justify-center rounded-full text-[#ffffff] bg-[#0F172A]">
                          {dayObj.Day}
                        </h1>
                      </div>
                      <div className="flex-col w-225 p-10">
                        <div className="flex justify-between mb-7">
                          <div className="text-2xl font-bold">
                            {dayObj.Destination.Name}
                          </div>
                          <div className="text-sm">
                            <Clock10 className="inline-block h-5 mb-1 mr-1" />
                            {dayObj.Destination.BestTimeToVisit}
                          </div>
                        </div>
                        <div className="flex-col text-sm">
                          <div>
                            <span className="inline-block w-30 p-1 m-2 text-center bg-[#c5c5c5] rounded-lg">
                              <MapPin className="inline-block h-5 mb-1 mr-1" />
                              Address
                            </span>

                            {dayObj.Destination.Address}
                          </div>
                          <div>
                            <span className="inline-block w-30 p-1 m-2 text-center bg-[#c5c5c5] rounded-lg">
                              <Gem className="inline-block h-5 mb-1 mr-1" />
                              Speciality
                            </span>

                            {dayObj.Destination.Speciality}
                          </div>
                          <div>
                            <span className="inline-block w-30 p-1 m-2 text-center bg-[#c5c5c5] rounded-lg">
                              <Pencil className="inline-block h-5 mb-1 mr-1" />
                              Tips
                            </span>

                            {dayObj.Destination.TipsOrWarnings[0]}
                          </div>
                        </div>
                      </div>
                    </div>{" "}
                  </li>
                ))}
              </div>
            ) : (
              <p>No Itinerary Found.</p>
            )}
          </ul>
        )}
      </div>
      <div className="flex justify-center">
        <div className="h-175 w-250 m-20 p-10 flex-col bg-[#eeeeee] rounded-xl">
          {result ? (
            <p>Create New Itinerary</p>
          ) : (
            <div>
              <div className="flex justify-between p-10">
                <h1 className="text-5xl text-[#0F172A]">
                  {result.destination} Trip
                </h1>
                <div>
                  <button
                    className={`px-4 py-2  text-[#FFFFFF] m-2 col-span-2 rounded-lg transition-all duration-200 ${
                      loading
                        ? "bg-[#172341] cursor-not-allowed"
                        : "bg-[#0F172A] hover:bg-[#1E293B] active:scale-95"
                    }`}
                  >
                    <Import className="inline-block h-5 mb-1 mr-1" /> Save
                    Itinerary
                  </button>
                </div>
              </div>
              <div
                style={{
                  backgroundImage: `url('${
                    result.enrichedDays
                      ? result.enrichedDays[0].Destination.image
                      : ""
                  }')`,
                }}
                className="bg-cover bg-center w-auto h-80"
              ></div>
              <div className="flex justify-around mb-15 mt-15">
                <div className="w-70 bg-[#ffffff] p-5 rounded-lg">
                  <h3>
                    <MapPin className="inline-block h-5 mb-1 mr-1" />{" "}
                    Destination
                  </h3>
                  <p className="text-[#738093] ml-8">
                    {result.destination ? result.destination : ""}
                  </p>
                </div>
                <div className="w-70 bg-[#ffffff] p-5 rounded-lg">
                  <h3>
                    <Calculator className="inline-block h-5 mb-1 mr-1" />
                    Start Date
                  </h3>
                  <p className="text-[#738093] ml-7">
                    {result.startDate ? result.startDate : ""}
                  </p>
                </div>
                <div className="w-70 bg-[#ffffff] p-5 rounded-lg">
                  <h3>
                    <Calculator className="inline-block h-5 mb-1 mr-1" /> End
                    Date
                  </h3>
                  <p className="text-[#738093] ml-8">
                    {result.endDate ? result.endDate : ""}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Itinerary;