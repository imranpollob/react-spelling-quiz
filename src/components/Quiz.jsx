import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { misspelled } from "./MisspelledWords";
import shuffleArray from "./../helper-functions/array_shuffle";
import say from "./../helper-functions/say";

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

  function quizStatus(key, value) {
    return key.trim().toLowerCase() === value.trim().toLowerCase()
      ? "Correct"
      : "Incorrect";
  }

  return (
    <div className="quiz">
      <div className="quiz-container">
        {quizRunning ? (
          words.length > 0 ? (
            <>
              <div className="quiz-number">
                Question No {totalQuestions - words.length + 1} of{" "}
                {totalQuestions}
              </div>
              <div className="quiz-control">
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onKeyDown={(e) => handleInput(e)}
                />
                <br />
                <button
                  className="btn btn--primary"
                  onClick={() => handlePlayAgain()}
                >
                  Play
                </button>
                <button
                  className="btn btn--success"
                  onClick={() => handleNextQuestion()}
                >
                  {words.length === 1 ? "Finish Quiz" : "Next Question"}
                </button>
              </div>
            </>
          ) : (
            <div className="quiz-result">
              <table className="quiz-table">
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
                      <td>{key.toLowerCase()}</td>
                      <td>{value.toLowerCase()}</td>
                      <td
                        className={
                          "quiz-result-status-" + quizStatus(key, value)
                        }
                      >
                        {quizStatus(key, value)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="quiz-score">
                Got{" "}
                {
                  Object.entries(answerMap).filter(
                    ([key, value]) =>
                      key.trim().toLowerCase() === value.trim().toLowerCase()
                  ).length
                }{" "}
                out of {totalQuestions}
              </div>

              <div className="quiz-container__start-again-btn-container">
                <button
                  className="btn btn--success"
                  onClick={() => handleStartQuizAgain()}
                >
                  Start Again !!!
                </button>
              </div>
            </div>
          )
        ) : (
          <div className="question-selector">
            <div className="question-selector__input-container">
              <label htmlFor="totalQuestions">
                Select numbers of words to judge
              </label>
              <select
                name="totalQuestions"
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
            </div>
            <br />

            <div className="quiz-instructions">
              <ul>
                <li>
                  You have to write the word on input box{" "}
                  <span className="underline bold">as you listen</span>
                </li>
                <li>
                  You may press <span className="button">PLAY</span> to listen
                  the word again
                </li>
                <li>
                  You may press <span className="button">Next QUESTION</span> or
                  press <span className="button">ENTER</span> key to go to the
                  next question
                </li>
              </ul>
            </div>

            <button
              className="btn btn--primary btn"
              onClick={() => handleStartQuiz()}
            >
              Start Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
