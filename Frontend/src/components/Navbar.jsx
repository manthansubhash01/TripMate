import React from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate()

  const handleLogout = () => {
    logout();
    navigate("/login");
  }

  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center px-6 py-3 bg-[#FFFFFF] shadow-md">
      <div>
        {/* <img src="" alt="TripMate" className="text-black"></img> */}<h1>TripMate</h1>
      </div>
      <NavLink
        to="/"
        style={{
          marginRight: isAuthenticated ? "0px" : "1050px",
        }}
        className={({ isActive }) =>
          `px-4 py-2 rounded-full font-semibold transition ${
            isActive
              ? "bg-black text-white"
              : "text-[#000000] hover:text-black hover:bg-[#a6a6a6]"
          }`
        }
        // className="p-1 pr-2 pl-2 hover:text-[#FFFFFF] hover:bg-[#0F172A] transition duration-300 rounded-full"
      >
        Home
      </NavLink>
      {!isAuthenticated ? (
        <div>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md font-semibold transition ${
                isActive
                  ? "bg-black text-white"
                  : "border text-[#000000] hover:text-black hover:bg-[#a6a6a6]"
              }`
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              `m-4 px-4 py-2 rounded-md font-semibold transition ${
                isActive
                  ? "bg-black text-white"
                  : "border text-[#000000] hover:text-black hover:bg-[#a6a6a6]"
              }`
            }
          >
            Sign up
          </NavLink>
        </div>
      ) : (
        <>
          <NavLink
            to="/map"
            className={({ isActive }) =>
              `px-4 py-2 rounded-full font-semibold transition ${
                isActive
                  ? "bg-black text-white"
                  : "text-[#000000] hover:text-black hover:bg-[#a6a6a6]"
              }`
            }
            // className="p-1 pr-2 pl-2 hover:text-[#FFFFFF] hover:bg-[#0F172A] transition duration-300 rounded-full"
          >
            Map
          </NavLink>
          <NavLink
            to="/itinerary"
            className={({ isActive }) =>
              `px-4 py-2 rounded-full font-semibold transition ${
                isActive
                  ? "bg-black text-white"
                  : "text-[#000000] hover:text-black hover:bg-[#a6a6a6]"
              }`
            }
            // className="p-1 pr-2 pl-2 hover:text-[#FFFFFF] hover:bg-[#0F172A] transition duration-300 rounded-full"
          >
            Itinerary
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `px-4 py-2 rounded-full font-semibold transition ${
                isActive
                  ? "bg-black text-white"
                  : "text-[#000000] hover:text-black hover:bg-[#a6a6a6]"
              }`
            }
            // className="p-1 pr-2 pl-2 hover:text-[#FFFFFF] hover:bg-[#0F172A] transition duration-300 rounded-full"
          >
            Profile
          </NavLink>
          <button
            onClick={handleLogout}
            className="bg-[#0F172A] text-[#FFFFFF] px-4 py-1 rounded-lg  transition duration-300"
          >
            Logout
          </button>
        </>
      )}
    </nav>
  );
}

export default Navbar