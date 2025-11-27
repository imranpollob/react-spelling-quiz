import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
              Master Your Spelling
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
              Practice commonly misspelled words with interactive quizzes. Build your personal word library and track your progress.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/quiz"
                className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all transform hover:scale-105"
              >
                Start Quiz
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                to="/words"
                className="inline-flex items-center justify-center px-8 py-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold rounded-lg shadow-md border border-slate-200 dark:border-slate-700 transition-all"
              >
                Browse Words
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Everything You Need to Improve
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            A comprehensive spelling practice platform
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              Interactive Quizzes
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Practice with audio pronunciation and instant feedback on your spelling
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              Personal Word Library
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Build your own collection of words to practice and master
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              Audio Pronunciation
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Listen to correct pronunciation for every word with text-to-speech
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-slate-100 dark:bg-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">277+</div>
              <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">Words Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 dark:text-green-400">3</div>
              <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">Difficulty Levels</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">∞</div>
              <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">Practice Sessions</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 dark:text-orange-400">100%</div>
              <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">Free to Use</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
