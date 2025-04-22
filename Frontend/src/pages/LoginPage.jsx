import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CircleUserRound, LockKeyhole } from "lucide-react";
import { Navigate } from "react-router-dom";
 
function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const usernameRef = useRef();
  const passwordRef = useRef();

  const handelClick = () => {
    setFormData({
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    });
  };

  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const handelSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:7001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
      }

      const token = data.token;
      const result = login(token);
      if (!result.success) {
        setError("You cannot log in with the same token again.");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      setError("Server error, please try again");
    }
  };

  return (
    <div className="flex items-center justify-around min-h-screen bg-[#F9FBFC]">
      <div className="flex w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl bg-[#FFFFFF]">
        <div className="hidden md:block md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e"
            alt=""
            className="object-cover h-140 brightness-70"
          ></img>
        </div>
        <div className="m-auto">
          <h2 className="text-3xl font-extrabold mb-1">Welcome back</h2>
          <p className="text-[#7F7F7F] mb-15">Login to continue your journey</p>
          <form onSubmit={handelSubmit}>
            <div className="mb-6 relative">
              <CircleUserRound
                color="#000000"
                className="inline-block absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
              />
              <input
                type="text"
                placeholder="Username"
                name="username"
                ref={usernameRef}
                className="w-80 pl-10 px-4 py-2 border border-[#a6a6a6] rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
              ></input>
            </div>
            <div className="mb-10 relative">
              <LockKeyhole
                color="#000000"
                className="inline-block absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
              />

              <input
                type="password"
                placeholder="Password"
                name="password"
                minLength={6}
                maxLength={12}
                ref={passwordRef}
                className="w-80 pl-10 px-4 py-2 border border-[#a6a6a6] rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
              ></input>
            </div>
            <button
              onClick={handelClick}
              className="w-full h-10 text-white bg-[#0F172A] mb-6 rounded-lg"
            >
              Login
            </button>
            {error && <p>{error}</p>}
            <p className="text-[#7F7F7F] text-center">
              Don't have an account ?{" "}
              <Link to="/signup" className="text-[#0F172A]">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
