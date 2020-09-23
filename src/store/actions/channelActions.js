import Axios from "axios";
import * as types from "../constants/channelConstants";
const API_URL = "http://localhost:8000/api";

const getChannels = () => async (dispatch) => {
  const url = `${API_URL}/chat/get`;
  try {
    dispatch({
      type: types.GET_CHANNELS_REQUEST,
    });
    const { data } = await Axios.get(url);

    dispatch({
      type: types.GET_CHANNELS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_CHANNELS_FAIL,
      // get custom error message from axios
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

const addChannel = (channel) => async (dispatch) => {
  const url = `${API_URL}/chat/newchannel`;
  try {
    dispatch({
      type: types.ADD_CHANNEL_REQUEST,
    });
    const { data } = await Axios.post(url, { channel });

    dispatch({
      type: types.ADD_CHANNEL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.ADD_CHANNEL_FAIL,
      // get custom error message from axios
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export { getChannels, addChannel };
