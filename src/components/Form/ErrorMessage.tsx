import React from 'react';
import styled from 'styled-components';

interface ErrorMessageProps {
  message?: string;
}

const ErrorContainer = styled.div`
  background-color: #f8d7da; // Light red
  color: #721c24; // Dark red
  border: 1px solid #f5c6cb; // Reddish border
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border-radius: 0.25rem;
  text-align: center;
`;

export const FormErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;
  return <ErrorContainer role="alert">{message}</ErrorContainer>;
};
