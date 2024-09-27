import React from "react";
import "./Question.css"; // Importamos los estilos

const Question = ({ question, onAnswer }) => {
  return (
    <div className='question-container'>
      <h2 className='question-text'>{question.questionText}</h2>
      <div className='options-container'>
        {question.options.map((option) => (
          <button
            key={option}
            className='option-button'
            onClick={() => onAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
