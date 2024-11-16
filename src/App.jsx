import React, { useState } from "react";
import "./App.css";
import fil from "../public/fil.png"; // Importing the filter image

const ChatMessage = ({ name, time, message, isSelf }) => {
  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <div className={`chat-message ${isSelf ? "self" : ""}`}>
      {!isSelf && (
        <div className="profile-placeholder">{getInitials(name)}</div>
      )}
      <div className="message-content">
        {!isSelf && <div className="chat-name">{name}</div>}
        <div className="chat-bubble">
          <span>{message}</span>
          <span className="chat-time">{time}</span>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [messages, setMessages] = useState([
    {
      name: "Amit Sharma",
      time: "10:05 AM",
      message: "The assignment deadline is tomorrow.",
      isSelf: false,
    },
    {
      name: "Sneha Gupta",
      time: "10:10 AM",
      message: "Exam dates are announced. Starts from 20th Nov.",
      isSelf: false,
    },
    {
      name: "Rohan Mehra",
      time: "10:15 AM",
      message: "Please share notes for Unit 3!",
      isSelf: false,
    },
    {
      name: "Jyoti",
      time: "10:18 AM",
      message: "I can share mine. Sending in a moment.",
      isSelf: true,
    },
    {
      name: "Priya Singh",
      time: "10:20 AM",
      message: "Group project meeting at 5 PM today. Don't forget!",
      isSelf: false,
    },
    {
      name: "Varun Patel",
      time: "10:25 AM",
      message: "Thanks, Jyoti!",
      isSelf: false,
    },
  ]);
  const [filter, setFilter] = useState("All");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // To store the input for filtering

  const uniqueUsers = ["All", ...new Set(messages.map((msg) => msg.name))];

  const filteredMessages =
    filter === "All" || !searchQuery
      ? messages
      : messages.filter((msg) =>
          msg.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setMessages([
      ...messages,
      { name: "Jyoti", time: currentTime, message: newMessage, isSelf: true },
    ]);
    setNewMessage("");
  };

  return (
    <div className="app">
      <div className="chat-container">
        <div className="chat-header">
          <div className="group-name">College Updates</div>

          {/* Filter Icon Below the Chat Name */}
          <div className="filter-icon">
            <img
              src={fil}
              alt="Filter"
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              title="Filter Messages"
              style={{ cursor: "pointer", width: "20px", height: "20px" }} // Small icon size
            />
            {showFilterDropdown && (
              <div className="filter-input">
                <input
                  type="text"
                  placeholder="Filter by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} // Update filter input
                />
              </div>
            )}
          </div>
        </div>

        <div className="chat-messages">
          {filteredMessages.map((msg, index) => (
            <ChatMessage
              key={index}
              name={msg.name}
              time={msg.time}
              message={msg.message}
              isSelf={msg.isSelf}
            />
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
