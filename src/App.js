import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import PlayerName from "./pages/PlayerName";
import Profile from "./pages/Profile"; // Import Profile component
import AudioPlayer from "./pages/AudioPlayer"; // Adjust the path as needed

function App() {
  return (
    <>
      <AudioPlayer /> {/* Background music component */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/player-name" element={<PlayerName />} />
        <Route path="/profile" element={<Profile />} /> {/* Define Profile route */}
      </Routes>
    </>
  );
}

export default App;

