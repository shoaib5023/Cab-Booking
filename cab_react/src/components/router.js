import React from "react";
import { Route } from "react-router-dom";
import User from "./user";
import Home from "./home";
import Driver from "./driver";
import Settings from "./settings";

class BasicRouter extends React.Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/user" component={User} />
        <Route exact path="/driver" component={Driver} />
        <Route exact path="/settings" component={Settings} />
      </div>
    );
  }
}

export default BasicRouter;