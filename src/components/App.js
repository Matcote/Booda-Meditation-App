import React from "react";
import Login from "./Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Feed from "./Feed";
import Profile from "./Profile";
import TimerPage from "./TimerPage";
import SignUp from "./SignUp";
import CommentPage from "./CommentPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Feed />
        </Route>
        <Route exact path="/timer">
          <TimerPage />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/profile/:_id">
          <Profile />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/comment/:postId">
          <CommentPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
