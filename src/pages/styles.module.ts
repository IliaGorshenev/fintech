import { Button } from '@/components/Form/Button';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

export const WelcomeSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 24px;
  margin: auto;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 600;
  line-height: 40px;
  margin: 0;
  margin-bottom: 32px;
  margin-top: 24px;
  color: var(--foreground);
  font-weight: bold;
`;
export const TelegramButton = styled(Link)`
  display: flex;
  height: 48px;
  padding: 0px 24px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  border-radius: 12px;
  background: var(--primary); /* Using your blue-700 variable from globals.css */
  color: var(--primary-foreground);
  text-decoration: none;
  font-weight: 500;
  margin-top: 1.5rem;
  transition: all 0.2s ease;
  border: 1px solid transparent;

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

  svg {
    margin-right: 0.5rem;
  }
`;

export const InfoText = styled.p`
  text-align: center;
  margin-bottom: 2rem;
  color: #555;
`;

export const CodeInputContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 1rem;
`;

export const TimerText = styled.p`
  color: var(--secondary_300, #3f3d51);
  text-align: center;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 133.333% */
  margin-bottom: 1rem;
`;

export const CodeInput = styled.input<{ $hasError?: boolean; $isSuccess?: boolean }>`
  width: 3rem;
  height: 3rem;
  text-align: center;
  font-size: 1.5rem;
  border: 1px solid ${(props) => (props.$hasError ? 'var(--error, #E51978)' : props.$isSuccess ? '#79B91A' : '#ccc')};
  border-radius: 0.5rem;
  &:focus {
    outline: none;
    border-color: ${(props) => (props.$hasError ? 'var(--error, #E51978)' : props.$isSuccess ? '#79B91A' : '#007bff')};
  }
`;

export const ErrorText = styled.p`
  color: var(--error, #e51978);
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  text-align: center;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`;

export const SuccessText = styled.p`
  color: #79b91a;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  text-align: center;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`;

export const ResendLink = styled.button`
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
  margin-top: 1rem;
  &:hover {
    color: #0056b3;
  }
`;

export const BackLink = styled(Link)`
  margin-top: 1rem;
  color: var(--secondary_300, #3f3d51);
  text-decoration: none;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  &:hover {
    text-decoration: underline;
  }
`;

export const ResendButton = styled(Button)`
  margin-top: 1rem;
  background: none;
  border: none;
  color: ${(props) => (props.disabled ? '#ccc' : '#007bff')};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  text-decoration: underline;
  &:hover {
    color: ${(props) => (props.disabled ? '#ccc' : '#0056b3')};
  }
`;
