import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CircleUserRound, LockKeyhole, Mail, Phone } from "lucide-react";

function SignUpPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const usernameRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();

  const navigate = useNavigate();

  const handelSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const username = usernameRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const phone = phoneRef.current.value.trim();

    if (!username || !password || !email || !phone) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await fetch(
        "https://tripmate-bgz6.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password, email, phone }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.log(err);
      setError("Server error, please try again");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden p-4">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source
          src="https://cdn.pixabay.com/video/2022/11/22/140111-774507949_large.mp4"
          type="video/mp4"
        />
      </video>

      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />

      <div className="relative z-10 flex flex-col md:flex-row w-full max-w-5xl rounded-2xl overflow-hidden bg-white shadow-2xl">
        <div className="hidden md:block md:w-1/2">
          <img
            src="https://images.pexels.com/photos/16354153/pexels-photo-16354153/free-photo-of-a-sunset-on-the-beach-with-waves-and-sand.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load"
            alt="Beach sunset"
            className="object-cover h-full w-full brightness-70"
          />
        </div>
        <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">
            Create an account
          </h2>
          <p className="text-[#7F7F7F] text-sm sm:text-base mb-8 sm:mb-10 md:mb-12">
            Join TripMate and start planning
          </p>
          <form onSubmit={handelSubmit}>
            <div className="mb-4 sm:mb-5 md:mb-6 relative">
              <CircleUserRound
                color="#000000"
                className="inline-block absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5"
              />
              <input
                type="text"
                placeholder="Username"
                name="username"
                ref={usernameRef}
                className="w-full pl-9 sm:pl-10 px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-[#a6a6a6] rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
            <div className="mb-4 sm:mb-5 md:mb-6 relative">
              <LockKeyhole
                color="#000000"
                className="inline-block absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5"
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                minLength={6}
                maxLength={12}
                ref={passwordRef}
                className="w-full pl-9 sm:pl-10 px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-[#a6a6a6] rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
            <div className="mb-4 sm:mb-5 md:mb-6 relative">
              <Mail
                color="#000000"
                className="inline-block absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5"
              />

              <input
                type="email"
                placeholder="Email"
                name="email"
                ref={emailRef}
                className="w-full pl-9 sm:pl-10 px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-[#a6a6a6] rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
            <div className="mb-6 sm:mb-8 md:mb-10 relative">
              <Phone
                color="#000000"
                className="inline-block absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5"
              />
              <input
                type="tel"
                placeholder="Phone"
                name="phone"
                minLength={10}
                maxLength={10}
                ref={phoneRef}
                className="w-full pl-9 sm:pl-10 px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-[#a6a6a6] rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
            <button
              type="submit"
              className="w-full h-10 sm:h-11 text-sm sm:text-base text-white bg-[#0F172A] mb-4 sm:mb-6 rounded-lg hover:bg-[#1E293B] transition-colors active:scale-95"
            >
              Sign Up
            </button>
            {error && (
              <p className="text-red-500 text-xs sm:text-sm text-center mb-4">
                {error}
              </p>
            )}
            {success && (
              <p className="text-green-500 text-xs sm:text-sm text-center mb-4">
                {success}
              </p>
            )}
            <p className="text-[#7F7F7F] text-xs sm:text-sm text-center">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#0F172A] font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
