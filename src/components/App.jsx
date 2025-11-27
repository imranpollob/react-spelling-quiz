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
import Login from "./Login";
import MigrationTest from "./MigrationTest";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { logOut } from "../services/authService";

function AppContent() {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold text-gradient">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  const handleLogout = async () => {
    await logOut();
  };

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
          <li>
            <NavLink
              className={({ isActive }) => isActive ? "is-active" : ""}
              to="/migrate"
            >
              🔧 Migrate
            </NavLink>
          </li>
          <li className="ml-auto">
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-600 dark:text-slate-300">
                {user?.displayName || user?.email || 'Guest'}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Logout
              </button>
            </div>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/words" element={<Words />} />
        <Route path="/migrate" element={<MigrationTest />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
