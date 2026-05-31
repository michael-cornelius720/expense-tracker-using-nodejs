import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
  e.preventDefault();

  console.log("Login button clicked");

  try {
    const response = await API.post("/api/auth/login", {
      email,
      password
    });

    localStorage.setItem("token", response.data.token);
    navigate("/dashboard");

console.log("Token Saved");

  } catch (err) {
    console.log(err);
  }
};

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}


export default Login;