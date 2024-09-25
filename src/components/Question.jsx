// src/components/Question/Question.jsx
import React from "react";

const Question = ({ question, onAnswer }) => {
  const handleAnswer = (option) => {
    onAnswer(option);
  };

  return (
    <div>
      <h2>{question.questionText}</h2>
      <ul>
        {question.options.map((option) => (
          <li key={option}>
            <button onClick={() => handleAnswer(option)}>{option}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
