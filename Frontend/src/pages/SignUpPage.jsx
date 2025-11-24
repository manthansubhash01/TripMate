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
    <div className="flex items-center justify-around min-h-screen bg-[#F9FBFC]">
      <div className="flex w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl bg-[#FFFFFF]">
        <div className="hidden md:block md:w-1/2">
          <img
            src="https://images.pexels.com/photos/16354153/pexels-photo-16354153/free-photo-of-a-sunset-on-the-beach-with-waves-and-sand.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load"
            alt=""
            className="object-cover h-140 brightness-70"
          ></img>
        </div>
        <div className="m-auto">
          <h2 className="text-3xl font-extrabold mb-1">Welcome back</h2>
          <p className="text-[#7F7F7F] mb-12">Login to continue your journey</p>
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
            <div className="mb-6 relative">
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
            <div className="mb-6 relative">
              <Mail
                color="#000000"
                className="inline-block absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
              />

              <input
                type="email"
                placeholder="Email"
                name="email"
                ref={emailRef}
                className="w-80 pl-10 px-4 py-2 border border-[#a6a6a6] rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
              ></input>
            </div>
            <div className="mb-10 relative">
              <Phone
                color="#000000"
                className="inline-block absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
              />
              <input
                type="tel"
                placeholder="Phone"
                name="phone"
                minLength={10}
                maxLength={10}
                ref={phoneRef}
                className="w-80 pl-10 px-4 py-2 border border-[#a6a6a6] rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
              ></input>
            </div>
            <button
              type="submit"
              className="w-full h-10 text-white bg-[#0F172A] mb-6 rounded-lg"
            >
              Sign Up
            </button>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {success && (
              <p className="text-green-500 text-center mb-4">{success}</p>
            )}
            <p className="text-[#7F7F7F] text-center">
              Already have an account ?{" "}
              <Link to="/login" className="text-[#0F172A]">
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
