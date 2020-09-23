import * as types from "../constants/messageConstants";
import initialState from "../initialState";

const sendMessageReducer = (state = initialState.sendMessage, action) => {
  switch (action.type) {
    case types.SEND_MESSAGE_REQUEST:
      return { loading: true };

    case types.SEND_MESSAGE_SUCCESS:
      return { loading: false, sendMessage: action.payload };

    case types.SEND_MESSAGE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

const getMessagesReducer = (state = initialState.getMessages, action) => {
  switch (action.type) {
    case types.GET_MESSAGES_REQUEST:
      return { loading: true };

    case types.GET_MESSAGES_SUCCESS:
      return { loading: false, getMessages: action.payload };

    case types.GET_MESSAGES_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export { sendMessageReducer, getMessagesReducer };
