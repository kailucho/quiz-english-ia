import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Results from '../../features/quiz/components/Results';

const mockQuestions = [
  { questionText: 'What is the capital of France?', options: ['Paris', 'London', 'Berlin', 'Madrid'], correctAnswer: 'Paris' },
  { questionText: 'What is 2 + 2?', options: ['3', '4', '5', '6'], correctAnswer: '4' },
];

const mockUserAnswers = ['Paris', '4'];

const mockOnRestart = jest.fn();
const mockOnRetakeQuiz = jest.fn();

// Test rendering of results and feedback message

test('renders results and feedback message correctly', () => {
  render(<Results questions={mockQuestions} userAnswers={mockUserAnswers} onRestart={mockOnRestart} onRetakeQuiz={mockOnRetakeQuiz} />);
  const resultsTitle = screen.getByText(/Resultados/i);
  expect(resultsTitle).toBeInTheDocument();
  const scoreText = screen.getByText(/Obtuviste 2 de 2 respuestas correctas/i);
  expect(scoreText).toBeInTheDocument();
  const feedbackMessage = screen.getByText(/¡Excelente trabajo!/i);
  expect(feedbackMessage).toBeInTheDocument();
});

// Test onRestart and onRetakeQuiz callbacks

test('calls onRestart and onRetakeQuiz when buttons are clicked', () => {
  render(<Results questions={mockQuestions} userAnswers={mockUserAnswers} onRestart={mockOnRestart} onRetakeQuiz={mockOnRetakeQuiz} />);
  const restartButton = screen.getByText('Volver a unidad');
  fireEvent.click(restartButton);
  expect(mockOnRestart).toHaveBeenCalled();
  const retakeButton = screen.getByText('Reintentar cuestionario');
  fireEvent.click(retakeButton);
  expect(mockOnRetakeQuiz).toHaveBeenCalled();
});

// Test rendering with incorrect answers

test('renders correctly with incorrect answers', () => {
  const incorrectUserAnswers = ['London', '5'];
  render(<Results questions={mockQuestions} userAnswers={incorrectUserAnswers} onRestart={mockOnRestart} onRetakeQuiz={mockOnRetakeQuiz} />);
  const scoreText = screen.getByText(/Obtuviste 0 de 2 respuestas correctas/i);
  expect(scoreText).toBeInTheDocument();
  const feedbackMessage = screen.getByText(/No te desanimes, sigue practicando./i);
  expect(feedbackMessage).toBeInTheDocument();
});

// Test rendering with mixed answers

test('renders correctly with mixed answers', () => {
  const mixedUserAnswers = ['Paris', '5'];
  render(<Results questions={mockQuestions} userAnswers={mixedUserAnswers} onRestart={mockOnRestart} onRetakeQuiz={mockOnRetakeQuiz} />);
  const scoreText = screen.getByText(/Obtuviste 1 de 2 respuestas correctas/i);
  expect(scoreText).toBeInTheDocument();
  const feedbackMessage = screen.getByText(/Buen esfuerzo, pero puedes mejorar./i);
  expect(feedbackMessage).toBeInTheDocument();
});
