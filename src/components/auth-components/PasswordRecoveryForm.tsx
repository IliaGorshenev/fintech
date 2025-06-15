import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { fakeRequestPasswordRecovery, fakeResetPasswordWithCode } from '@/hooks/useAuth';
import { PasswordRecoveryFormData } from '@/types';
import { requestPasswordRecoverySchema, resetPasswordSchema } from '@/validation/authSchemas';
import z from 'zod';
import { FormContainer, InfoText, LinksContainer, SuccessMessage, Title } from './styles.module';

import { Button } from '../Form/Button';
import { FormErrorMessage } from '../Form/ErrorMessage';
import { InputField } from '../Form/InputField';

type PasswordRecoveryStep = 'requestEmail' | 'enterCodeAndNewPassword' | 'success';

export const PasswordRecoveryForm: React.FC = () => {
  const [serverError, setServerError] = useState<string | undefined>(undefined);
  const [successMessage, setSuccessMessage] = useState<string | undefined>(undefined);
  const [currentStep, setCurrentStep] = useState<PasswordRecoveryStep>('requestEmail');
  const [recoveryEmail, setRecoveryEmail] = useState<string>('');
  const navigate = useNavigate();

  const {
    register: registerRequest,
    handleSubmit: handleSubmitRequest,
    formState: { errors: errorsRequest, isSubmitting: isSubmittingRequest },
    reset: resetRequestForm,
  } = useForm<{ email: string }>({
    resolver: zodResolver(requestPasswordRecoverySchema),
  });

  const {
    register: registerReset,
    handleSubmit: handleSubmitReset,
    formState: { errors: errorsReset, isSubmitting: isSubmittingReset },
    reset: resetResetForm,
  } = useForm<z.infer<typeof resetPasswordSchema>>({
    // Use the exact schema type
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      // email will be set programmatically
      code: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const handleRequestSubmit: SubmitHandler<{ email: string }> = async (data) => {
    setServerError(undefined);
    setSuccessMessage(undefined);
    try {
      const response = await fakeRequestPasswordRecovery(data);
      if (response.success) {
        setSuccessMessage(response.message); // "If an account with this email exists..."
        setRecoveryEmail(data.email);
        // The Figma mockups [cite: 2] show a "Успешно отправлено" (Successfully sent) screen with a checkmark,
        // then screens to enter the code and new passwords.
        // So we should transition to the next step.
        setCurrentStep('enterCodeAndNewPassword');
        resetRequestForm();
      } else {
        setServerError(response.message);
      }
    } catch (error) {
      setServerError('An unexpected error occurred. Please try again.');
    }
  };

  const handleResetSubmit: SubmitHandler<PasswordRecoveryFormData> = async (data) => {
    setServerError(undefined);
    setSuccessMessage(undefined);
    try {
      const response = await fakeResetPasswordWithCode({
        ...data,
        email: recoveryEmail, // Not strictly needed by fake API but good to have
      });
      if (response.success) {
        // Figma [cite: 2] shows a "Пароль успешно обновлен" (Password successfully updated) screen.
        setSuccessMessage(response.message);
        setCurrentStep('success');
        resetResetForm();
        setTimeout(() => navigate('/auth'), 3000); // Redirect to login after a delay
      } else {
        // Figma [cite: 2] shows an error screen "Что-то пошло не так" (Something went wrong)
        setServerError(response.message);
      }
    } catch (error) {
      setServerError('An unexpected error occurred. Please try again.');
    }
  };

  // Step 1: Request password recovery email
  if (currentStep === 'requestEmail') {
    return (
      <FormContainer onSubmit={handleSubmitRequest(handleRequestSubmit)} noValidate>
        <Title>Сброс пароля</Title> {/* Password Reset */}
        <InfoText>Введите email, указанный при регистрации. Мы отправим на него код для восстановления пароля.</InfoText>
        {serverError && <FormErrorMessage message={serverError} />}
        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
        <InputField
          label="Email"
          registration={registerRequest('email')}
          type="email"
          placeholder="Ваш Email" // Your Email
          error={errorsRequest.email}
          autoCapitalize="none"
        />
        <Button type="submit" isLoading={isSubmittingRequest} disabled={isSubmittingRequest}>
          Отправить код {/* Send Code */}
        </Button>
        <LinksContainer>
          <Link to="/auth">Вернуться ко входу</Link> {/* Back to login */}
        </LinksContainer>
      </FormContainer>
    );
  }

  // Step 2: Enter code and new password
  // This combines the "enter code" and "enter new password" screens from Figma [cite: 2] for simplicity,
  // but you could split them if Hero UI or your design requires distinct steps/screens.
  if (currentStep === 'enterCodeAndNewPassword') {
    return (
      <FormContainer onSubmit={handleSubmitReset(handleResetSubmit)} noValidate>
        <Title>Сброс пароля</Title> {/* Password Reset */}
        <InfoText>Мы отправили код на {recoveryEmail}. Введите его ниже и установите новый пароль.</InfoText>
        {/* The Figma [cite: 2] has an "error" state screen here, e.g., for wrong code. */}
        {serverError && <FormErrorMessage message={serverError} />}
        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
        <InputField
          label="Код из письма" // Code from email
          registration={registerReset('code')}
          placeholder="123456"
          error={errorsReset.code}
        />
        <InputField
          label="Новый пароль" // New Password
          registration={registerReset('newPassword')}
          type="password"
          placeholder="Введите новый пароль" // Enter new password
          error={errorsReset.newPassword}
        />
        <InputField
          label="Повторите новый пароль" // Confirm New Password
          registration={registerReset('confirmNewPassword')}
          type="password"
          placeholder="Повторите новый пароль" // Confirm new password
          error={errorsReset.confirmNewPassword}
        />
        <Button type="submit" isLoading={isSubmittingReset} disabled={isSubmittingReset}>
          Сбросить пароль {/* Reset Password */}
        </Button>
        <LinksContainer>
          <Link to="/auth">Вернуться ко входу</Link> {/* Back to login */}
        </LinksContainer>
      </FormContainer>
    );
  }

  // Step 3: Success screen
  if (currentStep === 'success') {
    // This matches the "Пароль успешно обновлен" screen in Figma [cite: 2]
    return (
      <FormContainer>
        <Title>Успешно!</Title> {/* Success! */}
        {/* Hero UI might have an icon for success (like the green checkmark in Figma [cite: 2]) */}
        <SuccessMessage>{successMessage || 'Пароль был успешно изменен.'}</SuccessMessage>
        <Button onClick={() => navigate('/auth')}>Перейти ко входу {/* Go to Login */}</Button>
      </FormContainer>
    );
  }

  return null; // Should not happen
};
