import React from 'react';
import styled from 'styled-components';
// Assuming Hero UI has a Button component, otherwise, create a basic styled button
// import { Button as HeroButton } from '@heroicons/react'; // Adjust import

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  background-color: #007bff; // Example color
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  opacity: ${(props) => (props.disabled || props.isLoading ? 0.7 : 1)};
  transition: background-color 0.2s ease-in-out;

  &:hover:not(:disabled):not(:isLoading) {
    background-color: #0056b3; // Darker shade on hover
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  isLoading,
  disabled,
  ...rest
}) => {
  return (
    <StyledButton {...rest} disabled={disabled || isLoading}>
      {isLoading ? 'Loading...' : children}
    </StyledButton>
  );
};
