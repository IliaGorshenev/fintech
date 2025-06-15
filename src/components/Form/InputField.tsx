import React, { useState } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import styled from 'styled-components';
import { ErrorIcon, SuccessIcon } from '../../icons/icons';

interface InputFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, 'onChange'> {
  label?: string;
  registration?: UseFormRegisterReturn;
  error?: FieldError;
  success?: boolean;
  endContent?: React.ReactNode;
  rows?: number;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

// Add a styled textarea component
const StyledTextArea = styled.textarea<{ $hasIcon: boolean; $hasEndContent: boolean }>`
  width: 100%;
  min-height: 32px;
  padding: 8px 12px 8px 8px;
  padding-right: ${(props) => (props.$hasIcon || props.$hasEndContent ? '36px' : '12px')};
  align-items: center;
  align-self: stretch;
  box-sizing: border-box;
  border: 2px solid var(--grey-700);
  border-radius: 12px;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  background: var(--background);
  color: var(--foreground);
  resize: vertical;

  &:focus {
    outline: none;
    border-color: var(--primary);
  }

  &.error {
    border-color: var(--error);
  }

  &.success {
    border-color: #79b91a;
  }
`;

const InputWrapper = styled.div`
  width: 100%;
`;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--foreground);
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;
const StyledInput = styled.input<{ $hasIcon: boolean; $hasEndContent: boolean }>`
  width: 100%;
  height: 42px;
  min-height: 32px;
  padding: 8px 12px 8px 8px;
  padding-right: ${(props) => (props.$hasIcon || props.$hasEndContent ? '36px' : '12px')};
  align-items: center;
  align-self: stretch;
  box-sizing: border-box;
  border: 2px solid var(--grey-700);
  border-radius: 12px;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  background: var(--background);
  color: var(--foreground);

  &:focus {
    outline: none;
    border-color: var(--primary);
  }

  &.error {
    border-color: var(--error);
  }

  &.success {
    border-color: #79b91a;
  }
`;

const ErrorText = styled.p`
  color: var(--error);
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  margin-top: 0.25rem;
`;

const IconContainer = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

const EndContentContainer = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
`;
type InputComponentType = typeof StyledInput | typeof StyledTextArea;

export const InputField: React.FC<InputFieldProps> = ({ label, registration, error, success, type = 'text', endContent, rows, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasIcon = Boolean(error || success);
  const hasEndContent = Boolean(endContent);
  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsFocused(true);
    if (rest.onFocus) rest.onFocus(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsFocused(false);
    if (registration?.onBlur) registration.onBlur(e);
    if (rest.onBlur) rest.onBlur(e);
  };

  const inputClassName = error ? 'error' : success ? 'success' : '';

  // Combine registration props with rest props
  const inputProps = registration ? { ...registration, ...rest } : rest;

  return (
    <InputWrapper>
      {label && <StyledLabel htmlFor={registration?.name || rest.id || rest.name}>{label}</StyledLabel>}
      <InputContainer>
        {type === 'textarea' ? (
          <StyledTextArea
            id={registration?.name || rest.id || rest.name}
            {...(inputProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            className={inputClassName}
            aria-invalid={error ? 'true' : 'false'}
            $hasIcon={hasIcon && !hasEndContent}
            $hasEndContent={hasEndContent}
            onFocus={handleFocus}
            onBlur={handleBlur}
            rows={rows}
          />
        ) : (
          <StyledInput
            id={registration?.name || rest.id || rest.name}
            type={type}
            {...(inputProps as React.InputHTMLAttributes<HTMLInputElement>)}
            className={inputClassName}
            aria-invalid={error ? 'true' : 'false'}
            $hasIcon={hasIcon && !hasEndContent}
            $hasEndContent={hasEndContent}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        )}

        {hasEndContent ? (
          <EndContentContainer>{endContent}</EndContentContainer>
        ) : hasIcon ? (
          <IconContainer>{error ? <ErrorIcon /> : success ? <SuccessIcon /> : null}</IconContainer>
        ) : null}
      </InputContainer>
      {error && <ErrorText role="alert">{error.message}</ErrorText>}
    </InputWrapper>
  );
};
