import React from "react";
import "./Results.css";

const Results = ({
  questions = [],
  userAnswers = [],
  onRestart = () => {},
  onRetakeQuiz = () => {},
}) => {
  const score = questions.reduce(
    (acc, question, index) =>
      acc + (question.correctAnswer === userAnswers[index] ? 1 : 0),
    0
  );
  const percentage = ((score / questions.length) * 100).toFixed(0);

  const getFeedbackMessage = () => {
    if (percentage >= 80) {
      return "¡Excelente trabajo!";
    } else if (percentage >= 50) {
      return "Buen esfuerzo, pero puedes mejorar.";
    } else {
      return "No te desanimes, sigue practicando.";
    }
  };

  return (
    <div className="results-container" role="region" aria-labelledby="results-title">
      <h1 id="results-title" className="results-title">Resultados del cuestionario</h1>

      <div className="score-card">
        <h2 className="score-percentage">{percentage}%</h2>
        <p className="score-text">
          Obtuviste {score} de {questions.length} respuestas correctas
        </p>
        <p className="feedback-message">{getFeedbackMessage()}</p>
      </div>

      <div className="buttons-container">
        <button className="restart-button" onClick={onRestart}>
          Volver a unidad
        </button>
        <button className="retake-button" onClick={onRetakeQuiz}>
          Reintentar cuestionario
        </button>
      </div>

      <ul className="results-list">
        {questions.map((question, index) => {
          const isCorrect = question.correctAnswer === userAnswers[index];
          return (
            <li
              key={index}
              className={`result-item ${isCorrect ? "correct" : "incorrect"}`}
            >
              <p className="question-text">{question.questionText}</p>
              <p className="user-answer">
                <strong>Tu respuesta:</strong> {userAnswers[index]}
              </p>
              {!isCorrect && (
                <p className="correct-answer">
                  <strong>Respuesta correcta:</strong> {question.correctAnswer}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Results;
