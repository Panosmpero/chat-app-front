import { combineReducers } from "redux";
import { userRegisterReducer, userSigninReducer } from "./userReducer"

const rootReducer = combineReducers({
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer
});

export default rootReducer;
