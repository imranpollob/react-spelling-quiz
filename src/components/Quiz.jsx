import React, { useState, useEffect } from "react";
import shuffleArray from "./../helper-functions/array_shuffle";
import say from "./../helper-functions/say";
import { misspelled } from "../helper-functions/MisspelledWords";
import QuizNew from "./QuizNew";
import QuizResult from "./QuizResult";

const LOCAL_STORAGE_KEY = "spelling";

export default function Quiz() {
  const [quizRunning, setQuizRunning] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(10);
  const [words, setWords] = useState(misspelled);
  const [answerMap, setAnswerMap] = useState({});
  const [answer, setAnswer] = useState("");
  const [currentWord, CurrentWord] = useState();

  useEffect(() => {
    const word_json = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (!word_json) {
      const sortedWords = words.sort();
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sortedWords));
    }
  }, [words]);

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
    let tempWords = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    tempWords = shuffleArray(tempWords).slice(0, totalQuestions);
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
        {!quizRunning ? (
          <QuizNew
            totalQuestions={totalQuestions}
            setTotalQuestions={setTotalQuestions}
            handleStartQuiz={handleStartQuiz}
          />
        ) : words.length > 0 ? (
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
                LISTEN
              </button>
              <button
                className="btn btn--success"
                onClick={() => handleNextQuestion()}
              >
                {words.length === 1 ? "Finish Quiz" : "NEXT"}
              </button>
            </div>
          </>
        ) : (
          <QuizResult
            answerMap={answerMap}
            quizStatus={quizStatus}
            totalQuestions={totalQuestions}
            handleStartQuizAgain={handleStartQuizAgain}
          />
        )}
      </div>
    </div>
  );
}
