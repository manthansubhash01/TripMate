import { useRef, useState } from "react";
import { Link } from "react-router-dom";

function SignUpPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
  });

  const [error, setError] = useState("");

  const usernameRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();

  const handelClick = () => {
    setFormData({
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
    });
  };

  const handelSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("url", {
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
    } catch (err) {
      console.log(err);
      setError("Server error, please try again");
    }
  };

  return (
    <div>
      <div>
        <img alt=""></img>
      </div>
      <div>
        <form onSubmit={handelSubmit}>
          <div>
            <label>Username : </label>
            <input
              type="text"
              placeholder="user_name"
              name="username"
              ref={usernameRef}
            ></input>
          </div>
          <div>
            <label>Password : </label>
            <input
              type="password"
              placeholder="user@123"
              name="password"
              minLength={6}
              maxLength={12}
              ref={passwordRef}
            ></input>
          </div>
          <div>
            <label>Email : </label>
            <input
              type="email"
              placeholder="abc123@gmail.com"
              name="email"
              ref={emailRef}
            ></input>
          </div>
          <div>
            <label>Phone : </label>
            <input
              type="tel"
              placeholder="913XXXXX45"
              name="phone"
              minLength={10}
              maxLength={10}
              ref={phoneRef}
            ></input>
          </div>
          <button onClick={handelClick}>Sign Up</button>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
