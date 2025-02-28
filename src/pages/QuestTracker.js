import React, { useState } from "react";
import "../styles/QuestTracker.css";

function QuestTracker() {
  const [quests, setQuests] = useState([
    { id: 1, name: "Run 2 km", completed: false },
    { id: 2, name: "Do 10 squats", completed: false },
    { id: 3, name: "20 pushups", completed: false },
  ]);

  const completeQuest = (id) => {
    const updatedQuests = quests.map((quest) =>
      quest.id === id ? { ...quest, completed: true } : quest
    );
    setQuests(updatedQuests);
  };

  return (
    <div>
      <h1>Quest Tracker</h1>
      <ul>
        {quests.map((quest) => (
          <li key={quest.id} className={quest.completed ? "completed" : ""}>
            {quest.name}
            {!quest.completed && (
              <button onClick={() => completeQuest(quest.id)}>Complete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuestTracker;
