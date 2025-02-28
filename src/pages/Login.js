import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css"; // Ensure the styles file is correctly imported

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // ✅ Success message instead of alert
  const [showAlert, setShowAlert] = useState(true); // Blinking effect for SYSTEM MESSAGE
  const navigate = useNavigate();

  useEffect(() => {
    // Blink effect for SYSTEM MESSAGE
    const interval = setInterval(() => {
      setShowAlert((prev) => !prev);
    }, 800); // Toggle visibility every 800ms

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
      setError("❗ Please enter a valid Gmail address.");
      setSuccess(""); // Reset success message
      return;
    }
    if (!password) {
      setError("❗ Please enter your password.");
      setSuccess(""); // Reset success message
      return;
    }

    setError("");
    setSuccess("✅ Login successful! Redirecting...");

    // ⏳ Smooth transition before navigation
    setTimeout(() => {
      navigate("/player-name");
    }, 1500);
  };

  return (
    <div className="container">
      <div className="login-overlay">
        <h1 className={`system-message ${showAlert ? "visible" : "hidden"}`}>
          🔹 SYSTEM LOGIN 🔹
        </h1>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            placeholder="Enter your Gmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>} {/* ✅ Success message */}
          <button type="submit" className="login-button">✅ Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
