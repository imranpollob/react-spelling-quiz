import React from "react";
import { v4 as uuidv4 } from "uuid";

export default function WordList({ words, handleDeleteWord }) {
  return (
    <ol>
      {words.sort().map((word) => (
        <li key={uuidv4()}>
          {word}{" "}
          <button
            className="btn btn--danger--outlined btn--xm--rounded ml-1"
            onClick={() => handleDeleteWord(word)}
          >
            &times;
          </button>
        </li>
      ))}
    </ol>
  );
}
