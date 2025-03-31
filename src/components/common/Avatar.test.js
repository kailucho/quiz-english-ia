import React from 'react';
import { render } from '@testing-library/react';
import Avatar from './Avatar';

test('renders Avatar component with correct props', () => {
  const { getByLabelText } = render(<Avatar aria-label="User Avatar" />);
  const avatarElement = getByLabelText(/User Avatar/i);
  expect(avatarElement).toBeInTheDocument();
});