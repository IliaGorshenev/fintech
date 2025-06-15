import React from 'react';
import styled from 'styled-components';
import { LoadingSpinner } from '@/components/Promo/Styles.module';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
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
  background: ${(props) => 
    props.$variant === 'outline' ? 'transparent' : 
    props.$variant === 'secondary' ? 'var(--secondary)' : 
    'var(--primary)'
  };
  color: ${(props) => 
    props.$variant === 'outline' ? 'var(--primary)' : 
    props.$variant === 'secondary' ? 'var(--secondary-foreground)' : 
    'var(--primary-foreground)'
  };
  text-decoration: none;
  font-weight: 500;
  margin-top: 1.5rem;
  transition: all 0.2s ease;
  border: ${(props) => 
    props.$variant === 'outline' ? '3px solid var(--primary)' : 
    '1px solid transparent'
  };
  cursor: pointer;
  width: ${(props) => (props.$fullWidth ? '100%' : 'auto')};

  /* Dark mode specific styles using CSS variables */
  .dark & {
    opacity: 0.9;
    box-shadow: ${(props) => 
      props.$variant === 'outline' ? 'none' : 
      '0 0 10px rgba(52, 76, 255, 0.3)'
    };
  }

  &:hover {
    background-color: ${(props) => 
      props.$variant === 'outline' ? 'rgba(52, 76, 255, 0.1)' : 
      props.$variant === 'secondary' ? 'var(--secondary-foreground)' : 
      'var(--blue-900)'
    };
    transform: translateY(-2px);
    box-shadow: ${(props) => 
      props.$variant === 'outline' ? '0 4px 8px rgba(52, 76, 255, 0.1)' : 
      '0 4px 8px rgba(0, 0, 0, 0.1)'
    };
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
    background-color: ${(props) => 
      props.$variant === 'outline' ? 'transparent' : 
      'var(--disabled-background)'
    };
    color: var(--disabled-foreground);
    border-color: ${(props) => 
      props.$variant === 'outline' ? 'var(--disabled-foreground)' : 
      'transparent'
    };
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
