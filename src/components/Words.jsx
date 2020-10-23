import React, { useState, useEffect } from "react";
import { misspelled } from "./MisspelledWords";
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
    <div className="add-word">
      <Toast />
      <div className="add-word-container">
        <div className="input-container">
          <label htmlFor="word">Add a new word to the list</label>
          <br />
          <input
            name="word"
            type="text"
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            onKeyDown={(e) => handleInput(e)}
          />
          <button
            className="btn btn--primary add-word__button"
            onClick={() => handleAddWord(currentValue)}
          >
            Add
          </button>
        </div>
        <WordList words={words} handleDeleteWord={handleDeleteWord} />
      </div>
    </div>
  );
}
