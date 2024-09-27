// src/App.js
import React, { useState } from "react";
import TopicSelection from "./components/TopicSelection";
import Question from "./components/Question";
import Results from "./components/Results";
import { getQuestions } from "./services/apiService";
import "./Loader.css"; // Importamos los estilos del loader

function App() {
  const [step, setStep] = useState("selectTopic");
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Estado para el loader

  const handleSelectUnit = async (unit) => {
    setSelectedUnit(unit);
    setIsLoading(true); // Iniciamos el loader

    try {
      const fetchedQuestions = await getQuestions(unit);

      if (fetchedQuestions.length > 0) {
        setQuestions(fetchedQuestions);
        setStep("question");
      } else {
        alert(
          "Hubo un error al obtener las preguntas. Por favor, intenta de nuevo."
        );
        setSelectedUnit(null);
      }
    } catch (error) {
      console.error("Error al obtener las preguntas:", error);
      alert(
        "Hubo un error al obtener las preguntas. Por favor, intenta de nuevo."
      );
      setSelectedUnit(null);
    } finally {
      setIsLoading(false); // Detenemos el loader
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
        <Results questions={questions} userAnswers={userAnswers} />
      )}
    </div>
  );
}

export default App;
