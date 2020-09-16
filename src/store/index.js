import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import initialState from "./initialState";
import rootReducer from "./reducers";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk, reduxImmutableStateInvariant()))
);

export default store;
