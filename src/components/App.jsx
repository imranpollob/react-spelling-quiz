import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AddWord from "./AddWord";
import Quiz from "./Quiz";
import "./../css/app.css";

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/quiz">Quiz</Link>
          </li>
          <li>
            <Link to="/words">Words</Link>
          </li>
        </ul>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route path="/quiz">
            <Quiz />
          </Route>
          <Route path="/words">
            <AddWord />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
