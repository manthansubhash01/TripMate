import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, Menu, X } from "lucide-react";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-4 left-0 right-0 z-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 md:px-6">
          <NavLink to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-bold text-slate-900 shadow-md">
              TM
            </div>
            <span className="text-lg font-semibold tracking-tight text-white drop-shadow-md">
              TripMate
            </span>
          </NavLink>

          <div className="hidden flex-1 items-center justify-center lg:flex">
            <div className="flex items-center gap-4 xl:gap-6 rounded-full bg-white/95 px-6 xl:px-8 py-2 text-sm font-medium text-slate-600 shadow-xl backdrop-blur-md">
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

          <div className="hidden lg:flex items-center gap-3 text-sm font-semibold">
            {!isAuthenticated ? (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `text-white/80 transition hover:text-white ${
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

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex items-center justify-center h-10 w-10 rounded-full bg-white/95 text-slate-900 shadow-md transition hover:bg-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                TM
              </div>
              <span className="text-lg font-semibold text-slate-900">
                TripMate
              </span>
            </div>
            <button
              onClick={closeMobileMenu}
              className="p-2 rounded-full hover:bg-slate-100 transition"
            >
              <X className="h-5 w-5 text-slate-600" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-6 px-4">
            <nav className="flex flex-col gap-2">
              <NavLink
                to="/"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg font-medium transition ${
                    isActive
                      ? "bg-slate-900 text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`
                }
              >
                Home
              </NavLink>
              {isAuthenticated && (
                <>
                  <NavLink
                    to="/map"
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-lg font-medium transition ${
                        isActive
                          ? "bg-slate-900 text-white"
                          : "text-slate-700 hover:bg-slate-100"
                      }`
                    }
                  >
                    Map
                  </NavLink>
                  <NavLink
                    to="/itinerary"
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-lg font-medium transition ${
                        isActive
                          ? "bg-slate-900 text-white"
                          : "text-slate-700 hover:bg-slate-100"
                      }`
                    }
                  >
                    Itinerary
                  </NavLink>
                  <NavLink
                    to="/profile"
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-lg font-medium transition ${
                        isActive
                          ? "bg-slate-900 text-white"
                          : "text-slate-700 hover:bg-slate-100"
                      }`
                    }
                  >
                    Profile
                  </NavLink>
                  <NavLink
                    to="/expenses"
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-lg font-medium transition ${
                        isActive
                          ? "bg-slate-900 text-white"
                          : "text-slate-700 hover:bg-slate-100"
                      }`
                    }
                  >
                    Expenses
                  </NavLink>
                </>
              )}
            </nav>
          </div>

          <div className="border-t p-4">
            {!isAuthenticated ? (
              <div className="flex flex-col gap-2">
                <NavLink
                  to="/login"
                  onClick={closeMobileMenu}
                  className="px-4 py-2.5 text-center rounded-lg font-semibold text-slate-700 border border-slate-300 hover:bg-slate-50 transition"
                >
                  Log in
                </NavLink>
                <NavLink
                  to="/signup"
                  onClick={closeMobileMenu}
                  className="px-4 py-2.5 text-center rounded-lg font-semibold bg-emerald-400 text-slate-900 hover:bg-emerald-300 transition"
                >
                  Sign Up
                </NavLink>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold bg-slate-900 text-white hover:bg-slate-800 transition"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
