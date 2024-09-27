import React from "react";
import "./Results.css"; // Asegúrate de tener los estilos

const Results = ({ questions, userAnswers, onRestart }) => {
  const score = questions.reduce((acc, question, index) => {
    return acc + (question.correctAnswer === userAnswers[index] ? 1 : 0);
  }, 0);

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
    <div className='results-container'>
      <h1 className='results-title'>Resultados</h1>
      <div className='score-card'>
        <h2>
          Obtuviste {score} de {questions.length} respuestas correctas
        </h2>
        <p>Puntuación: {percentage}%</p>
        <p className='feedback-message'>{getFeedbackMessage()}</p>
        <button className='restart-button' onClick={onRestart}>
          Volver a seleccionar unidad
        </button>
      </div>
      <ul className='results-list'>
        {questions.map((question, index) => {
          const isCorrect = question.correctAnswer === userAnswers[index];
          return (
            <li
              key={index}
              className={`result-item ${isCorrect ? "correct" : "incorrect"}`}
            >
              <p className='question-text'>{question.questionText}</p>
              <p className='user-answer'>
                <strong>Tu respuesta:</strong> {userAnswers[index]}
              </p>
              {!isCorrect && (
                <p className='correct-answer'>
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
