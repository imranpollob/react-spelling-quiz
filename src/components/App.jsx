import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import AddWord from "./AddWord";
import Quiz from "./Quiz";
import Home from "./Home";
import "./../css/app.css";

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <NavLink activeClassName="is-active" to="/" exact={true}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="is-active" to="/quiz" exact={true}>
              Quiz
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="is-active" to="/words" exact={true}>
              Words
            </NavLink>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/quiz">
          <Quiz />
        </Route>
        <Route path="/words">
          <AddWord />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
