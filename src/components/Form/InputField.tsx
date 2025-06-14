import React, { useState } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import styled from 'styled-components';
import { ErrorIcon, SuccessIcon } from '../icons';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
  success?: boolean;
  endContent?: React.ReactNode;
}

const InputWrapper = styled.div`
  margin-bottom: 1rem;
  width: 100%;
`;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--secondary_300, #3f3d51);
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
  border: 1px solid var(--grayscale_400, #a1a1aa);
  border-radius: 8px;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  color: var(--grayscale_400, #a1a1aa);

  &:focus {
    outline: none;
    border-color: var(--primary);
  }

  &.error {
    border-color: var(--error, #e51978);
  }

  &.success {
    border-color: #79b91a;
  }
`;

const ErrorText = styled.p`
  color: var(--error, #e51978);
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
export const InputField: React.FC<InputFieldProps> = ({ label, registration, error, success, type = 'text', endContent, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasIcon = Boolean(error || success);
  const hasEndContent = Boolean(endContent);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if (rest.onFocus) rest.onFocus(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (rest.onBlur) rest.onBlur(e);
  };

  const inputClassName = error ? 'error' : success ? 'success' : '';

  return (
    <InputWrapper>
      {label && <StyledLabel htmlFor={registration.name}>{label}</StyledLabel>}
      <InputContainer>
        <StyledInput
          id={registration.name}
          type={type}
          {...registration}
          {...rest}
          className={inputClassName}
          aria-invalid={error ? 'true' : 'false'}
          $hasIcon={hasIcon && !hasEndContent}
          $hasEndContent={hasEndContent}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
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
