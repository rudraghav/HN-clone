import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import HackerHome from "./App";
import Story from "./Story";

export default function RouterConfig() {
  return (
    <Router>
       {/* <AuthButton /> */}
      <Switch>
        <Route exact path="/">
          <HackerHome />
        </Route>
        <Route path="/Story" component={Story}>
        </Route>
      </Switch>
    </Router>
  );
}
