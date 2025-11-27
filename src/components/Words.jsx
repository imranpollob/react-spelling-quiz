import React, { useState, useEffect } from "react";
import { misspelled } from "../helper-functions/MisspelledWords";
import { successToast, dangerToast } from "../helper-functions/toast";
import Toast from "../helper-components/Toast";
import WordList from "./WordList";

const LOCAL_STORAGE_KEY = "spelling";

export default function Words() {
  const [words, setWords] = useState(misspelled);
  const [currentValue, setCurrentValue] = useState("");

  useEffect(() => {
    const word_json = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (word_json) {
      setWords(JSON.parse(word_json));
    }
  }, []);

  useEffect(() => {
    const sortedWords = words.sort();
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sortedWords));
  }, [words]);

  function handleAddWord(word) {
    if (!word) {
      return;
    }
    if (words.includes(word)) {
      dangerToast(`"${word}" is already on the list`);
      return;
    }
    setWords([...words, word]);
    setCurrentValue("");
    successToast(`"${word}" is added to the list`);
  }

  function handleInput(e) {
    if (e.key === "Enter") {
      handleAddWord(e.target.value);
    }
  }

  function handleDeleteWord(word) {
    let tempWords = [...words];
    tempWords = tempWords.filter((w) => w !== word);
    setWords(tempWords);
    dangerToast(`"${word}" is removed from the list`);
  }

  return (
    <div className="min-h-[calc(100vh-73px)] flex justify-center p-6 animate-fade-in">
      <Toast />
      <div className="max-w-4xl w-full">
        {/* Header Card with Add Word Form */}
        <div className="glass rounded-3xl p-8 md:p-12 shadow-2xl mb-6">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gradient mb-2">Manage Words</h2>
            <p className="text-slate-600 dark:text-slate-400">
              You have <span className="font-bold text-primary-600 dark:text-primary-400">{words.length}</span> words in your library
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              name="word"
              type="text"
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
              onKeyDown={(e) => handleInput(e)}
              placeholder="Enter a new word..."
              className="flex-1 px-6 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-800 focus:border-primary-500 dark:focus:border-primary-400 transition-all duration-300 backdrop-blur-sm"
            />
            <button
              className="btn btn--primary px-8"
              onClick={() => handleAddWord(currentValue)}
            >
              Add Word
            </button>
          </div>
        </div>

        {/* Word List Card */}
        <div className="glass rounded-3xl p-8 shadow-2xl">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-2">
            <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Word Library
          </h3>
          <WordList words={words} handleDeleteWord={handleDeleteWord} />
        </div>
      </div>
    </div>
  );
}
