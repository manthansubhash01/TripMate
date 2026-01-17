import { useRef, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CircleUserRound, LockKeyhole } from "lucide-react";

function LoginPage() {
  const [error, setError] = useState("");

  const usernameRef = useRef();
  const passwordRef = useRef();

  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const handelSubmit = async (event) => {
    event.preventDefault();

    const username = usernameRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    if (!username || !password) {
      setError("Both fields are required.");
      return;
    }

    try {
      const response = await fetch(
        "https://tripmate-bgz6.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      const token = data.token;
      console.log(token);
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

  const handleUseTestCredentials = () => {
    if (usernameRef.current && passwordRef.current) {
      usernameRef.current.value = "test_user";
      passwordRef.current.value = "test1234";
      setError("");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source
          src="https://cdn.pixabay.com/video/2020/12/01/57993-487499986_large.mp4"
          type="video/mp4"
        />
      </video>

      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />

      <div className="relative z-10 flex w-full max-w-5xl rounded-2xl overflow-hidden bg-white shadow-2xl">
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
              type="submit"
              className="w-full h-10 text-white bg-[#0F172A] mb-3 rounded-lg"
            >
              Login
            </button>
            {error && <p className="mb-2 text-center text-red-500">{error}</p>}

            <button
              type="button"
              onClick={handleUseTestCredentials}
              className="mb-4 w-full rounded-lg border border-[#0F172A] px-4 py-2 text-sm font-semibold text-[#0F172A] hover:bg-[#0F172A] hover:text-white transition-colors"
            >
              Use test credentials
            </button>

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
