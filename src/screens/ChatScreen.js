import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { TextField } from "@material-ui/core";
import openSocket from "socket.io-client";
const ENDPOINT = "http://localhost:8000";
const socket = openSocket(ENDPOINT);

const ChatScreen = (props) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [channel, setChannel] = useState("Diablo");
  const [totalUsers, setTotalUsers] = useState(0);

  const { userInfo: user } = useSelector((state) => state.userSignin);

  // if not logged in redirect
  useEffect(() => {
    if (!user) props.history.push("/signin");
    if (user) socket.emit("join channel", { username: user.username, channel });
  }, [props.history, user, channel]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([message, ...messages]);
    });
  }, [messages]);

  useEffect(() => {
    socket.on("channel data", (data) => {
      setChannel(data.channel);
      setUsers(data.users);
      setTotalUsers(data.totalUsers);
    });
    return () => socket.disconnect();
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();

    // if no text return
    if (!newMessage.length) return;

    socket.emit("sent message", newMessage, setNewMessage(""));
  };

  return (
    <div className="chat">
      <div className="chat-wrapper">
        <div className="chat-side">
          {user && user.username}
          total in all channels: {totalUsers}
          <ul className="chat-side-channels">
            <li>Diablo</li>
            <li>Starcraft</li>
            <li>Path of Exile</li>
            <li>Dota</li>
          </ul>
          <ul className="chat-side-users">
            {users.length &&
              users.map((user, id) => <li key={id}>{user.username}</li>)}
          </ul>
        </div>
        <form className="chat-main" onSubmit={handleSendMessage}>
          <div className="chat-main-messages">
            {messages.length &&
              messages.map(({ username, text, date }, id) => (
                <div key={id} className="chat-main-messages-bubble">
                  User: {username} Text: {text} Date: {date}{" "}
                  <div className="tooltip">timestamp date</div>{" "}
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
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
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
