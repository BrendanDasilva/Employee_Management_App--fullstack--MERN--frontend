import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../axiosConfig";

const Login = ({ updateAuthStatus }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await apiClient.post("/user/login", { email, password });
      const { jwt_token } = response.data;

      // Save the token and redirect to EmployeeList
      localStorage.setItem("token", jwt_token);
      updateAuthStatus(true);
      navigate("/employees");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      {error && <p className="error-message">{error}</p>}
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
