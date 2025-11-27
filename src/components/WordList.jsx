import React from "react";
import { v4 as uuidv4 } from "uuid";
import say from "../helper-functions/say";

export default function WordList({ words, handleDeleteWord }) {
  // Sort words alphabetically by word text
  const sortedWords = [...words].sort((a, b) => a.word.localeCompare(b.word));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[600px] overflow-y-auto pr-2">
      {sortedWords.map((wordObj, index) => (
        <div
          key={wordObj.id || uuidv4()}
          className="group flex items-center justify-between gap-2 p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-primary-400 dark:hover:border-primary-600 transition-all duration-300 hover:shadow-md animate-slide-in"
          style={{ animationDelay: `${index * 20}ms` }}
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="font-medium text-slate-800 dark:text-slate-200 truncate">
              {wordObj.word}
            </span>
          </div>

          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => say(wordObj.word)}
              className="p-2 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900 text-primary-600 dark:text-primary-400 transition-colors duration-200"
              title="Pronounce word"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            </button>
            <button
              onClick={() => handleDeleteWord(wordObj.id, wordObj.word)}
              className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400 transition-colors duration-200 font-bold text-lg leading-none"
              title="Remove word"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
