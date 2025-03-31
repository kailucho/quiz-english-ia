import React from 'react';
import { render } from '@testing-library/react';
import Notification from './Notification';

test('renders Notification component with correct message', () => {
  const { getByText } = render(<Notification message="Success!" type="success" />);
  const notificationElement = getByText(/Success!/i);
  expect(notificationElement).toBeInTheDocument();
  expect(notificationElement).toHaveClass('success');
});