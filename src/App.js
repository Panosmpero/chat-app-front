import React from "react";
import Home from "./screens/Home";
import ChatScreen from "./screens/ChatScreen";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/chat" component={ChatScreen} />
      </Switch>
    </Router>
  );
}

export default App;
