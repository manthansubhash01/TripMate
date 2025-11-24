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
        // Decode JWT to get user info
        if (token) {
          const payload = JSON.parse(atob(token.split(".")[1]));
          setUserInfo(payload);
        }

        // Fetch saved itineraries
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
    <div className="min-h-screen bg-[#F9FBFC]">
      <div className="px-20 py-10">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-5xl font-bold text-[#0F172A] mb-2">
              My Profile
            </h1>
            <p className="text-[#7F7F7F]">
              Manage your account and view your travel plans
            </p>
          </div>
          <button
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            className="px-6 py-3 bg-[#0F172A] text-white rounded-lg hover:bg-[#1E293B] transition-all duration-200 active:scale-95"
          >
            <Key className="inline-block h-5 mb-1 mr-2" />
            Change Password
          </button>
        </div>

        {/* Change Password Form */}
        {showPasswordForm && (
          <div className="bg-[#FFFFFF] rounded-2xl shadow-2xl p-10 mb-10">
            <h3 className="text-2xl font-bold text-[#0F172A] mb-6">
              Change Password
            </h3>
            <form onSubmit={handlePasswordChange} className="max-w-md">
              <div className="mb-4 relative">
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">
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
                  className="w-full px-4 py-2 pr-10 border border-[#a6a6a6] rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-10 text-[#7F7F7F]"
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-5" />
                  ) : (
                    <Eye className="h-5" />
                  )}
                </button>
              </div>
              <div className="mb-4 relative">
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">
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
                  className="w-full px-4 py-2 pr-10 border border-[#a6a6a6] rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                  placeholder="Enter new password"
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-10 text-[#7F7F7F]"
                >
                  {showNewPassword ? (
                    <EyeOff className="h-5" />
                  ) : (
                    <Eye className="h-5" />
                  )}
                </button>
              </div>
              <div className="mb-4 relative">
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">
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
                  className="w-full px-4 py-2 pr-10 border border-[#a6a6a6] rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-10 text-[#7F7F7F]"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5" />
                  ) : (
                    <Eye className="h-5" />
                  )}
                </button>
              </div>
              {passwordError && (
                <p className="text-red-500 text-sm mb-4">{passwordError}</p>
              )}
              {passwordSuccess && (
                <p className="text-green-500 text-sm mb-4">{passwordSuccess}</p>
              )}
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#0F172A] text-white rounded-lg hover:bg-[#1E293B] transition-all duration-200 active:scale-95"
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
                  className="px-6 py-2 bg-[#eeeeee] text-[#0F172A] rounded-lg hover:bg-[#d4d4d4] transition-all duration-200 active:scale-95"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* User Info Card */}
        <div className="bg-[#FFFFFF] rounded-2xl shadow-2xl p-10 mb-10">
          <div className="flex items-center mb-8">
            <div className="w-24 h-24 bg-[#0F172A] rounded-full flex items-center justify-center text-white text-3xl font-bold mr-6">
              {userInfo?.username?.charAt(0).toUpperCase() || "U"}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#0F172A]">
                {userInfo?.username || "User"}
              </h2>
              <p className="text-[#7F7F7F]">Traveler since 2024</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="bg-[#F9FBFC] p-5 rounded-lg">
              <User className="inline-block h-5 mb-1 mr-2 text-[#0F172A]" />
              <span className="font-semibold text-[#0F172A]">Username</span>
              <p className="text-[#7F7F7F] mt-2">
                {userInfo?.username || "N/A"}
              </p>
            </div>
            <div className="bg-[#F9FBFC] p-5 rounded-lg">
              <Mail className="inline-block h-5 mb-1 mr-2 text-[#0F172A]" />
              <span className="font-semibold text-[#0F172A]">Email</span>
              <p className="text-[#7F7F7F] mt-2">
                {userInfo?.email || "Not available"}
              </p>
            </div>
            <div className="bg-[#F9FBFC] p-5 rounded-lg">
              <Phone className="inline-block h-5 mb-1 mr-2 text-[#0F172A]" />
              <span className="font-semibold text-[#0F172A]">Phone</span>
              <p className="text-[#7F7F7F] mt-2">
                {userInfo?.phone || "Not available"}
              </p>
            </div>
          </div>
        </div>

        {/* Saved Itinerary Section */}
        <div className="bg-[#FFFFFF] rounded-2xl shadow-2xl p-10">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-6">
            <Luggage className="inline-block h-8 mb-1 mr-3" />
            My Travel Plans
          </h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          {itineraries.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">✈️</div>
              <p className="text-xl text-[#7F7F7F] mb-6">
                No saved itineraries yet
              </p>
              <button
                onClick={() => navigate("/itinerary")}
                className="px-6 py-3 bg-[#0F172A] text-white rounded-lg hover:bg-[#1E293B] transition-all duration-200 active:scale-95"
              >
                Create Your First Trip
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {itineraries.map((itin) => (
                <div
                  key={itin._id}
                  className="bg-[#F9FBFC] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {/* Trip Header */}
                  <div className="p-6 border-b border-[#e0e0e0]">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-[#0F172A] mb-2">
                          <MapPin className="inline-block h-6 mb-1 mr-2" />
                          {itin.destination}
                        </h3>
                        <div className="flex gap-6 text-[#7F7F7F]">
                          <div>
                            <Calendar className="inline-block h-4 mb-1 mr-1" />
                            <span className="text-sm">
                              {new Date(itin.startDate).toLocaleDateString()} -{" "}
                              {new Date(itin.endDate).toLocaleDateString()}
                            </span>
                          </div>
                          <div>
                            <Clock className="inline-block h-4 mb-1 mr-1" />
                            <span className="text-sm">
                              {itin.days} {itin.days === 1 ? "Day" : "Days"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteItinerary(itin._id)}
                        disabled={deleting === itin._id}
                        className={`px-4 py-2 text-white rounded-lg transition-all duration-200 ${
                          deleting === itin._id
                            ? "bg-red-300 cursor-not-allowed"
                            : "bg-red-500 hover:bg-red-600 active:scale-95"
                        }`}
                      >
                        <Trash2 className="inline-block h-4 mb-1 mr-1" />
                        {deleting === itin._id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>

                  {/* Daily Itinerary */}
                  <div className="p-6">
                    <h4 className="text-lg font-bold text-[#0F172A] mb-4">
                      Day-by-Day Plan
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {itin.enrichedDays?.map((day, index) => (
                        <div
                          key={index}
                          className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-all"
                        >
                          <div
                            style={{
                              backgroundImage: day.Destination?.image
                                ? `url('${day.Destination.image}')`
                                : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            }}
                            className="h-32 bg-cover bg-center relative"
                          >
                            <div className="absolute top-2 left-2 w-8 h-8 flex items-center justify-center rounded-full bg-[#0F172A] text-white font-bold text-sm">
                              {day.Day}
                            </div>
                          </div>
                          <div className="p-4">
                            <h5 className="font-bold text-[#0F172A] mb-1 truncate">
                              {day.Destination?.Name}
                            </h5>
                            <p className="text-xs text-[#7F7F7F] mb-1">
                              <Clock className="inline-block h-3 mb-0.5 mr-1" />
                              {day.Destination?.BestTimeToVisit}
                            </p>
                            <p className="text-xs text-[#7F7F7F] line-clamp-2">
                              {day.Destination?.Speciality}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Packing List */}
                    {itin.packingList && (
                      <div className="mt-6 bg-white p-4 rounded-lg">
                        <h5 className="font-bold text-[#0F172A] mb-3">
                          📦 Packing List
                        </h5>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {Object.entries(itin.packingList).map(
                            ([category, items]) => (
                              <div key={category}>
                                <h6 className="font-semibold text-[#0F172A] text-sm mb-1">
                                  {category}
                                </h6>
                                <ul className="text-xs text-[#7F7F7F] space-y-0.5">
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

export default Profile;
