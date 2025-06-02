import React from 'react';
import { UseFormRegisterReturn, FieldError } from 'react-hook-form';
import styled from 'styled-components';
// Assuming Hero UI has an Input component, otherwise, create a basic styled input
// import { Input as HeroInput } from '@heroicons/react'; // Adjust import as per Hero UI

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
  // Add any specific Hero UI props if needed
}

const InputWrapper = styled.div`
  margin-bottom: 1rem;
  width: 100%;
`;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #333; // Example color
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc; // Example border
  border-radius: 4px;
  box-sizing: border-box; /* Ensures padding doesn't affect overall width */

  &:focus {
    border-color: #007bff; // Example focus color
    outline: none;
  }

  &.error {
    border-color: red;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

export const InputField: React.FC<InputFieldProps> = ({
  label,
  registration,
  error,
  type = 'text',
  ...rest
}) => {
  return (
    <InputWrapper>
      {label && <StyledLabel htmlFor={registration.name}>{label}</StyledLabel>}
      <StyledInput
        id={registration.name}
        type={type}
        {...registration}
        {...rest}
        className={error ? 'error' : ''}
        aria-invalid={error ? "true" : "false"}
      />
      {error && <ErrorText role="alert">{error.message}</ErrorText>}
    </InputWrapper>
  );
};
