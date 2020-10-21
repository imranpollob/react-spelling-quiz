import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { misspelled } from "./MisspelledWords";
import shuffleArray from "./../helpers/array_shuffle";
import say from "./../helpers/say";

export default function Quiz() {
  const [quizRunning, setQuizRunning] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(10);
  const [words, setWords] = useState([]);
  const [answerMap, setAnswerMap] = useState({});
  const [answer, setAnswer] = useState("");
  const [currentWord, CurrentWord] = useState();

  function handleNextQuestion() {
    setAnswerMap({ ...answerMap, [currentWord]: answer });
    let tempWords = [...words];
    tempWords = tempWords.filter((w) => w !== currentWord);
    setWords(tempWords);
    const selectedWord = tempWords[0];
    CurrentWord(selectedWord);
    say(selectedWord);
    setAnswer("");
  }

  function handlePlayAgain() {
    say(currentWord);
  }

  function handleInputChange(value) {
    setAnswer(value);
  }

  function handleStartQuiz() {
    setQuizRunning(1);
    setAnswerMap({});
    // let tempWords = JSON.parse(localStorage.getItem("spelling"));
    let tempWords = shuffleArray(misspelled).slice(0, totalQuestions);
    setWords(tempWords);
    const selectedWord = tempWords[0];
    CurrentWord(selectedWord);
    say(selectedWord);
  }

  function handleStartQuizAgain() {
    setQuizRunning(0);
  }

  function handleInput(e) {
    if (e.key === "Enter") {
      setAnswer(e.target.value);
      handleNextQuestion();
    }
  }
  return (
    <div>
      {quizRunning ? (
        words.length > 0 ? (
          <div>
            <div>
              {totalQuestions - words.length + 1} of {totalQuestions}
            </div>
            <input
              type="text"
              value={answer}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={(e) => handleInput(e)}
            />

            <button onClick={() => handlePlayAgain()}>Play</button>
            <button onClick={() => handleNextQuestion()}>
              {words.length === 1 ? "Finish Quiz" : "Next Question"}
            </button>
          </div>
        ) : (
          <div>
            <table>
              <thead>
                <tr>
                  <th>Actual Word</th>
                  <th>Your Answer</th>
                  <th>Result</th>
                </tr>
              </thead>

              <tbody>
                {Object.entries(answerMap).map(([key, value]) => (
                  <tr key={uuidv4()}>
                    <td>{key}</td>
                    <td>{value}</td>
                    <td>
                      {key.toLowerCase() === value.toLowerCase()
                        ? "Correct"
                        : "Incorrect"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div>
              Got{" "}
              {
                Object.entries(answerMap).filter(
                  ([key, value]) => key.toLowerCase() === value.toLowerCase()
                ).length
              }{" "}
              of {totalQuestions}
            </div>

            <button onClick={() => handleStartQuizAgain()}>
              Start Again !!!
            </button>
          </div>
        )
      ) : (
        <div>
          <select
            value={totalQuestions}
            onChange={(e) => setTotalQuestions(e.target.value)}
          >
            <option value={2}>2</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={20}>30</option>
            <option value={20}>50</option>
          </select>

          <button onClick={() => handleStartQuiz()}>Start Now</button>
        </div>
      )}
    </div>
  );
}
