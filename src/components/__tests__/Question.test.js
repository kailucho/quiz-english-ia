import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Question from '../../features/quiz/components/Question';

const mockQuestion = {
  questionText: 'What is the capital of France?',
  options: ['Paris', 'London', 'Berlin', 'Madrid'],
  correctAnswer: 'Paris',
};

const mockOnAnswer = jest.fn();

// Test rendering of question and options

test('renders question and options correctly', () => {
  render(<Question question={mockQuestion} onAnswer={mockOnAnswer} />);
  const questionElement = screen.getByText(/What is the capital of France?/i);
  expect(questionElement).toBeInTheDocument();
  mockQuestion.options.forEach((option) => {
    const optionElement = screen.getByText(option);
    expect(optionElement).toBeInTheDocument();
  });
});

// Test onAnswer callback with correct option

test('calls onAnswer with correct option', () => {
  render(<Question question={mockQuestion} onAnswer={mockOnAnswer} />);
  const optionElement = screen.getByText('Paris');
  fireEvent.click(optionElement);
  expect(mockOnAnswer).toHaveBeenCalledWith('Paris');
});

// Test onAnswer callback with incorrect option

test('calls onAnswer with incorrect option', () => {
  render(<Question question={mockQuestion} onAnswer={mockOnAnswer} />);
  const optionElement = screen.getByText('London');
  fireEvent.click(optionElement);
  expect(mockOnAnswer).toHaveBeenCalledWith('London');
});

// Test rendering with no options

test('renders correctly with no options', () => {
  const questionWithoutOptions = { ...mockQuestion, options: [] };
  render(<Question question={questionWithoutOptions} onAnswer={mockOnAnswer} />);
  const questionElement = screen.getByText(/What is the capital of France?/i);
  expect(questionElement).toBeInTheDocument();
  const noOptionsElement = screen.queryByRole('button');
  expect(noOptionsElement).toBeNull();
});
