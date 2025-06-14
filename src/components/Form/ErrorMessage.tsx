import { ErrorIcon } from '@/components/icons';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
interface ErrorMessageProps {
  message?: string;
  duration?: number; // Duration in milliseconds before auto-hiding
  onClose?: () => void; // Add this callback
}

const ErrorTooltip = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--error-light, #ffebf2);
  color: var(--error, #e51978);
  border: 1px solid var(--error, #e51978);
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  position: relative;
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const IconContainer = styled.div`
  margin-right: 0.75rem;
  display: flex;
  align-items: center;
`;

const MessageText = styled.div`
  flex: 1;
  font-size: 14px;
  font-weight: 500;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: var(--error, #e51978);
  cursor: pointer;
  font-size: 18px;
  padding: 0;
  margin-left: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;

  &:hover {
    opacity: 0.8;
  }

  &:focus {
    outline: none;
  }
`;

export const FormErrorMessage: React.FC<ErrorMessageProps> = ({ message, duration = 5000, onClose }) => {
  const [visible, setVisible] = useState(!!message);

  useEffect(() => {
    setVisible(!!message);

    if (message && duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose?.(); // Call onClose when auto-hiding
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  if (!message || !visible) return null;

  const handleClose = () => {
    setVisible(false);
    onClose?.(); // Call onClose when manually closing
  };

  return (
    <ErrorTooltip role="alert">
      <IconContainer>
        <ErrorIcon />
      </IconContainer>
      <MessageText>{message}</MessageText>
      <CloseButton onClick={handleClose} aria-label="Close error message">
        ✕
      </CloseButton>
    </ErrorTooltip>
  );
};
