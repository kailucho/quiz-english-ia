import React, { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./features/auth/context/AuthContext";
import { Header, Login, Question, Results, TopicSelection } from "./components";
import Loader from "./Loader";
import useFetchQuestions from "./features/quiz/hooks/useFetchQuestions";

function AppContent() {
  const { isAuthenticated, login } = useAuth();
  const { questions, isLoading, error, fetchQuestionsForUnit } = useFetchQuestions();

  // Pasos de navegación: 'login',  'selectTopic', 'question', 'results'
  const [step, setStep] = useState(isAuthenticated ? "selectTopic" : "login");
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [language, setLanguage] = useState("en");

  // Al seleccionar una unidad se obtienen las preguntas
  const handleSelectUnit = async (unit, language) => {
    await fetchQuestionsForUnit(unit, language);
  };

  // Cuando se cargan las preguntas, se cambia el paso a 'question'
  useEffect(() => {
    if (questions.length > 0) {
      setStep("question");
    }
  }, [questions]);

  // onAnswer: almacena la respuesta seleccionada
  const handleAnswer = (answer) => {
    setUserAnswers([...userAnswers, answer]);
  };

  // onNext: avanza a la siguiente pregunta o muestra los resultados
  const handleNext = () => {
    if (currentQuestionIdx + 1 < questions.length) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      setStep("results");
    }
  };

  const handleRestart = () => {
    setStep("selectTopic");
    setCurrentQuestionIdx(0);
    setUserAnswers([]);
  };

  const handleRetakeQuiz = () => {
    setStep("question");
    setCurrentQuestionIdx(0);
    setUserAnswers([]);
  };

  const handleLogin = (token, name) => {
    login(token, name);
    setStep("selectTopic");
  };

  const handleLogout = () => {
    setStep("login");
  };

  return (
    <div>
      <Header onLogout={handleLogout} language={language} setLanguage={setLanguage} />

      {step === "login" && <Login onLoginSuccess={handleLogin} />}
      {step === "selectTopic" && isAuthenticated && !isLoading && (
        <TopicSelection onSelectUnit={handleSelectUnit} language={language} />
      )}
      {isLoading && <Loader />}
      {step === "question" && !isLoading && (
        <Question
          question={questions[currentQuestionIdx]}
          onAnswer={handleAnswer}
          onNext={handleNext}
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
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
