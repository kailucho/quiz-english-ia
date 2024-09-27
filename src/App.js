// src/App.js
import React, { useState } from "react";
import TopicSelection from "./components/TopicSelection";
import Question from "./components/Question";
import Results from "./components/Results";
import { getQuestions } from "./services/apiService";
import "./Loader.css"; // Asegúrate de importar los estilos del loader
import Header from "./components/Header";

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
    setError(null);

    try {
      const fetchedQuestions = await getQuestions(unit);

      if (fetchedQuestions.length > 0) {
        setQuestions(fetchedQuestions);
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
    setStep("selectTopic");
    setSelectedUnit(null);
    setQuestions([]);
    setCurrentQuestionIdx(0);
    setUserAnswers([]);
  };

  const handleRetakeQuiz = () => {
    setStep("question");
    setCurrentQuestionIdx(0);
    setUserAnswers([]);
  };

  return (
    <div>
      <Header />
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
          onRestart={handleRestart}
          onRetakeQuiz={handleRetakeQuiz}
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
