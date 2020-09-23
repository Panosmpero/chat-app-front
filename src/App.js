import React from "react";
import Home from "./screens/Home";
import ChatScreen from "./screens/ChatScreen";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import SigninScreen from "./screens/SignInScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: `"Architects Daughter", cursive`,
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signin" component={SigninScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/chat" component={ChatScreen} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
