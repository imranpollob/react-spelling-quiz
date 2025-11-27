import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-73px)] flex items-center justify-center p-6 animate-fade-in">
      <div className="max-w-4xl w-full glass rounded-3xl p-12 shadow-2xl">
        <div className="text-center space-y-8">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl font-bold text-gradient leading-tight">
            Master Your Spelling Skills
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Test your knowledge with{" "}
            <span className="font-bold text-primary-600 dark:text-primary-400">
              236+
            </span>{" "}
            commonly misspelled words
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <Link to="/quiz">
              <button className="btn btn--primary text-lg px-10 py-4 group relative overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  Start Quiz
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
            </Link>

            <Link to="/words">
              <button className="btn btn--secondary text-lg px-10 py-4">
                Manage Words
              </button>
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="card backdrop-blur-lg bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/30 dark:to-purple-950/30 p-6">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">
                Interactive Quizzes
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Practice with audio pronunciation and instant feedback
              </p>
            </div>

            <div className="card backdrop-blur-lg bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-950/30 dark:to-emerald-950/30 p-6">
              <div className="text-4xl mb-3">📚</div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">
                Custom Word Lists
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Add your own words and create personalized quizzes
              </p>
            </div>

            <div className="card backdrop-blur-lg bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-950/30 dark:to-pink-950/30 p-6">
              <div className="text-4xl mb-3">📊</div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">
                Track Progress
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Monitor your improvement and accuracy over time
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-12 pt-8 border-t border-slate-200/50 dark:border-slate-700/50">
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient">236+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">Words</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient">Audio</div>
                <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">Pronunciation</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient">Free</div>
                <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">Forever</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
