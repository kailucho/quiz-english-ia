import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../common/Header';

jest.mock('../../features/auth/context/AuthContext', () => ({
  useAuth: () => ({
    isAuthenticated: true,
    logout: jest.fn(),
  }),
}));

describe('Header Component', () => {
  test('renders language selector buttons', () => {
    render(<Header />);

    // Check if buttons are rendered
    const englishOption = screen.getByText('Inglés');
    const portugueseOption = screen.getByText('Portugués');
    expect(englishOption).toBeInTheDocument();
    expect(portugueseOption).toBeInTheDocument();
  });
});
