import React from "react";

export default function QuizNew({
  totalQuestions,
  setTotalQuestions,
  handleStartQuiz,
}) {
  return (
    <div className="question-selector">
      <div className="question-selector__input-container">
        <label htmlFor="totalQuestions">Select numbers of words to judge</label>
        <select
          name="totalQuestions"
          value={totalQuestions}
          onChange={(e) => setTotalQuestions(e.target.value)}
        >
          <option value={5}>5</option>
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
            You may press <span className="button">LISTEN</span> to listen the
            word again
          </li>
          <li>
            You may press <span className="button">NEXT</span> or press{" "}
            <span className="button">ENTER</span> key to go to the next question
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
  );
}
