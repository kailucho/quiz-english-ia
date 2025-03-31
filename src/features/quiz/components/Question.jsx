import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaCheck, FaTimes } from "react-icons/fa";
import "./Question.css";

const Question = ({
  question = { questionText: "", options: [], correctAnswer: "" },
  onAnswer = () => {},
  onNext = () => {},
}) => {
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);

  // Reinicia los estados cuando cambia la pregunta
  useEffect(() => {
    setSelected(null);
    setAnswered(false);
  }, [question]);

  const handleOptionClick = (option) => {
    if (!answered) {
      setSelected(option);
      setAnswered(true);
      onAnswer(option);
    }
  };

  const isCorrect = selected === question.correctAnswer;

  return (
    <div className="question-container" role="form">
      <h2 className="question-text">{question.questionText}</h2>
      <div className="options-container">
        {question.options.map((option, index) => (
          <button
            key={index}
            className="option-button"
            onClick={() => handleOptionClick(option)}
            aria-label={`Option ${option}`}
            disabled={answered}
          >
            {option}
          </button>
        ))}
      </div>

      {answered && (
        <div
          className={`feedback-container ${
            isCorrect ? "correct" : "incorrect"
          }`}
        >
          {isCorrect ? (
            <>
              <span className="feedback-icon">
                <FaCheck />
              </span>
              <span className="feedback-text">¡Correcto!</span>
            </>
          ) : (
            <>
              <span className="feedback-icon">
                <FaTimes />
              </span>
              <span className="feedback-text">
                Incorrecto. La respuesta correcta es:{" "}
                {question.correctAnswer}
              </span>
            </>
          )}
        </div>
      )}

      {answered && (
        <button className="next-button" onClick={onNext}>
          Siguiente pregunta
        </button>
      )}
    </div>
  );
};

Question.propTypes = {
  question: PropTypes.shape({
    questionText: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    correctAnswer: PropTypes.string.isRequired,
  }).isRequired,
  onAnswer: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
};

export default Question;
