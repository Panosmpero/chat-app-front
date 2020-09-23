import * as types from "../constants/channelConstants";
import initialState from "../initialState";

const channelsDataReducer = (state = initialState.channelsData, action) => {
  switch (action.type) {
    case types.GET_CHANNELS_REQUEST:
      return { loading: true };

    case types.GET_CHANNELS_SUCCESS:
      return { loading: false, channels: action.payload };

    case types.GET_CHANNELS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export { channelsDataReducer };
