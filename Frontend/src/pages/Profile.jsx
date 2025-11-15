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
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import TripMateLoader from "../components/Loader";

const Profile = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState("");
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

        // Fetch saved itinerary
        const response = await fetch(
          "http://localhost:7001/api/trip/getItinerary",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setItinerary(data.userItinerary);
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
        "http://localhost:7001/api/auth/changePassword",
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

          {!itinerary ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">✈️</div>
              <p className="text-xl text-[#7F7F7F] mb-6">
                No saved itinerary yet
              </p>
              <button
                onClick={() => navigate("/itinerary")}
                className="px-6 py-3 bg-[#0F172A] text-white rounded-lg hover:bg-[#1E293B] transition-all duration-200 active:scale-95"
              >
                Create Your First Trip
              </button>
            </div>
          ) : (
            <div>
              {/* Trip Overview */}
              <div className="bg-[#F9FBFC] p-6 rounded-lg mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-[#0F172A] mb-4">
                      <MapPin className="inline-block h-6 mb-1 mr-2" />
                      {itinerary.destination}
                    </h3>
                    <div className="flex gap-8">
                      <div>
                        <Calendar className="inline-block h-5 mb-1 mr-2 text-[#7F7F7F]" />
                        <span className="text-[#7F7F7F]">
                          {itinerary.days}{" "}
                          {itinerary.days === 1 ? "Day" : "Days"}
                        </span>
                      </div>
                      <div>
                        <Clock className="inline-block h-5 mb-1 mr-2 text-[#7F7F7F]" />
                        <span className="text-[#7F7F7F]">
                          {itinerary.enrichedDays?.length || 0} Activities
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate("/itinerary")}
                    className="px-6 py-3 bg-[#0F172A] text-white rounded-lg hover:bg-[#1E293B] transition-all duration-200 active:scale-95"
                  >
                    Edit Trip
                  </button>
                </div>
              </div>

              {/* Daily Itinerary */}
              <div className="mb-6">
                <h4 className="text-xl font-bold text-[#0F172A] mb-4">
                  Day-by-Day Plan
                </h4>
                <div className="space-y-4">
                  {itinerary.enrichedDays?.map((day, index) => (
                    <div
                      key={index}
                      className="flex bg-[#F9FBFC] rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200"
                    >
                      <div
                        style={{
                          backgroundImage: `url('${day.Destination?.image}')`,
                        }}
                        className="w-40 h-40 bg-cover bg-center flex-shrink-0"
                      >
                        <div className="w-10 h-10 m-3 flex items-center justify-center rounded-full bg-[#0F172A] text-white font-bold">
                          {day.Day}
                        </div>
                      </div>
                      <div className="p-6 flex-1">
                        <h5 className="text-lg font-bold text-[#0F172A] mb-2">
                          {day.Destination?.Name}
                        </h5>
                        <p className="text-sm text-[#7F7F7F] mb-2">
                          <Clock className="inline-block h-4 mb-1 mr-1" />
                          {day.Destination?.BestTimeToVisit}
                        </p>
                        <p className="text-sm text-[#7F7F7F]">
                          {day.Destination?.Speciality}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Packing List */}
              {itinerary.packingList && (
                <div className="bg-[#F9FBFC] p-6 rounded-lg">
                  <h4 className="text-xl font-bold text-[#0F172A] mb-4">
                    📦 Packing List
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(itinerary.packingList).map(
                      ([category, items]) => (
                        <div key={category}>
                          <h5 className="font-semibold text-[#0F172A] mb-2">
                            {category}
                          </h5>
                          <ul className="list-disc list-inside text-sm text-[#7F7F7F]">
                            {Array.isArray(items) ? (
                              items.map((item, idx) => (
                                <li key={idx}>{item}</li>
                              ))
                            ) : (
                              <li>{items}</li>
                            )}
                          </ul>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
