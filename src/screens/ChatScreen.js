import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import openSocket from "socket.io-client";
const ENDPOINT = "http://localhost:8000"

const ChatScreen = () => {
  const [myMessage, setMyMessage] = useState("");
  const [messages, setMessages] = useState([
    "asaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadsad",
    "asdsdasaaaaaaaaaaadasadsda",
    "asdsdasdasadsda",
    "asdsdasdasadsda",
    "asdsdasdasadsda",
    "asdsdasdasadsda",
    "asdsdasdasadsda",
    "asdsdasdasadsda",
    "asdsdasdasadsda",
    "asdsdasdasadsda",
    "asdsdasdasadsda",
    "asdsdasdasadsda",
    "asdsdasdasadsda",
    "asdsdasdasadsda",
    "asdsdasdasadsda",
    "asdsdasdasadsda",
    "asdsdasdasadsda",
    "asdsdasdasadsda",
    "asdsdasdasadsda",
    "asdsdasdasadsda",
    "asdsdasdasadsda",
    "asdsdasdasadsda",
    "asdsdasdasadsda",
    "asdsdasdasadsda",
    "asdsdasdasadsda",
    "asdsdasdasadsda",
    "asdsdasdasadsda",
    "asdsdasdasadsda",
    "asdsdasdasadsda",
    "asdsdasdasadsda",
    "asdsdasdasadsda",
    "asdsdasdasadsda",
    "asdsdasdasadsda",
    "asdsdasdasadsda",
    "asdsdasdasadsda",
    "asdsdasdasadsda",
    "asdsdasdasadsda",
    "asdsdasdasadsda",
    "asdsdasdasadsda",
    "asdsdasdasadsda",
    "asdsdasdasadsda",
    "asdsdasdasadsda",
    "asdsdasdasadsda",
    "asdsdasdasadsda",
    "asdsdasdasadsda",
    "asdsdasdasadsda",
    "asdsdasdasadsda",
    "asdsdasdasadsda",
    "asdsdasdasadsda",
    "asdsdasdasadsda",
    "asdsdasdasadsda",
    "asdsdasdasadsda",
    "asdsdasdasadsda",
  ]);

  useEffect(() => {
    const socket = openSocket(ENDPOINT);
    socket.on("FromAPI", data => {
      console.log(data)
    })
    return () => socket.disconnect()
  },[])

  const handleSubmit = (e) => {
    e.preventDefault();
    // if no text return
    if (!myMessage.length) return;
    setMessages((prev) => [myMessage, ...prev]);
    setMyMessage("");
  };

  return (
    <div className="chat">
      <div className="chat-wrapper">
        <div className="chat-side">
          <div className="chat-side-channels"></div>
          <div className="chat-side-users"></div>
        </div>
        <form className="chat-main" onSubmit={handleSubmit}>
          <div className="chat-main-messages">
            {messages.map((message, id) => (
              <div key={id} className="chat-main-messages-bubble">
                {message} <div className="tooltip">timestamp date</div>{" "}
              </div>
            ))}
          </div>
          <div className="chat-main-msg">
            <TextField
              name="text"
              label="Enter message here..."
              variant="outlined"
              margin="dense"
              autoComplete="off"
              fullWidth
              autoFocus
              value={myMessage}
              onChange={(e) => setMyMessage(e.target.value)}
            />
            <button type="submit">
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatScreen;
