// src/components/Results/Results.jsx
import React from "react";

const Results = ({ questions, userAnswers }) => {
  const score = questions.reduce((acc, question, index) => {
    return acc + (question.correctAnswer === userAnswers[index] ? 1 : 0);
  }, 0);

  return (
    <div>
      <h1>Resultados</h1>
      <p>
        Obtuviste {score} de {questions.length} correctas.
      </p>
      <ul>
        {questions.map((question, index) => {
          const isCorrect = question.correctAnswer === userAnswers[index];
          return (
            <li key={index} style={{ color: isCorrect ? "green" : "red" }}>
              <p>{question.questionText}</p>
              <p>Tu respuesta: {userAnswers[index]}</p>
              {!isCorrect && (
                <p>Respuesta correcta: {question.correctAnswer}</p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Results;
