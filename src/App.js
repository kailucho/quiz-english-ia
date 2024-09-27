// src/App.js
import React, { useState } from "react";
import TopicSelection from "./components/TopicSelection";
import Question from "./components/Question";
import Results from "./components/Results";
import { getQuestions } from "./services/apiService";
import "./Loader.css"; // Asegúrate de importar los estilos del loader

function App() {
  const [step, setStep] = useState("selectTopic");
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSelectUnit = async (unit) => {
    setSelectedUnit(unit);
    setIsLoading(true);
    setError(null); // Reiniciamos el error

    try {
      const fetchedQuestions = await getQuestions(unit);

      if (fetchedQuestions.length > 0) {
        setQuestions(fetchedQuestions);
        setCurrentQuestionIdx(0); // Reiniciamos el índice de preguntas
        setUserAnswers([]); // Reiniciamos las respuestas del usuario
        setStep("question");
      } else {
        setError(
          "Hubo un error al obtener las preguntas. Por favor, intenta de nuevo."
        );
        setSelectedUnit(null);
      }
    } catch (error) {
      console.error("Error al obtener las preguntas:", error);
      setError(
        "Hubo un error al obtener las preguntas. Por favor, intenta de nuevo."
      );
      setSelectedUnit(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = (answer) => {
    setUserAnswers([...userAnswers, answer]);
    if (currentQuestionIdx + 1 < questions.length) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      setStep("results");
    }
  };

  const handleRestart = () => {
    // Reiniciamos el estado para volver a la selección de unidad
    setStep("selectTopic");
    setSelectedUnit(null);
    setQuestions([]);
    setCurrentQuestionIdx(0);
    setUserAnswers([]);
    setError(null);
  };

  return (
    <div>
      {step === "selectTopic" && !isLoading && (
        <TopicSelection onSelectUnit={handleSelectUnit} />
      )}
      {isLoading && (
        <div className='loader-container'>
          <div className='loader'></div>
          <p>Cargando preguntas...</p>
        </div>
      )}
      {step === "question" && !isLoading && (
        <Question
          question={questions[currentQuestionIdx]}
          onAnswer={handleAnswer}
        />
      )}
      {step === "results" && (
        <Results
          questions={questions}
          userAnswers={userAnswers}
          onRestart={handleRestart} // Pasamos la función de reinicio
        />
      )}
      {error && (
        <div className='error-message'>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default App;
