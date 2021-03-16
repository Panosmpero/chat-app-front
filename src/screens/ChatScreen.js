import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getChannelMessages,
  like,
  removeLike,
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
  const { userInfo: currentUser } = useSelector((state) => state.userSignin);
  const { loading, channels } = useSelector((state) => state.channelsData);
  const { loading: messageLoading } = useSelector((state) => state.getMessages);
  const dispatch = useDispatch();

  // console.log(messages);

  useEffect(() => {
    console.log("redirect effect");
    console.log(currentUser);
    // if not logged in redirect
    if (!currentUser) {
      if (socket) socket.close();
      return props.history.push("/signin");
    }
  }, [props.history, currentUser]);

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

  useEffect(() => {
    console.log("socket like effect");
    socket.on("like", ({ userId, messageId }) => {
      setMessages(messages.map(message => message._id === messageId 
        ? {  ...message, likes: [...message.likes, userId]}
        : message));
    });
    return () => socket.off("like");
  }, [messages]);

  useEffect(() => {
    console.log("socket removeLike effect");
    socket.on("removeLike", ({ userId, messageId }) => {
      setMessages(messages.map(message => message._id === messageId 
        ? {  ...message, likes: message.likes.filter(user => user !== userId)}
        : message));
    });
    return () => socket.off("removeLike");
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
    dispatch(sendMessage(currentUser, newMessage, channel, socket));
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

  const handleLike = (userId, messageId, liked, socket) => {
    console.log("test");
    if (!messageId) return alert("Bercord Bot: I know you like me but let's keep this between us!")
    liked
      ? dispatch(removeLike(userId, messageId, channel, socket))
      : dispatch(like(userId, messageId, channel, socket));
  };

  console.log(messages);

  return (
    <div className="chat">
      <Sidebar show={showSidebar} onClick={showSide} logout={handleLogout} />
      <Spinner visible={loading || messageLoading} />
      <div className="chat-wrapper">
        <div className="chat-side">
          <UserHeader
            onClick={() => setShowSidebar(true)}
            user={currentUser}
            pointer
          />
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
                        joinChannel(currentUser.username, e.target.value)
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
              messages.map((message, id) => (
                <div key={id} className="chat-main-messages-block">
                  <div className="chat-main-messages-header">
                    <UserHeader user={message} />
                    <div className="chat-main-messages-date">
                      {moment(message.date).format("hh:mm a")}{" "}
                    </div>
                  </div>
                  <div className="chat-main-messages-text">{message.text}</div>
                  <div className="tooltip">
                    {moment(message.date).format("LLLL")}
                  </div>{" "}
                  {/* <div className="reactions">
                    <i className="far fa-smile-beam" title="happy"></i>
                    <i className="far fa-frown" title="sad"></i>
                    <i className="far fa-grin-hearts" title="love"></i>
                    <i className="far fa-sad-tear" title="cry"></i>
                    <i className="far fa-angry" title="angry"></i>
                  </div> */}
                  <Reactions
                    liked={
                      message.likes &&
                      message.likes.includes(currentUser.userId)
                    }
                    likes={message.likes && message.likes.length > 0}
                    className="reactions"
                  >
                    <i
                      className="far fa-thumbs-up"
                      title="like"
                      onClick={() =>
                        handleLike(
                          currentUser.userId,
                          message._id,
                          message.likes &&
                          message.likes.includes(currentUser.userId),
                          socket
                        )
                      }
                    ></i>
                    {message.likes && message.likes.length > 0 && (
                      <div style={{ marginLeft: "0.1rem" }}>
                        {message.likes.length}
                      </div>
                    )}
                  </Reactions>
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

const Reactions = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--background-dark);
  color: ${(props) => (props.liked ? "yellow" : "var(--background-main)")};
  right: 0;
  bottom: 0;
  width: fit-content;
  padding: 0.4rem;
  border-radius: 1rem;
  transform: translate(-10%, 50%);
  font-size: 0.8rem;
  opacity: ${(props) => (props.likes ? 1 : 0)};

  i {
    &:nth-last-child(n + 3) {
      margin-right: 0.5rem;
    }

    &:hover {
      cursor: pointer;
      color: yellow;
      transform: scale(1.2);
    }
  }
`;
