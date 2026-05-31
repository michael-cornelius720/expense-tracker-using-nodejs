import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);

      navigate("/dashboard");
    } catch (err) {
      console.log(err.response?.data);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">

        <h1>Expense Tracker</h1>
        <h3>Welcome Back</h3>

        <form onSubmit={handleLogin}>

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
            Login
          </button>

        </form>

        <p>
          Don't have an account?{" "}
          <Link to="/signup">Sign Up</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;