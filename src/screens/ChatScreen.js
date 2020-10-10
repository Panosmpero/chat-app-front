import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getChannelMessages,
  sendMessage,
} from "../store/actions/messageActions";
import { getChannels } from "../store/actions/channelActions";
import { logout } from "../store/actions/userActions";
import moment from "moment";
import styled from "styled-components";

import { TextField } from "@material-ui/core";
import Spinner from "../components/Spinner";
import Sidebar from "../components/Sidebar";
import UserHeader from "../components/UserHeader";

import io from "socket.io-client";
const ENDPOINT = "http://localhost:8000";
let socket;

const ChatScreen = (props) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [channel, setChannel] = useState("");
  const [channelsUsers, setChannelsUsers] = useState({});
  const [totalUsers, setTotalUsers] = useState(0);
  const [inputActive, setInputActive] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  // messages bottom ref
  const messagesBottom = useRef(null);

  // get redux data
  const { userInfo: user } = useSelector((state) => state.userSignin);
  const { loading, channels } = useSelector((state) => state.channelsData);
  const { loading: messageLoading } = useSelector((state) => state.getMessages);
  const dispatch = useDispatch();

  // console.log(messages);

  useEffect(() => {
    console.log("redirect effect");
    console.log(user);
    // if not logged in redirect
    if (!user) {
      if (socket) socket.close();
      return props.history.push("/signin");
    }
  }, [props.history, user]);

  useEffect(() => {
    // connect socket on initial render
    socket = io(ENDPOINT);
    console.log("channel data effect");

    // get channels to show
    dispatch(getChannels());

    // and share channel data
    socket.on("channel data", (data) => {
      setUsers(data.users);
      setChannelsUsers(data.channelsUsers);
      setTotalUsers(data.totalUsers);
    });

    return () => socket.off("channel data");
  }, [dispatch]);

  useEffect(() => {
    console.log("socket message effect");
    socket.on("message", (message) => {
      // if welcome message set previous messages first
      if (message.savedMessages)
        setMessages([
          {
            text: message.text,
            username: message.username,
            date: message.date,
          },
          ...message.savedMessages,
        ]);
      // else just set the new message
      else setMessages([message, ...messages]);
    });
    // scroll to bottom
    scrollToBottom();
    return () => socket.off("message");
  }, [messages]);

  const scrollToBottom = () => {
    messagesBottom.current.scrollIntoView();
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    // if no text return
    if (!newMessage.length) return;

    // if not in a channel raise alert
    if (!channel) {
      setNewMessage("");
      return alert("Join a channel first!");
    }

    // dispatch new message to socket and save to database
    // and clear input
    dispatch(sendMessage(user, newMessage, channel, socket));
    setNewMessage("");
  };

  const joinChannel = (username, newChannel) => {
    // if already in same channel dont take action
    if (newChannel === channel) return;

    // if already in a channel, leave it first and reset shown messages
    if (channel) leaveChannel();

    // dispatch api call to get past messages, emit welcome message
    // and highlight selected channel
    dispatch(getChannelMessages(username, newChannel, socket));
    setChannel(newChannel);
  };

  const leaveChannel = () => {
    setMessages("");
    setChannel("");
    socket.emit("leave channel");
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const showSide = (bool) => {
    setShowSidebar(bool);
  };
  console.log(messages)
  return (
    <div className="chat">
      <Sidebar show={showSidebar} onClick={showSide} logout={handleLogout} />
      <Spinner visible={loading || messageLoading} />
      <div className="chat-wrapper">
        <div className="chat-side">
          <UserHeader onClick={() => setShowSidebar(true)} user={user} pointer />
          <div className="chat-side-wrapper">
            <ul className="chat-side-channels">
              <div className="total-users">Total Users: {totalUsers}</div>
              {channels &&
                channels.map((ch) => (
                  <li
                    key={ch._id}
                    id={ch._id}
                    className={
                      ch.title === channel ? "activeChannel" : undefined
                    }
                  >
                    <i className="fas fa-hashtag"></i>{" "}
                    <button
                      value={ch.title}
                      onClick={(e) =>
                        joinChannel(user.username, e.target.value)
                      }
                    >
                      {ch.title}:{" "}
                      {channelsUsers && channelsUsers[ch.title]
                        ? channelsUsers[ch.title]
                        : 0}
                    </button>
                  </li>
                ))}
            </ul>
            <ul className="chat-side-users">
              {users &&
                users.length > 0 &&
                users.map((user, id) => (
                  <li key={id}>
                    <UserHeader user={user} />
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <form className="chat-main" onSubmit={handleSendMessage}>
          <div className="chat-main-messages">
            <div ref={messagesBottom}></div>

            {messages &&
              messages.length > 0 &&
              messages.map((user, id) => (
                <div key={id} className="chat-main-messages-block">
                  <div className="chat-main-messages-header">
                    <UserHeader user={user} />
                    <div className="chat-main-messages-date">
                      {moment(user.date).format("hh:mm a")}{" "}
                    </div>
                  </div>
                  <div className="chat-main-messages-text">{user.text}</div>
                  <div className="tooltip">
                    {moment(user.date).format("LLLL")}
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
  transform: translate(-15%, 35%)
    rotate(${(props) => (props.active ? "360" : "0")}deg);
  color: white;
  border-radius: 50%;
  padding: 0.5rem;
  transition: all 0.3s ease-out;

  i {
    transform: translateX(-5%);
  }
`;
