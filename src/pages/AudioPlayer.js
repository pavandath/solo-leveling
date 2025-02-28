import React, { useEffect, useState } from "react";

function AudioPlayer() {
  const [audio] = useState(new Audio("/audio/solo.mp3")); // Ensure file is in public/audio
  const [isPlaying, setIsPlaying] = useState(false); // Track play state

  useEffect(() => {
    // Try autoplay on mount
    const playAudio = async () => {
      try {
        await audio.play();
        setIsPlaying(true); // Set state if autoplay works
      } catch (error) {
        console.log("Autoplay blocked. Waiting for user interaction.");
      }
    };
    playAudio();
  }, [audio]);

  const toggleAudio = () => {
    if (isPlaying) {
      audio.pause(); // Pause on mute
    } else {
      audio.play(); // Resume on unmute
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
      }}
    >
      <button
        onClick={toggleAudio}
        style={{
          background: "none",
          border: "none",
          fontSize: "24px",
          cursor: "pointer",
          color: "white",
        }}
        aria-label="Play/Pause"
      >
        {isPlaying ? "🔊" : "🔇"}
      </button>
    </div>
  );
}

export default AudioPlayer;
