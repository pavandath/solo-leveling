import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PlayerName.css"; // Ensure the styles file is correctly imported

function PlayerName() {
  const [playerName, setPlayerName] = useState("");
  const [showAlert, setShowAlert] = useState(true); // Blinking SYSTEM MESSAGE
  const [error, setError] = useState(false); // Error feedback
  const navigate = useNavigate();
  const inputRef = useRef(null); // 🔧 Fix for autofocus

  useEffect(() => {
    // Blink effect for SYSTEM MESSAGE
    const interval = setInterval(() => {
      setShowAlert((prev) => !prev);
    }, 800);

    // Auto-focus on input field
    if (inputRef.current) {
      inputRef.current.focus();
    }

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (playerName.trim() === "") {
      setError(true); // Show error if input is empty
      return;
    }

    setError(false); // Clear error
    navigate("/profile", { state: { playerName } }); // ✅ Pass playerName to Profile
  };

  return (
    <div className="system-overlay">
      <div className="system-alert-box">
        <h1 className={`system-message ${showAlert ? "visible" : "hidden"}`}>
          🔹 SYSTEM MESSAGE 🔹
        </h1>
        <p className="system-text">Enter your Hunter Name to begin your journey.</p>
        <form onSubmit={handleSubmit} className="system-form">
          <input
            ref={inputRef} // 🔧 Fix autofocus issue
            type="text"
            placeholder="Enter Hunter Name..."
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="system-input"
          />
          {error && <p className="error-message">❗ Please enter a Hunter Name.</p>}
          <button type="submit" className="system-button">
            ✅ Confirm
          </button>
        </form>
      </div>
    </div>
  );
}

export default PlayerName;
