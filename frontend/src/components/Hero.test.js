import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Hero from './Hero';  

test('should render the form and accept input', () => {
  render(<Hero />);

  // Get input element by placeholder text
  const inputElement = screen.getByPlaceholderText(/Enter industry/i);
  fireEvent.change(inputElement, { target: { value: 'Technology' } });

  // Assert that the input field contains the value 'Technology'
  expect(inputElement.value).toBe('Technology');
});

test('should display an error when no industry is entered', () => {
  render(<Hero />);

  // Get submit button and click it
  const submitButton = screen.getByText(/Submit/i);
  fireEvent.click(submitButton);

  // Assert that the error message is displayed
  const errorMessage = screen.getByText(/Industry is required/i);
  expect(errorMessage).toBeInTheDocument();
});


