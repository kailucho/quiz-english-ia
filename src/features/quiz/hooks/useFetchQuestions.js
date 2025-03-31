import { useState } from 'react';
import { fetchQuestions } from '../../../services/apiService'; // Adjust the import path as necessary

const useFetchQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchQuestionsForUnit = async (unit,language) => {
    setIsLoading(true);
    setError(null);

    if (!unit || !unit.content) {
      setError('La unidad seleccionada no es válida. Por favor, intenta de nuevo.');
      setIsLoading(false);
      return;
    }

    const requestBody = {
      language: language,
      selectedContent: unit.content.trim(),
    };

    try {
      const fetchedQuestions = await fetchQuestions(requestBody);
      if (fetchedQuestions.length > 0) {
        setQuestions(fetchedQuestions);
      } else {
        setError('Hubo un error al obtener las preguntas. Por favor, intenta de nuevo.');
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
        'Hubo un error al obtener las preguntas. Por favor, intenta de nuevo.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { questions, isLoading, error, fetchQuestionsForUnit };
};

export default useFetchQuestions;