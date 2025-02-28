import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/profile.css";
import eRankImage from "../images/e-rank.png";
import dRankImage from "../images/d-rank.jpg";

function Profile() {
  const location = useLocation();
  const navigate = useNavigate();
  const playerName = location.state?.playerName || "Hunter";

  const rankLevels = useMemo(
    () => ["E-Rank", "D-Rank", "C-Rank", "B-Rank", "A-Rank"],
    []
  );
  const rankImages = useMemo(
    () => ({
      "E-Rank": eRankImage,
      "D-Rank": dRankImage,
    }),
    []
  );

  const [level, setLevel] = useState(
    () => localStorage.getItem("rank") || rankLevels[0]
  );
  const [xp, setXp] = useState(() => parseInt(localStorage.getItem("xp")) || 0);
  const [rankImage, setRankImage] = useState(() => rankImages[level] || eRankImage);
  const [showPromotion, setShowPromotion] = useState(false);
  const [newRank, setNewRank] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [quests, setQuests] = useState(() => {
    const savedQuests = localStorage.getItem("quests");
    return savedQuests ? JSON.parse(savedQuests) : [
      { id: 1, text: "Run 1km", completed: false },
      { id: 2, text: "Do 20 Push-ups", completed: false },
      { id: 3, text: "Do 30 Squats", completed: false },
    ];
  });

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Format time as HH:MM:SS
  const formattedTime = useMemo(() => {
    return currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }, [currentTime]);

  // Function to update rank when XP reaches 100
  const handleLevelUp = useCallback(() => {
    if (xp >= 100) {
      const currentIndex = rankLevels.indexOf(level);
      if (currentIndex < rankLevels.length - 1) {
        const newLevel = rankLevels[currentIndex + 1];
        setNewRank(newLevel);
        setShowPromotion(true);
        
        // After showing the promotion dialog, update the rank
        setTimeout(() => {
          setLevel(newLevel);
          setXp(0); // Reset XP after promotion
          localStorage.setItem("rank", newLevel);
          setRankImage(() => rankImages[newLevel] || eRankImage);
          setShowPromotion(false);
        }, 5000);
      }
    }
  }, [xp, level, rankLevels, rankImages]);

  useEffect(() => {
    localStorage.setItem("xp", xp);
    localStorage.setItem("quests", JSON.stringify(quests));
    handleLevelUp();
  }, [xp, quests, handleLevelUp]);

  // Mark quest as completed and add XP
  const completeQuest = (id) => {
    setQuests((prevQuests) =>
      prevQuests.map((quest) =>
        quest.id === id ? { ...quest, completed: true } : quest
      )
    );
    setXp((prevXp) => Math.min(prevXp + 20, 100)); // XP maxes at 100
  };

  // Reset only quests, not XP
  const resetQuests = () => {
    setQuests([
      { id: 1, text: "Run 1km", completed: false },
      { id: 2, text: "Do 20 Push-ups", completed: false },
      { id: 3, text: "Do 30 Squats", completed: false },
    ]);
  };

  // Handle logout
  const handleLogout = () => {
    // You can add additional logout logic here if needed
    navigate("/"); // Navigate to home/login page
  };

  // Auto-reset quests every 24 hours
  useEffect(() => {
    const lastReset = localStorage.getItem("lastReset");
    const currentTime = new Date().getTime();
    if (!lastReset || currentTime - parseInt(lastReset) > 24 * 60 * 60 * 1000) {
      resetQuests();
      localStorage.setItem("lastReset", currentTime.toString());
    }
  }, []);

  return (
    <div className="profile-container">
      {/* Header with time and logout */}
      <div className="profile-header">
        <div className="time-display">{formattedTime}</div>
        <div className="logout-button" onClick={handleLogout}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#FF3333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </div>
      </div>

      <h1 className="profile-title">{playerName}'s Profile</h1>
      
      <div className="rank-section">
        <p className="rank-text">Rank: {level}</p>
        <img src={rankImage} alt={`${level} Hunter`} className="rank-image" />
      </div>

      {/* XP Section */}
      <div className="xp-section">
        <p>XP: {xp}/100</p>
        <div className="xp-bar">
          <div className="xp-fill" style={{ width: `${(xp / 100) * 100}%` }}></div>
        </div>
      </div>

      {/* Quests Section */}
      <div className="quests-section">
        <h2 className="quests-title">Quests</h2>
        <ul className="quests-list">
          {quests.map((quest) => (
            <li key={quest.id} className={`quest-item ${quest.completed ? "quest-completed" : ""}`}>
              <span className="quest-text">{quest.text}</span>
              {!quest.completed && (
                <button className="complete-button" onClick={() => completeQuest(quest.id)}>
                  Complete
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Reset Button */}
      <button className="reset-button" onClick={resetQuests}>
        Reset Quests
      </button>

      {/* Promotion Popup */}
      {showPromotion && (
        <div className="promotion-popup">
          <div className="promotion-background"></div>
          <div className="promotion-content">
            <div className="promotion-glow"></div>
            <h2 className="promotion-title">RANK UP!</h2>
            <div className="promotion-divider"></div>
            <p className="promotion-text">You have been promoted to</p>
            <p className="new-rank">{newRank}</p>
            <div className="promotion-particles"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;