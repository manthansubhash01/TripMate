import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const {login} = useAuth();

  const [error, setError] = useState("");

  const usernameRef = useRef();
  const passwordRef = useRef();

  const handelClick = () => {
    setFormData({
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    });
  };

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

      const data = await response.json()

      if(!response.ok){
        setError(data.message)
      }

      const token = data.token
      login(token)


    } catch (err) {
        console.log(err)
        setError("Server error, please try again")
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
          <button onClick={handelClick}>Login</button>
          {error && <p>{error}</p>}
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
