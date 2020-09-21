import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import styled from "styled-components";

import { TextField, Typography } from "@material-ui/core";

import io from "socket.io-client";
const ENDPOINT = "http://localhost:8000";
let socket;
const fixedChannels = [
  "Diablo",
  "Path of Exile",
  "Starcraft",
  "Warcraft",
  "Fortnite",
  "Counterstrike",
  "Dota",
  "League of Legends",
];

const ChatScreen = (props) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [channel, setChannel] = useState("");
  const [channelsUsers, setChannelsUsers] = useState({});
  const [totalUsers, setTotalUsers] = useState(0);
  const [inputActive, setInputActive] = useState(false);
  
  console.log(channelsUsers, totalUsers);
  // messages bottom ref
  const messagesBottom = useRef(null);

  // get redux data
  const { userInfo: user } = useSelector((state) => state.userSignin);

  useEffect(() => {
    // if not logged in redirect
    if (!user) return props.history.push("/signin");
  }, [props.history, user]);

  useEffect(() => {
    socket = io(ENDPOINT)

    socket.on("channel data", (data) => {
      console.log(data)
      setUsers(data.users);
      setChannelsUsers(data.channelsUsers);
      setTotalUsers(data.totalUsers);
    });
    return () => socket.off("channel data");
  }, []);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([message, ...messages]);
    });
    // scroll to bottom
    scrollToBottom();
    return () => socket.off("message")
  }, [messages])


  const scrollToBottom = () => {
    messagesBottom.current.scrollIntoView();
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    // if no text return
    if (!newMessage.length || !channel) return;

    // and emmit to backend
    socket.emit(
      "sent message",
      { message: newMessage, channel },
      setNewMessage("")
    );
  };

  const joinChannel = (username, newChannel) => {
    if (newChannel === channel) return;

    if (channel) socket.emit("leave channel");

    socket.emit("join channel", { username, channel: newChannel });
    setChannel(newChannel);
  };

  return (
    <div className="chat">
      <div className="chat-wrapper">
        <div className="chat-side">
          <div className="chat-side-header">
            <div className="chat-side-header-icon"></div>
            <Typography component="h1" variant="h5" align="center">
              {user && user.username} <br />
            </Typography>
          </div>
          <ul className="chat-side-channels">
            <div className="total-users">Total Users: {totalUsers}</div>
            {fixedChannels.map((fixedCh, id) => (
              <li
                key={id}
                className={fixedCh === channel ? "activeChannel" : undefined}
              >
                <i className="fas fa-hashtag"></i>{" "}
                <button
                  value={fixedCh}
                  onClick={(e) => joinChannel(user.username, e.target.value)}
                >
                  {fixedCh}:{" "}
                  {channelsUsers && channelsUsers[fixedCh]
                    ? channelsUsers[fixedCh]
                    : 0}
                </button>
              </li>
            ))}
          </ul>
          <ul className="chat-side-users">
            {users && users.length > 0 &&
              users.map((user, id) => <li key={id}>{user.username}</li>)}
          </ul>
        </div>
        <form className="chat-main" onSubmit={handleSendMessage}>
          <div className="chat-main-messages">
            <div ref={messagesBottom}></div>

            {messages && messages.length > 0 &&
              messages.map(({ username, text, date }, id) => (
                <div key={id} className="chat-main-messages-block">
                  <div className="chat-main-messages-header">
                    <div className="chat-main-messages-user">{username}</div>
                    <div className="chat-main-messages-date">
                      {moment(date).format("hh:mm a")}{" "}
                    </div>
                  </div>
                  <div className="chat-main-messages-text">{text}</div>
                  <div className="tooltip">
                    {moment(date).format("LLLL")}
                  </div>{" "}
                  <div className="reactions">
                    <i className="far fa-smile-beam" title="happy"></i>
                    <i className="far fa-frown" title="sad"></i>
                    <i className="far fa-grin-hearts" title="love"></i>
                    <i className="far fa-sad-tear" title="cry"></i>
                    <i className="far fa-angry" title="angry"></i>
                  </div>
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
              color="secondary"
              fullWidth
              autoFocus
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onFocus={() => setInputActive(true)}
              onBlur={() => setInputActive(false)}
            />
            <SendButton active={inputActive}>
              <i className="fas fa-paper-plane"></i>
            </SendButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatScreen;

const SendButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  font-size: 0.8rem;
  background-color: ${(props) =>
    props.active ? "#f50057" : " rgb(72, 72, 72)"};
  transform: translate(-40%, 42%)
    rotate(${(props) => (props.active ? "360" : "0")}deg);
  color: white;
  border-radius: 50%;
  padding: 0.5rem;
  transition: all 0.3s ease-out;

  i {
    transform: translateX(-5%);
  }
`;
