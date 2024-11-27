import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../axiosConfig";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const naviagte = useNavigate();

  const handleSumbit = async (e) => {
    e.preventDefault();
    setError(""); // reset error before submission

    if (!username || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await apiClient.post("/user/signup", {
        username,
        email,
        password,
      });

      console.log(response.data.message); //success message from the backend
      naviagte("/");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Sign Up</h1>
      {error && <p className="error-message">{error}</p>}
      <form className="login-form" onSubmit={handleSumbit}>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="submit-button">Sign-Up</button>
      </form>
    </div>
  );
};

export default Signup;
