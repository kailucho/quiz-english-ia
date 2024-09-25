// src/App.js
import React, { useState } from "react";
import TopicSelection from "./components/TopicSelection";
import Question from "./components/Question";
import Results from "./components/Results";
import { getQuestions } from "./services/apiService";

function App() {
  const [step, setStep] = useState("selectTopic");
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  const handleSelectUnit = async (unit) => {
    setSelectedUnit(unit);
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
      {step === "selectTopic" && (
        <TopicSelection onSelectUnit={handleSelectUnit} />
      )}
      {step === "question" && (
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
