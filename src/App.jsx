import React, { useState, useRef, useEffect } from "react";
import "./App.css";

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
      message:
        "Please be reminded that the deadline for the DBMS assignment is tomorrow. Kindly ensure all submissions are completed on time.",
      isSelf: false,
    },
    {
      name: "Sneha Gupta",
      time: "10:10 AM",
      message:
        "The dates for the AIML exams have been finalized. The exams will commence on November 20th. Make sure to review the course material thoroughly before the exam.",
      isSelf: false,
    },
    {
      name: "Rohan Mehra",
      time: "10:15 AM",
      message:
        "Assignment Deadline for Communication Networks is this Saturday. Make sure you upload all files on Google Classroom",
      isSelf: false,
    },
    {
      name: "Jyoti",
      time: "10:18 AM",
      message:
        "Ma'am can you please confirm when will we have our group project meeting?",
      isSelf: true,
    },
    {
      name: "Amit Sharma",
      time: "10:30 AM",
      message:
        "Just a friendly reminder to submit your project updates by tomorrow.",
      isSelf: false,
    },
    {
      name: "Sneha Gupta",
      time: "10:35 AM",
      message:
        "Don't forget to review the new materials uploaded for the AIML exam preparation.",
      isSelf: false,
    },
    {
      name: "Jyoti",
      time: "10:40 AM",
      message: "Sure, I'll review it. Can you share the link to the material?",
      isSelf: true,
    },
    {
      name: "Priya Singh",
      time: "10:45 AM",
      message:
        "Reminder: Our group project meeting is scheduled for 5 PM today.",
      isSelf: false,
    },
    {
      name: "Rohan Mehra",
      time: "10:50 AM",
      message: "Don't forget to submit your assignment by Saturday.",
      isSelf: false,
    },
    {
      name: "Varun Patel",
      time: "10:55 AM",
      message: "Today's 11:45 class will be conducted in JN110",
      isSelf: false,
    },
    {
      name: "Jyoti",
      time: "10:58 AM",
      message:
        "Thanks, I’ll be there. Also, any updates on the lab assignment?",
      isSelf: true,
    },
  ]);
  const [filter, setFilter] = useState("All");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const uniqueUsers = ["All", ...new Set(messages.map((msg) => msg.name))];

  const filteredMessages =
    filter === "All"
      ? messages
      : messages.filter((msg) =>
          msg.name.toLowerCase().includes(filter.toLowerCase())
        );

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setMessages([
      ...messages,
      {
        name: "Jyoti",
        time: currentTime,
        message: newMessage,
        isSelf: true,
      },
    ]);
    setNewMessage("");
  };

  return (
    <div className="app">
      <div className="chat-container">
        <div className="chat-header">
          <div className="group-name">College Updates</div>
          <button
            className="filter-button"
            onClick={() => setShowFilterDropdown((prev) => !prev)} // Toggle dropdown visibility
          >
            Filter
          </button>
        </div>

        {showFilterDropdown && (
          <div className="filter-dropdown">
            <input
              type="text"
              placeholder="Search by name"
              onChange={(e) => setFilter(e.target.value)}
            />
            {uniqueUsers
              .filter((user) =>
                user.toLowerCase().includes(filter.toLowerCase())
              )
              .map((user, index) => (
                <div
                  key={index}
                  className="filter-option"
                  onClick={() => setFilter(user)}
                >
                  {user}
                </div>
              ))}
          </div>
        )}

        <div className="chat-messages" style={{ flex: 1, overflowY: "auto" }}>
          {filteredMessages.map((msg, index) => (
            <ChatMessage
              key={index}
              name={msg.name}
              time={msg.time}
              message={msg.message}
              isSelf={msg.isSelf}
            />
          ))}
          <div ref={chatEndRef}></div>
        </div>

        <div
          className="chat-input"
          style={{ padding: "10px", borderTop: "1px solid #ccc" }}
        >
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            style={{ flex: 1, padding: "8px", marginRight: "10px" }}
          />
          <button
            onClick={handleSendMessage}
            style={{
              padding: "8px 12px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
