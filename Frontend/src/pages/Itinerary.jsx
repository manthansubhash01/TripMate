import React from "react";
import { useState, useEffect, useRef } from "react";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import {
  Calculator,
  Calendar,
  Clock10,
  Gem,
  Import,
  MapPin,
  Pencil,
  Package,
  ShoppingBag,
} from "lucide-react";
import TripMateLoader from "../components/Loader";
import tripImage from "../assets/Globalization-bro.jpg";

const Itinerary = () => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");
  const [result, setResult] = useState({});
  const [formData, setFormData] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

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
      if (!formData) return;

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

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(
        "http://localhost:7001/api/trip/saveItinerary",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            destination: result.destination,
            startDate: result.startDate,
            endDate: result.endDate,
            enrichedDays: result.enrichedDays,
            packingList: result.packingList,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        showToast(data.message || "Failed to save itinerary", "error");
      } else {
        showToast("Itinerary saved successfully!", "success");
      }
    } catch (err) {
      console.log(err);
      showToast("Error saving itinerary", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FBFC]">
      {/* Hero Section with Form */}
      <div className="px-20 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
          {/* Left Side - Form */}
          <div className="flex flex-col justify-center">
            <h1 className="text-5xl font-bold text-[#0F172A] mb-4">
              Plan Your Dream Journey
            </h1>
            <p className="text-[#7F7F7F] text-lg mb-8">
              Create personalized itineraries with our intuitive planner. Get
              recommendations, organize activities, and craft the perfect travel
              experience.
            </p>
            <form
              onSubmit={handleSubmit}
              className="bg-[#FFFFFF] rounded-2xl shadow-xl p-8"
            >
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                    Origin
                  </label>
                  <input
                    type="text"
                    name="origin"
                    ref={originRef}
                    placeholder="Mumbai"
                    className="w-full px-4 py-3 bg-[#F9FBFC] border border-[#e0e0e0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F172A] focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                    Destination
                  </label>
                  <input
                    type="text"
                    name="destination"
                    ref={destinationRef}
                    placeholder="Paris"
                    className="w-full px-4 py-3 bg-[#F9FBFC] border border-[#e0e0e0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F172A] focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                    Start Date
                  </label>
                  <input
                    type="Date"
                    name="startDate"
                    ref={startDateRef}
                    className="w-full px-4 py-3 bg-[#F9FBFC] border border-[#e0e0e0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F172A] focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                    End Date
                  </label>
                  <input
                    type="Date"
                    name="endDate"
                    ref={endDateRef}
                    className="w-full px-4 py-3 bg-[#F9FBFC] border border-[#e0e0e0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F172A] focus:border-transparent transition"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                  Trip Description (Optional)
                </label>
                <textarea
                  placeholder="Describe your trip preferences..."
                  name="Trip Description"
                  ref={descriptionRef}
                  rows="4"
                  className="w-full px-4 py-3 bg-[#F9FBFC] border border-[#e0e0e0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F172A] focus:border-transparent transition resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full px-6 py-4 text-[#FFFFFF] rounded-lg font-semibold transition-all duration-200 ${
                  loading
                    ? "bg-[#172341] cursor-not-allowed"
                    : "bg-[#0F172A] hover:bg-[#1E293B] hover:shadow-lg active:scale-95"
                }`}
              >
                {loading
                  ? "Generating Your Itinerary..."
                  : "Generate Itinerary"}
              </button>
            </form>
          </div>

          {/* Right Side - Image */}
          <div className="flex items-center justify-center">
            <img
              src="https://images.pexels.com/photos/14131701/pexels-photo-14131701.jpeg"
              alt="Travel"
              className="w-full h-full max-h-150 object-cover rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Itinerary Results Section */}
      <div className="bg-[#FFFFFF] py-15">
        <div className="px-20">
          {loading ? (
            <TripMateLoader height={"h-screen"} />
          ) : Array.isArray(result.enrichedDays) ? (
            <div>
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-4xl font-bold text-[#0F172A]">
                  Your Personalized Itinerary
                </h2>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className={`px-6 py-3 text-[#FFFFFF] bg-[#0F172A] rounded-lg transition-all duration-200 shadow-lg ${
                    saving
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-[#1E293B] active:scale-95"
                  }`}
                >
                  <Import className="inline-block h-5 mb-1 mr-2" />
                  {saving ? "Saving..." : "Save Itinerary"}
                </button>
              </div>

              {/* Day-by-Day Cards */}
              <div className="space-y-6 mb-15">
                {result.enrichedDays.map((dayObj, index) => (
                  <div
                    key={index}
                    className="bg-[#F9FBFC] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Image Section */}
                      <div
                        style={{
                          backgroundImage: `url('${dayObj.Destination.image}')`,
                        }}
                        className="relative h-80 md:h-auto md:w-1/3 bg-cover bg-center"
                      >
                        <div className="absolute top-4 left-4 h-12 w-12 flex items-center justify-center rounded-full text-white bg-[#0F172A] font-bold text-lg shadow-lg">
                          {dayObj.Day}
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="flex-1 p-8">
                        <div className="flex justify-between items-start mb-6">
                          <h3 className="text-3xl font-bold text-[#0F172A]">
                            {dayObj.Destination.Name}
                          </h3>
                          <div className="flex items-center text-[#7F7F7F] bg-[#FFFFFF] px-4 py-2 rounded-lg">
                            <Clock10 className="h-5 w-5 mr-2" />
                            <span className="text-sm font-medium">
                              {dayObj.Destination.BestTimeToVisit}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="flex items-center justify-center w-10 h-10 bg-[#0F172A] rounded-lg mr-4 flex-shrink-0">
                              <MapPin className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[#0F172A] mb-1">
                                Address
                              </p>
                              <p className="text-[#7F7F7F]">
                                {dayObj.Destination.Address}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <div className="flex items-center justify-center w-10 h-10 bg-[#0F172A] rounded-lg mr-4 flex-shrink-0">
                              <Gem className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[#0F172A] mb-1">
                                Speciality
                              </p>
                              <p className="text-[#7F7F7F]">
                                {dayObj.Destination.Speciality}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <div className="flex items-center justify-center w-10 h-10 bg-[#0F172A] rounded-lg mr-4 flex-shrink-0">
                              <Pencil className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[#0F172A] mb-1">
                                Travel Tips
                              </p>
                              <p className="text-[#7F7F7F]">
                                {dayObj.Destination.TipsOrWarnings[0]}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trip Summary Card */}
              <div className="bg-[#F9FBFC] rounded-2xl overflow-hidden shadow-lg">
                <div
                  style={{
                    backgroundImage: `url('${
                      result.enrichedDays
                        ? result.enrichedDays[0].Destination.image
                        : ""
                    }')`,
                  }}
                  className="h-80 bg-cover bg-center relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-6 left-6">
                    <h2 className="text-4xl font-bold text-white mb-2">
                      {result.destination} Trip
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 p-8">
                  <div className="bg-[#FFFFFF] p-6 rounded-xl shadow-sm">
                    <div className="flex items-center mb-3">
                      <MapPin className="h-6 w-6 text-[#0F172A] mr-2" />
                      <h4 className="font-semibold text-[#0F172A]">
                        Destination
                      </h4>
                    </div>
                    <p className="text-[#7F7F7F] text-lg">
                      {result.destination || "N/A"}
                    </p>
                  </div>

                  <div className="bg-[#FFFFFF] p-6 rounded-xl shadow-sm">
                    <div className="flex items-center mb-3">
                      <Calendar className="h-6 w-6 text-[#0F172A] mr-2" />
                      <h4 className="font-semibold text-[#0F172A]">
                        Start Date
                      </h4>
                    </div>
                    <p className="text-[#7F7F7F] text-lg">
                      {result.startDate || "N/A"}
                    </p>
                  </div>

                  <div className="bg-[#FFFFFF] p-6 rounded-xl shadow-sm">
                    <div className="flex items-center mb-3">
                      <Calendar className="h-6 w-6 text-[#0F172A] mr-2" />
                      <h4 className="font-semibold text-[#0F172A]">End Date</h4>
                    </div>
                    <p className="text-[#7F7F7F] text-lg">
                      {result.endDate || "N/A"}
                    </p>
                    e
                  </div>
                </div>
              </div>

              {/* Packing Suggestions Section */}
              {result.packingList &&
                Object.keys(result.packingList).length > 0 && (
                  <div className="bg-[#FFFFFF] rounded-2xl shadow-lg p-8 mt-6">
                    <div className="flex items-center mb-6">
                      <div className="flex items-center justify-center w-12 h-12 bg-[#0F172A] rounded-lg mr-4">
                        <Package className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-[#0F172A]">
                          Packing Suggestions
                        </h2>
                        <p className="text-[#7F7F7F] text-sm">
                          Essential items for your {result.destination} trip
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {Object.entries(result.packingList).map(
                        ([category, items]) => (
                          <div
                            key={category}
                            className="bg-[#F9FBFC] rounded-xl p-5 hover:shadow-md transition-all duration-200"
                          >
                            <div className="flex items-center mb-4">
                              <div className="w-8 h-8 flex items-center justify-center bg-[#0F172A] rounded-lg mr-3">
                                <ShoppingBag className="h-4 w-4 text-white" />
                              </div>
                              <h3 className="font-bold text-[#0F172A] text-lg capitalize">
                                {category}
                              </h3>
                            </div>
                            <ul className="space-y-2">
                              {Array.isArray(items) ? (
                                items.map((item, idx) => (
                                  <li
                                    key={idx}
                                    className="text-[#7F7F7F] text-sm flex items-start"
                                  >
                                    <span className="text-[#0F172A] mr-2 font-bold">
                                      •
                                    </span>
                                    {item}
                                  </li>
                                ))
                              ) : (
                                <li className="text-[#7F7F7F] text-sm flex items-start">
                                  <span className="text-[#0F172A] mr-2 font-bold">
                                    •
                                  </span>
                                  {items}
                                </li>
                              )}
                            </ul>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <img src={tripImage} alt="No itinerary" className="h-80 mb-8" />
              <p className="text-xl text-[#7F7F7F]">
                Generate your itinerary to see results here
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`fixed bottom-6 right-6 px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 z-50 transition-all ${
            toast.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          <span className="text-lg">
            {toast.type === "success" ? "✓" : "✕"}
          </span>
          <span className="font-medium">{toast.message}</span>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Itinerary;
