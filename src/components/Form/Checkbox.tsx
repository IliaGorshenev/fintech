import React from 'react';
import { keyframes, styled } from 'styled-components';

export const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
`;
export const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 12px;
  position: relative;
`;

export const CheckboxInput = styled.input<{ $error?: boolean }>`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

export const CheckboxLabel = styled.label<{ $error?: boolean }>`
  display: flex;
  align-items: flex-start;
  color: var(--secondary_300, #3f3d51);
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  cursor: pointer;
  user-select: none;

  a {
    color: var(--primary);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const CheckboxCustom = styled.span<{ $checked: boolean; $error?: boolean }>`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  border-radius: 6px;
  border: 2px solid ${(props) => (props.$error ? 'var(--error)' : props.$checked ? 'var(--primary)' : 'var(--grey-700)')};
  background-color: ${(props) => (props.$checked ? 'var(--primary)' : 'transparent')};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
  transition: all 0.2s ease;
  animation: ${(props) => (props.$error ? shake : 'none')} 0.5s ease;

  &:after {
    content: '';
    display: ${(props) => (props.$checked ? 'block' : 'none')};
    width: 6px;
    height: 10px;
    border: solid #ffffff;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    margin-bottom: 2px;
  }
`;

export const CheckboxText = styled.span`
  padding-top: 2px;
  color: var(--foreground);
`;

interface CheckboxProps {
  id: string;
  label: string | React.ReactNode;
  checked: boolean;
  onChange: (event: React.ChangeEvent) => void;
  error?: boolean;
  errorMessage?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ id, label, checked, onChange, error, errorMessage }) => {
  return (
    <CheckboxContainer>
      <CheckboxInput type="checkbox" id={id} checked={checked} onChange={onChange} $error={error} />
      <CheckboxLabel htmlFor={id} $error={error}>
        <CheckboxCustom $checked={checked} $error={error} />
        <CheckboxText>{label}</CheckboxText>
      </CheckboxLabel>
      {error && errorMessage && <ErrorText role="alert">{errorMessage}</ErrorText>}
    </CheckboxContainer>
  );
};

const ErrorText = styled.p`
  color: var(--error);
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  margin-top: 4px;
  margin-left: 28px;
`;

interface CheckboxGroupProps {
  children: React.ReactNode;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ children }) => {
  return <div>{children}</div>;
};
