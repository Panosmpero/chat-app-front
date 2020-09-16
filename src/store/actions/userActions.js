import * as types from "../constants/userConstants";
import Axios from "axios";
const API_URL = "http://localhost:8000/api";

const signin = (username, password) => async (dispatch) => {
  dispatch({
    type: types.USER_SIGNIN_REQUEST,
    payload: { username, password },
  });
  const url = `${API_URL}/user/signin`
  try {
    const { data } = await Axios.post(url, {
      username,
      password,
    });
    
    dispatch({
      type: types.USER_SIGNIN_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: types.USER_SIGNIN_FAIL,
      // get custom error message from axios
      payload: error.response.data.message || error.message,
    });
  }
};

const register = (username, password, rePassword) => async (dispatch) => {
  if (password !== rePassword) {
    dispatch({
      type: types.USER_REGISTER_FAIL,
      payload: "Passwords do not match!"
    })
    return;
  }
  dispatch({
    type: types.USER_REGISTER_REQUEST,
    payload: { username, password }
  })
  const url = `${API_URL}/user/register`
  try {
    const { data } = await Axios.post(url, {
      username,
      password,
    });
    
    dispatch({
      type: types.USER_REGISTER_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: types.USER_REGISTER_FAIL,
      // get custom error message from axios
      payload: error.response.data.message || error.message,
    });
  }
}

export { signin, register };
