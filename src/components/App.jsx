import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Link,
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
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        {/* Professional Navigation */}
        <nav className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo/Brand */}
              <div className="flex items-center">
                <Link to="/" className="flex items-center gap-2">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span className="text-xl font-bold text-slate-900 dark:text-white">
                    SpellingQuiz
                  </span>
                </Link>
              </div>

              {/* Navigation Links */}
              <div className="flex items-center gap-1">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/quiz"
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`
                  }
                >
                  Quiz
                </NavLink>
                <NavLink
                  to="/words"
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`
                  }
                >
                  Words
                </NavLink>

                {/* User Menu */}
                <div className="ml-4 pl-4 border-l border-slate-200 dark:border-slate-700 flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {user?.displayName?.[0] || user?.email?.[0]?.toUpperCase() || 'G'}
                      </span>
                    </div>
                    <div className="hidden sm:block">
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        {user?.displayName || user?.email?.split('@')[0] || 'Guest'}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {user?.email === 'polboy777@gmail.com' ? 'Admin' : (user?.isAnonymous ? 'Guest' : 'User')}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/words" element={<Words />} />
            <Route path="/migrate" element={<MigrationTest />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
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
