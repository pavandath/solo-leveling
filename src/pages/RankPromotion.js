import React, { useEffect, useState } from "react";
import "../styles/RankPromotion.css"; // Style for the animation

function RankPromotion({ rank, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Automatically close the popup after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose(); // Notify parent to stop rendering the animation
    }, 5000);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, [onClose]);

  if (!isVisible) return null;

  return (
    <div className="rank-promotion-overlay">
      <div className="rank-promotion-container">
        <h1 className="rank-promotion-text">Congratulations!</h1>
        <p className="rank-promotion-subtext">You have been promoted to</p>
        <h2 className="rank-promotion-rank">{rank}</h2>
      </div>
    </div>
  );
}

export default RankPromotion;
