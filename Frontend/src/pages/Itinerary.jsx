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
import { motion } from "motion/react";

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

  // Calculate date restrictions: today to 1 year from today
  const today = new Date();
  const minDate = today.toISOString().split("T")[0];
  const maxDate = new Date(today.setFullYear(today.getFullYear() + 1))
    .toISOString()
    .split("T")[0];

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
          "https://tripmate-bgz6.onrender.com/api/trip/itinerary",
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
        "https://tripmate-bgz6.onrender.com/api/trip/saveItinerary",
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

  const text = "Plan Your Dream Journey";

  return (
    <div className="min-h-screen bg-[#F9FBFC]">
      <div className="relative w-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source
            src="https://cdn.pixabay.com/video/2025/01/19/253436_large.mp4"
            type="video/mp4"
          />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-5 sm:px-8 md:px-12 pt-20 sm:pt-24 md:pt-28 pb-10 sm:pb-16 md:pb-20">
          <div className="mb-4 sm:mb-5 rounded-full bg-white/90 backdrop-blur-sm px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-700 shadow-lg">
            Travel More, Worry Less
          </div>

          <motion.h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white flex flex-wrap justify-center">
            {text.split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05, // typing speed
                  ease: "easeOut",
                }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: "easeOut",
            }}
            className="mt-4 sm:mt-5 max-w-2xl text-center text-sm sm:text-base md:text-lg text-slate-100 leading-relaxed px-4"
          >
            Create personalized itineraries with our intuitive planner. Get
            recommendations, organize activities, and craft the perfect travel
            experience.
          </motion.p>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{
              duration: 1.5,
              delay: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ transformOrigin: "50% 50%" }}
            className="mt-8 sm:mt-12 md:mt-16 w-full rounded-xl sm:rounded-2xl bg-white/95 p-5 sm:p-7 md:p-8 shadow-2xl backdrop-blur-md"
          >
            <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
              <div className="md:col-span-1">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Origin
                </label>
                <input
                  type="text"
                  name="origin"
                  ref={originRef}
                  placeholder="Mumbai"
                  required
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-transparent focus:ring-2 focus:ring-slate-900/80"
                />
              </div>

              <div className="md:col-span-1">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Destination
                </label>
                <input
                  type="text"
                  name="destination"
                  ref={destinationRef}
                  placeholder="Paris"
                  required
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-transparent focus:ring-2 focus:ring-slate-900/80"
                />
              </div>

              <div className="md:col-span-1">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Start Date
                </label>
                <input
                  type="Date"
                  name="startDate"
                  ref={startDateRef}
                  min={minDate}
                  max={maxDate}
                  required
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-transparent focus:ring-2 focus:ring-slate-900/80"
                />
              </div>

              <div className="md:col-span-1">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-600">
                  End Date
                </label>
                <input
                  type="Date"
                  name="endDate"
                  ref={endDateRef}
                  min={minDate}
                  max={maxDate}
                  required
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-transparent focus:ring-2 focus:ring-slate-900/80"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-center md:justify-end">
              <button
                type="submit"
                disabled={loading}
                className={`w-full md:w-auto inline-flex items-center justify-center rounded-full px-7 sm:px-9 py-3 text-sm sm:text-base font-semibold text-white shadow-xl transition-all duration-200 ${
                  loading
                    ? "bg-slate-900/70 cursor-not-allowed"
                    : "bg-[#0F172A] hover:bg-slate-900 hover:shadow-2xl active:scale-95"
                }`}
              >
                {loading
                  ? "Generating Your Itinerary..."
                  : "Generate Itinerary"}
              </button>
            </div>
          </motion.form>
        </div>
      </div>

      <div className="bg-[#FFFFFF] py-8 sm:py-12 md:py-16">
        <div className="px-5 sm:px-8 md:px-12 lg:px-20">
          {loading ? (
            <TripMateLoader height={"h-screen"} />
          ) : Array.isArray(result.enrichedDays) ? (
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F172A]">
                  Your Personalized Itinerary
                </h2>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className={`w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 text-[#FFFFFF] bg-[#0F172A] rounded-lg transition-all duration-200 shadow-lg text-sm font-medium ${
                    saving
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-[#1E293B] active:scale-95"
                  }`}
                >
                  <Import className="inline-block h-4 sm:h-5 mb-0.5 mr-2" />
                  {saving ? "Saving..." : "Save Itinerary"}
                </button>
              </div>

              <div className="space-y-5 sm:space-y-6 mb-8 sm:mb-10 md:mb-12">
                {result.enrichedDays.map((dayObj, index) => (
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      y: 40,
                      scale: 0.95,
                      filter: "blur(8px)",
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      filter: "blur(0px)",
                    }}
                    transition={{
                      duration: 0.7,
                      delay: 0.2 + index * 0.08,
                      ease: "easeOut",
                    }}
                    whileHover={{
                      y: -8,
                      scale: 1.02,
                      boxShadow: "0 25px 80px rgba(15,23,42,0.28)",
                    }}
                    className="bg-[#F9FBFC] rounded-xl sm:rounded-2xl overflow-hidden shadow-lg transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div
                        style={{
                          backgroundImage: `url('${dayObj.Destination.image}')`,
                        }}
                        className="relative h-48 sm:h-64 md:h-auto md:w-1/3 bg-cover bg-center"
                      >
                        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center rounded-full text-white bg-[#0F172A] font-bold text-base sm:text-lg shadow-lg">
                          {dayObj.Day}
                        </div>
                      </div>

                      <div className="flex-1 p-5 sm:p-6 md:p-8">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-0 mb-5 sm:mb-6">
                          <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A]">
                            {dayObj.Destination.Name}
                          </h3>
                          <div className="flex items-center text-[#7F7F7F] bg-[#FFFFFF] px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg">
                            <Clock10 className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                            <span className="text-xs sm:text-sm font-medium">
                              {dayObj.Destination.BestTimeToVisit}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-3 sm:space-y-4">
                          <div className="flex items-start">
                            <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-[#0F172A] rounded-lg mr-3 sm:mr-4 flex-shrink-0">
                              <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                            </div>
                            <div>
                              <p className="text-xs sm:text-sm font-semibold text-[#0F172A] mb-1">
                                Address
                              </p>
                              <p className="text-sm sm:text-base text-[#7F7F7F]">
                                {dayObj.Destination.Address}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-[#0F172A] rounded-lg mr-3 sm:mr-4 flex-shrink-0">
                              <Gem className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                            </div>
                            <div>
                              <p className="text-xs sm:text-sm font-semibold text-[#0F172A] mb-1">
                                Speciality
                              </p>
                              <p className="text-sm sm:text-base text-[#7F7F7F]">
                                {dayObj.Destination.Speciality}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-[#0F172A] rounded-lg mr-3 sm:mr-4 flex-shrink-0">
                              <Pencil className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                            </div>
                            <div>
                              <p className="text-xs sm:text-sm font-semibold text-[#0F172A] mb-1">
                                Travel Tips
                              </p>
                              <p className="text-sm sm:text-base text-[#7F7F7F]">
                                {dayObj.Destination.TipsOrWarnings[0]}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                className="bg-[#F9FBFC] rounded-xl sm:rounded-2xl overflow-hidden shadow-lg"
              >
                <div
                  style={{
                    backgroundImage: `url('${
                      result.enrichedDays
                        ? result.enrichedDays[0].Destination.image
                        : ""
                    }')`,
                  }}
                  className="h-48 sm:h-64 md:h-80 bg-cover bg-center relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                      {result.destination} Trip
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-5 sm:p-6 md:p-8">
                  <div className="bg-[#FFFFFF] p-4 sm:p-6 rounded-xl shadow-sm">
                    <div className="flex items-center mb-3">
                      <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-[#0F172A] mr-2" />
                      <h4 className="font-semibold text-sm sm:text-base text-[#0F172A]">
                        Destination
                      </h4>
                    </div>
                    <p className="text-[#7F7F7F] text-base sm:text-lg">
                      {result.destination || "N/A"}
                    </p>
                  </div>

                  <div className="bg-[#FFFFFF] p-4 sm:p-6 rounded-xl shadow-sm">
                    <div className="flex items-center mb-3">
                      <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-[#0F172A] mr-2" />
                      <h4 className="font-semibold text-sm sm:text-base text-[#0F172A]">
                        Start Date
                      </h4>
                    </div>
                    <p className="text-[#7F7F7F] text-base sm:text-lg">
                      {result.startDate || "N/A"}
                    </p>
                  </div>

                  <div className="bg-[#FFFFFF] p-4 sm:p-6 rounded-xl shadow-sm">
                    <div className="flex items-center mb-3">
                      <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-[#0F172A] mr-2" />
                      <h4 className="font-semibold text-sm sm:text-base text-[#0F172A]">
                        End Date
                      </h4>
                    </div>
                    <p className="text-[#7F7F7F] text-base sm:text-lg">
                      {result.endDate || "N/A"}
                    </p>
                  </div>
                </div>
              </motion.div>

              {result.packingList &&
                Object.keys(result.packingList).length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
                    className="bg-[#FFFFFF] rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-6 md:p-8 mt-5 sm:mt-6"
                  >
                    <div className="flex items-start sm:items-center mb-5 sm:mb-6">
                      <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-[#0F172A] rounded-lg mr-3 sm:mr-4 flex-shrink-0">
                        <Package className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A]">
                          Packing Suggestions
                        </h2>
                        <p className="text-[#7F7F7F] text-xs sm:text-sm">
                          Essential items for your {result.destination} trip
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                      {Object.entries(result.packingList).map(
                        ([category, items]) => (
                          <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{
                              duration: 0.6,
                              delay: 0.5,
                              ease: "easeOut",
                            }}
                            whileHover={{
                              y: -6,
                              scale: 1.02,
                              boxShadow: "0 18px 50px rgba(15,23,42,0.22)",
                            }}
                            className="bg-[#F9FBFC] rounded-xl p-5 transition-all duration-200"
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
                          </motion.div>
                        )
                      )}
                    </div>
                  </motion.div>
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
