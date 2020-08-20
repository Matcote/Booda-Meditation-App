import React from "react";
import Login from "./Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Feed from "./Feed";
import Profile from "./Profile";
import Timer from "./Timer";
import SignUp from "./SignUp";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Timer />
        </Route>
        <Route exact path="/feed">
          <Feed />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
