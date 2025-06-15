import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from '@/components/Form/Button';
import { LoadingSmallLogoIcon } from '@/icons/icons';

import { Container } from '@/components/auth-components/styles.module';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { fakeVerifyOtp } from '@/hooks/useAuth';
import { registrationEmailAtom } from '@/store/auth';
import { BackLink, CodeInput, CodeInputContainer, ErrorText, InfoText, SuccessText, TimerText, Title } from '../styles.module';

const VerifyOtpPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [serverError, setServerError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState(['', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(600);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isCodeError, setIsCodeError] = useState(false);
  const [isCodeSuccess, setIsCodeSuccess] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      setIsResendDisabled(false);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Get email from URL query params or from Jotai state
  const queryParams = new URLSearchParams(location.search);
  const emailFromQuery = queryParams.get('email');
  const [registrationEmail, setRegistrationEmail] = useAtom(registrationEmailAtom);

  // Use email from query if available, otherwise use from state
  const email = emailFromQuery || registrationEmail;

  // If email is from query, update the atom
  React.useEffect(() => {
    if (emailFromQuery && emailFromQuery !== registrationEmail) {
      setRegistrationEmail(emailFromQuery);
    }
  }, [emailFromQuery, registrationEmail, setRegistrationEmail]);

  // If no email is available, redirect to registration
  React.useEffect(() => {
    if (!email) {
      navigate('/registration');
    }
  }, [email, navigate]);

  const handleInputChange = (index: number, value: string) => {
    // Reset error and success states when user starts typing again
    setServerError(undefined);
    setIsCodeError(false);
    setIsCodeSuccess(false);

    if (value.length > 1) {
      value = value.charAt(0);
    }

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 3) {
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }

    // If all 4 digits are entered, automatically verify
    if (index === 3 && value) {
      handleVerify(newCode.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace to go to previous input
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-input-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handleVerify = async (fullCode: string) => {
    setServerError(undefined);
    setIsLoading(true);
    setIsCodeError(false);
    setIsCodeSuccess(false);

    if (fullCode.length !== 4) {
      setServerError('Пожалуйста, введите полный код подтверждения');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fakeVerifyOtp({
        email,
        code: fullCode,
      });

      if (response.success) {
        // Show success state for 2 seconds before redirecting
        setIsCodeSuccess(true);
        setTimeout(() => {
          navigate('/complete-registration');
        }, 2000);
      } else {
        setServerError(response.message || 'Неверный код подтверждения');
        setIsCodeError(true);
      }
    } catch (error) {
      setServerError('Произошла ошибка при проверке кода. Пожалуйста, попробуйте снова.');
      setIsCodeError(true);
      console.error('OTP verification error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = () => {
    // Implement code resend functionality here
    setTimeLeft(600); // Reset timer to 10 minutes
    setIsResendDisabled(true);
    setCode(['', '', '', '']); // Clear the input fields
    setServerError(undefined);
    setIsCodeError(false);
    setIsCodeSuccess(false);
    // Add your code resend logic here
    alert('Код отправлен повторно');
  };

  if (!email) {
    return null; // Don't render anything while redirecting
  }

  return (
    <AuthLayout>
      <Container>
        <LoadingSmallLogoIcon />
        <Title>Регистрация</Title>
        <InfoText>Введите код</InfoText>

        <CodeInputContainer>
          {code.map((digit, index) => (
            <CodeInput
              key={index}
              id={`code-input-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              autoFocus={index === 0}
              $hasError={isCodeError}
              $isSuccess={isCodeSuccess}
            />
          ))}
        </CodeInputContainer>

        {serverError && isCodeError && <ErrorText>{serverError}</ErrorText>}
        {isCodeSuccess && <SuccessText>Код подтвержден! Перенаправление...</SuccessText>}

        {!isCodeSuccess && (
          <>
            <TimerText>Действителен: {formatTime(timeLeft)}</TimerText>
            <Button type="button" isLoading={isLoading} disabled={isResendDisabled} onClick={handleResendCode}>
              Отправить код повторно
            </Button>
            <BackLink to="/registration">Назад</BackLink>
          </>
        )}
      </Container>
    </AuthLayout>
  );
};

export default VerifyOtpPage;
