import React from 'react';
import styled from 'styled-components';
import { LoadingSpinner } from '@/components/Promo/Styles.module';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
  children: React.ReactNode;
}

const StyledButton = styled.button<{ $fullWidth?: boolean; $variant?: string }>`
  display: flex;
  height: 48px;
  padding: 0px 24px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  border-radius: 12px;
  background: var(--primary);
  color: var(--primary-foreground);
  text-decoration: none;
  font-weight: 500;
  margin-top: 1.5rem;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  cursor: pointer;
  width: ${(props) => (props.$fullWidth ? '100%' : 'auto')};

  /* Dark mode specific styles using CSS variables */
  .dark & {
    opacity: 0.9;
    box-shadow: 0 0 10px rgba(52, 76, 255, 0.3);
  }

  &:hover {
    background-color: var(--blue-900);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    opacity: 1;
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    background-color: var(--disabled-background);
    color: var(--disabled-foreground)
  }

  svg {
    margin-right: 0.5rem;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Button: React.FC<ButtonProps> = ({
  isLoading = false,
  variant = 'primary',
  fullWidth = false,
  children,
  ...props
}) => {
  return (
    <StyledButton $fullWidth={fullWidth} $variant={variant} disabled={isLoading || props.disabled} {...props}>
      {isLoading ? (
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      ) : (
        children
      )}
    </StyledButton>
  );
};
