import React from "react";
import { v4 as uuidv4 } from "uuid";

export default function QuizResult(props) {
  const { answerMap, quizStatus, totalQuestions, handleStartQuizAgain } = props;
  return (
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
              <td className={"quiz-result-status-" + quizStatus(key, value)}>
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
  );
}
