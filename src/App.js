import React from "react";
import Home from "./screens/Home";
import ChatScreen from "./screens/ChatScreen";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import SigninScreen from "./screens/SignInScreen";
import RegisterScreen from "./screens/RegisterScreen";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signin" component={SigninScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/chat" component={ChatScreen} />
      </Switch>
    </Router>
  );
}

export default App;
