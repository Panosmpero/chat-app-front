import Axios from "axios";
import * as types from "../constants/messageConstants";

const API_URL = "http://localhost:8000/api";

const sendMessage = ({ username }, message, channel, socket) => async (
  dispatch
) => {
  const url = `${API_URL}/chat/add/${channel}`;
  try {
    const { data } = await Axios.put(url, {
      username,
      message,
    });
    
    if (data) {
      // emmit to backend
      socket.emit("sent message", { message, channel });
    }
    dispatch({
      type: types.SEND_MESSAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.SEND_MESSAGE_FAIL,
      // get custom error message from axios
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

const getChannelMessages = (username, channel, socket) => async (dispatch) => {
  const url = `${API_URL}/chat/get/${channel}`;
  try {
    const { data } = await Axios.get(url);
    console.log(username);
    if (data) {
      // emmit to backend
      socket.emit("join channel", { username, channel });          
    }
    dispatch({
      type: types.GET_MESSAGES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_MESSAGES_FAIL,
      // get custom error message from axios
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
}

export { sendMessage, getChannelMessages };
