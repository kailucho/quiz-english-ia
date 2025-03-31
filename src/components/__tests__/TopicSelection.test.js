import React from 'react';
import { render, screen } from '@testing-library/react';
import TopicSelection from '../../features/quiz/components/TopicSelection';

test('renders TopicSelection component', () => {
  render(<TopicSelection />);
  const element = screen.getByText(/Niveles disponibles/i);
  expect(element).toBeInTheDocument();
});