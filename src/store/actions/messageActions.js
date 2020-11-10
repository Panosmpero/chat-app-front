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
  dispatch({
    type: types.GET_MESSAGES_REQUEST
  })
  const url = `${API_URL}/chat/get/${channel}`;
  try {
    const { data } = await Axios.get(url);
    dispatch({
      type: types.GET_MESSAGES_SUCCESS,
      payload: data,
    });
    if (data) {
      // emmit to backend
      socket.emit("join channel", { username, channel, savedMessages: data });
    }
  } catch (error) {
    dispatch({
      type: types.GET_MESSAGES_FAIL,
      // get custom error message from axios
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

const like = (userId, messageId) => async (dispatch) => {
  dispatch({ type: types.SEND_LIKE_REQUEST })
  const url = `${API_URL}/reaction/like`
  try {
    const { data } = await Axios.put(url, {
      userId, 
      messageId
    });
    
    if (data) {
      dispatch({ type: types.SEND_LIKE_SUCCESS })
    }

  } catch (error) {
    dispatch({
      type: types.SEND_LIKE_FAIL,
      // get custom error message from axios
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
}

const removeLike = (userId, messageId) => async (dispatch) => {

}

export { sendMessage, getChannelMessages, like, removeLike };
