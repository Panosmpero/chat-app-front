import * as types from "../constants/userConstants";
import initialState from "../initialState";

const userSigninReducer = (state = initialState.userSignin, action) => {
  switch (action.type) {
    case types.USER_SIGNIN_REQUEST:
      return { loading: true };

    case types.USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case types.USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

const userRegisterReducer = (state = initialState.userRegister, action) => {
  switch (action.type) {
    case types.USER_REGISTER_REQUEST:
      return { loading: true };

    case types.USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case types.USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
}

export { userSigninReducer, userRegisterReducer };
