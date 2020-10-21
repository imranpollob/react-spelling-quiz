import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { misspelled } from "./MisspelledWords";

const LOCAL_STORAGE_KEY = "spelling";

export default function AddWord() {
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
    setWords([...words, word]);
    setCurrentValue("");
  }

  function handleInput(e) {
    if (e.key === "Enter") {
      handleAddWord(e.target.value);
    }
  }

  return (
    <div className="add-word">
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
        <ol>
          {words.sort().map((word) => (
            <li key={uuidv4()}>{word}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}
