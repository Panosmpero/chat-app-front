import { combineReducers } from "redux";
import { userRegisterReducer, userSigninReducer } from "./userReducer";
import { getMessagesReducer, sendMessageReducer } from "./messageReducer";
import { channelsDataReducer } from "./channelReducers";

const rootReducer = combineReducers({
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  sendMessage: sendMessageReducer,
  channelsData: channelsDataReducer,
  getMessages: getMessagesReducer,
});

export default rootReducer;
