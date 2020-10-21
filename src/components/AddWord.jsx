import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const LOCAL_STORAGE_KEY = "spelling";

export default function AddWord() {
  const [words, setWords] = useState([]);
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

  function handleInput(e) {
    if (e.key === "Enter") {
      setWords([...words, e.target.value]);
      setCurrentValue("");
    }
  }

  return (
    <div className="App">
      <input
        type="text"
        value={currentValue}
        onChange={(e) => setCurrentValue(e.target.value)}
        onKeyDown={(e) => handleInput(e)}
      />
      <ol>
        {words.map((word) => (
          <li key={uuidv4()}>{word}</li>
        ))}
      </ol>
    </div>
  );
}
