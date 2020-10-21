import React, { useState, useEffect } from "react";

export default function Quiz() {
  const [quizRunning, setQuizRunning] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(10);
  const [words, setWords] = useState(["a", "b", "c"]); //
  const [answerMap, setAnswerMap] = useState([]);
  const [answer, setAnswer] = useState("");

  const randomWord = words[Math.floor(Math.random() * words.length)];

  function say(word) {
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(word));
  }

  function handleNextQuestion(word) {
    const tempWords = [...words];
    setWords(tempWords.filter((w) => w !== word));
  }

  function handlePlayAgain(word) {
    say(word);
  }

  function handleInputChange(value) {
    setAnswer(value);
  }

  function handleStartQuiz() {
    setQuizRunning(1);
    const allWords = JSON.parse(localStorage.getItem("spelling"));
    setWords(allWords.sort(() => 0.5 - Math.random()).slice(0, totalQuestions));
  }

  function handleStartQuizAgain() {
    setQuizRunning(0);
  }

  return (
    <div>
      {quizRunning ? (
        words.length > 0 ? (
          <div>
            <p>{randomWord}</p>

            <input
              type="text"
              value={answer}
              onChange={(e) => handleInputChange(e.target.value)}
            />

            <button onClick={() => handlePlayAgain(randomWord)}>Play</button>
            <button onClick={() => handleNextQuestion(randomWord)}>
              {words.length === 1 ? "Finish Quiz" : "Next Question"}
            </button>
          </div>
        ) : (
          <div>
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
