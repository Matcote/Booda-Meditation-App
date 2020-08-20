import React from "react";
import Login from "./Login";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Feed from "./Feed";
import Profile from "./Profile";
import Timer from "./Timer";
import Navbar from "./Navbar";

function App() {
  const user = useSelector((state) => state.user.user);
  return user === null ? (
    <Login />
  ) : (
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
      </Switch>
      <Navbar />
    </Router>
  );
}

export default App;
