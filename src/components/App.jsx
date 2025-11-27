import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Words from "./Words";
import Quiz from "./Quiz";
import Home from "./Home";

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <NavLink
              className={({ isActive }) => isActive ? "is-active" : ""}
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => isActive ? "is-active" : ""}
              to="/quiz"
            >
              Quiz
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => isActive ? "is-active" : ""}
              to="/words"
            >
              Words
            </NavLink>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/words" element={<Words />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
