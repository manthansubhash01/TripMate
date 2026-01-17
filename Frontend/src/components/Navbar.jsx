import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-4 left-0 right-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 md:px-6">
        {/* Logo + brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-bold text-slate-900 shadow-md">
            TM
          </div>
          <span className="text-lg font-semibold tracking-tight text-white drop-shadow-md">
            TripMate
          </span>
        </div>

        {/* Centered nav pill */}
        <div className="hidden flex-1 items-center justify-center md:flex">
          <div className="flex items-center gap-6 rounded-full bg-white/95 px-8 py-2 text-sm font-medium text-slate-600 shadow-xl backdrop-blur-md">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-1 rounded-full transition ${
                  isActive
                    ? "bg-slate-900 text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`
              }
            >
              Home
            </NavLink>
            {isAuthenticated && (
              <>
                <NavLink
                  to="/map"
                  className={({ isActive }) =>
                    `px-3 py-1 rounded-full transition ${
                      isActive
                        ? "bg-slate-900 text-white shadow-md"
                        : "text-slate-600 hover:text-slate-900"
                    }`
                  }
                >
                  Map
                </NavLink>
                <NavLink
                  to="/itinerary"
                  className={({ isActive }) =>
                    `px-3 py-1 rounded-full transition ${
                      isActive
                        ? "bg-slate-900 text-white shadow-md"
                        : "text-slate-600 hover:text-slate-900"
                    }`
                  }
                >
                  Itinerary
                </NavLink>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `px-3 py-1 rounded-full transition ${
                      isActive
                        ? "bg-slate-900 text-white shadow-md"
                        : "text-slate-600 hover:text-slate-900"
                    }`
                  }
                >
                  Profile
                </NavLink>
                <NavLink
                  to="/expenses"
                  className={({ isActive }) =>
                    `px-3 py-1 rounded-full transition ${
                      isActive
                        ? "bg-slate-900 text-white shadow-md"
                        : "text-slate-600 hover:text-slate-900"
                    }`
                  }
                >
                  Expenses
                </NavLink>
              </>
            )}
          </div>
        </div>

        {/* Auth buttons */}
        <div className="flex items-center gap-3 text-sm font-semibold">
          {!isAuthenticated ? (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `hidden text-white/80 transition hover:text-white md:inline ${
                    isActive ? "text-white" : ""
                  }`
                }
              >
                Log in
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `inline-flex items-center rounded-full bg-emerald-400 px-4 py-1.5 text-sm font-semibold text-slate-900 shadow-md transition hover:bg-emerald-300 ${
                    isActive ? "ring-2 ring-emerald-200" : ""
                  }`
                }
              >
                Sign Up
              </NavLink>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-slate-900 shadow-md transition hover:bg-slate-100"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
