import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await API.post("/api/auth/signup", {
        name,
        email,
        password,
      });

      alert("Account created successfully!");

      navigate("/");
    } catch (err) {
      console.log(err.response?.data);
      alert("Signup failed");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">

        <h1>Expense Tracker</h1>
        <h3>Create Your Account</h3>

        <form onSubmit={handleSignup}>

          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">
            Sign Up
          </button>

        </form>

        <p>
          Already have an account?{" "}
          <Link to="/">Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;