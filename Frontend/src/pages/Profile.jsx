import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Luggage,
  Key,
  Eye,
  EyeOff,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import TripMateLoader from "../components/Loader";

const Profile = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [itineraries, setItineraries] = useState([]);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (token) {
          const payload = JSON.parse(atob(token.split(".")[1]));
          setUserInfo(payload);
        }

        const response = await fetch(
          "https://tripmate-bgz6.onrender.com/api/trip/getItinerary",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setItineraries(data.itineraries || []);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      setPasswordError("All fields are required");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "https://tripmate-bgz6.onrender.com/api/auth/changePassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPassword: passwordData.currentPassword,
            newPassword: passwordData.newPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setPasswordError(data.message);
        return;
      }

      setPasswordSuccess("Password changed successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setTimeout(() => {
        setShowPasswordForm(false);
        setPasswordSuccess("");
      }, 2000);
    } catch (err) {
      console.error(err);
      setPasswordError("Server error, please try again");
    }
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleDeleteItinerary = async (id) => {
    if (!confirm("Are you sure you want to delete this itinerary?")) {
      return;
    }

    setDeleting(id);
    try {
      const response = await fetch(
        `https://tripmate-bgz6.onrender.com/api/trip/deleteItinerary/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setItineraries(itineraries.filter((itin) => itin._id !== id));
        showToast("Itinerary deleted successfully!", "success");
      } else {
        const data = await response.json();
        showToast(data.message || "Failed to delete itinerary", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Error deleting itinerary", "error");
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return <TripMateLoader height={"h-screen"} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <div
        className="relative overflow-hidden py-16 sm:py-20 md:py-24"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/34840013/pexels-photo-34840013.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative px-4 sm:px-8 md:px-12 lg:px-20">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                My Profile
              </h1>
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl">
                Manage your account and view your travel plans
              </p>
            </div>
            <button
              onClick={() => setShowPasswordForm(!showPasswordForm)}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 bg-white text-[#0F172A] font-semibold rounded-full hover:bg-slate-100 transition-all duration-200 active:scale-95 shadow-xl text-sm sm:text-base"
            >
              <Key className="h-5 w-5 mr-2" />
              Change Password
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 md:px-12 lg:px-20 py-8 sm:py-12 md:py-16 bg-[#F9FBFC]">
        {showPasswordForm && (
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 mb-8 sm:mb-10 border border-slate-100">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-6 sm:mb-8">
              Change Password
            </h3>
            <form onSubmit={handlePasswordChange} className="max-w-lg">
              <div className="mb-5 relative">
                <label className="block text-xs sm:text-sm font-semibold uppercase tracking-wide text-slate-600 mb-2">
                  Current Password
                </label>
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-11 text-sm text-slate-800 outline-none transition focus:border-transparent focus:ring-2 focus:ring-slate-900/80"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-9 sm:top-9 text-slate-500 hover:text-slate-700 transition"
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : (
                    <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                </button>
              </div>
              <div className="mb-5 relative">
                <label className="block text-xs sm:text-sm font-semibold uppercase tracking-wide text-slate-600 mb-2">
                  New Password
                </label>
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-11 text-sm text-slate-800 outline-none transition focus:border-transparent focus:ring-2 focus:ring-slate-900/80"
                  placeholder="Enter new password"
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-9 sm:top-9 text-slate-500 hover:text-slate-700 transition"
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : (
                    <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                </button>
              </div>
              <div className="mb-5 relative">
                <label className="block text-xs sm:text-sm font-semibold uppercase tracking-wide text-slate-600 mb-2">
                  Confirm New Password
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-11 text-sm text-slate-800 outline-none transition focus:border-transparent focus:ring-2 focus:ring-slate-900/80"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-9 sm:top-9 text-slate-500 hover:text-slate-700 transition"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : (
                    <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                </button>
              </div>
              {passwordError && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm mb-5">
                  {passwordError}
                </div>
              )}
              {passwordSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-xl text-sm mb-5">
                  {passwordSuccess}
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-[#0F172A] text-white font-semibold rounded-full hover:bg-slate-900 transition-all duration-200 active:scale-95 shadow-xl"
                >
                  Update Password
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordForm(false);
                    setPasswordData({
                      currentPassword: "",
                      newPassword: "",
                      confirmPassword: "",
                    });
                    setPasswordError("");
                    setPasswordSuccess("");
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-slate-100 text-[#0F172A] font-semibold rounded-full hover:bg-slate-200 transition-all duration-200 active:scale-95"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 mb-8 sm:mb-10 border border-slate-100">
          <div className="flex flex-col sm:flex-row items-center sm:items-start mb-8 sm:mb-10">
            <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-br from-[#0F172A] to-[#334155] rounded-2xl flex items-center justify-center text-white text-3xl sm:text-4xl font-bold mb-4 sm:mb-0 sm:mr-8 shadow-xl">
              {userInfo?.username?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-2">
                {userInfo?.username || "User"}
              </h2>
              <p className="text-sm sm:text-base text-slate-500">
                Traveler since 2024
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-xl border border-slate-200 hover:shadow-lg transition-all duration-200">
              <User className="h-6 w-6 text-[#0F172A] mb-3" />
              <span className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-2">
                Username
              </span>
              <p className="text-[#0F172A] font-medium text-lg">
                {userInfo?.username || "N/A"}
              </p>
            </div>
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-xl border border-slate-200 hover:shadow-lg transition-all duration-200">
              <Mail className="h-6 w-6 text-[#0F172A] mb-3" />
              <span className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-2">
                Email
              </span>
              <p className="text-[#0F172A] font-medium text-lg break-all">
                {userInfo?.email || "Not available"}
              </p>
            </div>
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-xl border border-slate-200 hover:shadow-lg transition-all duration-200">
              <Phone className="h-6 w-6 text-[#0F172A] mb-3" />
              <span className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-2">
                Phone
              </span>
              <p className="text-[#0F172A] font-medium text-lg">
                {userInfo?.phone || "Not available"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 border border-slate-100">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F172A] mb-8">
            <Luggage className="inline-block h-7 sm:h-8 md:h-9 mb-1 mr-3" />
            My Travel Plans
          </h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          {itineraries.length === 0 ? (
            <div className="text-center py-16 sm:py-20">
              <Luggage className="h-20 w-20 sm:h-24 sm:w-24 mx-auto mb-6 text-slate-400" />
              <p className="text-xl sm:text-2xl text-slate-600 mb-8">
                No saved itineraries yet
              </p>
              <button
                onClick={() => navigate("/itinerary")}
                className="inline-flex items-center justify-center px-8 py-3.5 bg-[#0F172A] text-white font-semibold rounded-full hover:bg-slate-900 transition-all duration-200 active:scale-95 shadow-xl"
              >
                Create Your First Trip
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:gap-8">
              {itineraries.map((itin) => (
                <div
                  key={itin._id}
                  className="bg-gradient-to-br from-white to-slate-50 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-200"
                >
                  <div className="p-6 sm:p-8 border-b border-slate-200 bg-white/50">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                      <div className="flex-1">
                        <h3 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-3">
                          <MapPin className="inline-block h-6 sm:h-7 mb-1 mr-2" />
                          {itin.destination}
                        </h3>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-slate-600">
                          <div>
                            <Calendar className="inline-block h-4 mb-0.5 mr-1.5" />
                            <span className="text-sm font-medium">
                              {new Date(itin.startDate).toLocaleDateString()} -{" "}
                              {new Date(itin.endDate).toLocaleDateString()}
                            </span>
                          </div>
                          <div>
                            <Clock className="inline-block h-4 mb-0.5 mr-1.5" />
                            <span className="text-sm font-medium">
                              {itin.days} {itin.days === 1 ? "Day" : "Days"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteItinerary(itin._id)}
                        disabled={deleting === itin._id}
                        className={`w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 text-white font-semibold rounded-full transition-all duration-200 shadow-lg ${
                          deleting === itin._id
                            ? "bg-red-300 cursor-not-allowed"
                            : "bg-red-500 hover:bg-red-600 active:scale-95"
                        }`}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        {deleting === itin._id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8">
                    <h4 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-6">
                      Day-by-Day Plan
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                      {itin.enrichedDays?.map((day, index) => (
                        <div
                          key={index}
                          className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200"
                        >
                          <div
                            style={{
                              backgroundImage: day.Destination?.image
                                ? `url('${day.Destination.image}')`
                                : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            }}
                            className="h-40 sm:h-44 bg-cover bg-center relative"
                          >
                            <div className="absolute top-3 left-3 w-10 h-10 flex items-center justify-center rounded-xl bg-[#0F172A] text-white font-bold shadow-lg">
                              {day.Day}
                            </div>
                          </div>
                          <div className="p-5">
                            <h5 className="font-bold text-[#0F172A] text-lg mb-2 truncate">
                              {day.Destination?.Name}
                            </h5>
                            <p className="text-sm text-slate-600 mb-2 flex items-center">
                              <Clock className="inline-block h-3.5 w-3.5 mr-1.5" />
                              {day.Destination?.BestTimeToVisit}
                            </p>
                            <p className="text-sm text-slate-500 line-clamp-2">
                              {day.Destination?.Speciality}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {itin.packingList && (
                      <div className="mt-6 bg-gradient-to-br from-slate-50 to-white p-6 rounded-xl border border-slate-200">
                        <h5 className="font-bold text-[#0F172A] text-lg mb-4 flex items-center">
                          <Package className="h-5 w-5 mr-2" />
                          Packing List
                        </h5>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                          {Object.entries(itin.packingList).map(
                            ([category, items]) => (
                              <div key={category}>
                                <h6 className="font-semibold text-[#0F172A] text-sm mb-2">
                                  {category}
                                </h6>
                                <ul className="text-sm text-slate-600 space-y-1">
                                  {Array.isArray(items) ? (
                                    items
                                      .slice(0, 3)
                                      .map((item, idx) => (
                                        <li key={idx}>• {item}</li>
                                      ))
                                  ) : (
                                    <li>• {items}</li>
                                  )}
                                  {Array.isArray(items) && items.length > 3 && (
                                    <li className="text-[#0F172A] font-semibold">
                                      +{items.length - 3} more
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
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {toast.show && (
        <div
          className={`fixed bottom-6 right-6 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-50 transition-all backdrop-blur-lg ${
            toast.type === "success"
              ? "bg-green-500/90 text-white"
              : "bg-red-500/90 text-white"
          }`}
        >
          <span className="font-semibold">{toast.message}</span>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Profile;
