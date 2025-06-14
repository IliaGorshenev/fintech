import { zodResolver } from '@hookform/resolvers/zod';
import { useAtomValue } from 'jotai';
import React, { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { Button } from '@/components/Form/Button';

import { FormErrorMessage } from '@/components/Form/ErrorMessage';
import { InputField } from '@/components/Form/InputField';
import { EyeClosedIcon, EyeIcon, LoadingSmallLogoIcon } from '@/components/icons';
import { fakeCompleteRegistration } from '@/features/auth/hooks/useAuth';
import { registrationEmailAtom, registrationUserDataAtom } from '@/store/auth';
import { AuthLayout } from '../layout/AuthLayout';
import { Container, FormContainer, SuccessMessage, Title } from './styles.module';

// Success icon component for the email field
const SuccessIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM7 11.4L3.6 8L5 6.6L7 8.6L11 4.6L12.4 6L7 11.4Z" fill="#79B91A" />
  </svg>
);

const passwordSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, 'Пароль должен содержать минимум 8 символов')
      .regex(/[a-z]/, 'Пароль должен содержать хотя бы одну строчную букву')
      .regex(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
      .regex(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

type PasswordFormData = z.infer<typeof passwordSchema>;

const CompleteRegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isConfirmEnabled, setIsConfirmEnabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Get registration data from Jotai
  const registrationEmail = useAtomValue(registrationEmailAtom);
  const userData = useAtomValue(registrationUserDataAtom);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
    setValue,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      email: registrationEmail || '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const confirmPassword = useWatch({
    control,
    name: 'confirmPassword',
  });

  // Watch the password field to enable/disable confirm password
  const password = useWatch({
    control,
    name: 'password',
  });
  const isConfirmPasswordValid = isConfirmEnabled && !errors.confirmPassword && password === confirmPassword && Boolean(confirmPassword);

  // Enable confirm password field when password has a value
  useEffect(() => {
    setIsConfirmEnabled(!!password && password.length >= 8);
  }, [password]);

  // Set email field when registrationEmail changes
  useEffect(() => {
    if (registrationEmail) {
      setValue('email', registrationEmail);
    }
  }, [registrationEmail, setValue]);

  // Redirect to registration if no email is available
  useEffect(() => {
    if (!registrationEmail) {
      navigate('/registration');
    }
  }, [registrationEmail, navigate]);

  const onSubmit = async (data: PasswordFormData) => {
    setServerError(undefined);
    setIsLoading(true);

    try {
      // Combine user data with password
      const completeData = {
        ...userData,
        email: registrationEmail,
        password: data.password,
      };

      const response = await fakeCompleteRegistration(completeData);

      if (response.success) {
        setIsSuccess(true);
        // Redirect to login page after a delay
        setTimeout(() => {
          navigate('/auth');
        }, 3000);
      } else {
        setServerError(response.message || 'Не удалось завершить регистрацию');
      }
    } catch (error) {
      setServerError('Произошла ошибка при завершении регистрации. Пожалуйста, попробуйте снова.');
      console.error('Complete registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!registrationEmail) {
    return null; // Don't render anything while redirecting
  }

  if (isSuccess) {
    return (
      <Container>
        <LoadingSmallLogoIcon />
        <Title>Регистрация завершена!</Title>
        <SuccessMessage>Ваша учетная запись успешно создана. Сейчас вы будете перенаправлены на страницу входа.</SuccessMessage>
        <Button onClick={() => navigate('/auth')}>Перейти ко входу</Button>
      </Container>
    );
  }

  return (
    <AuthLayout>
      <Container>
        <LoadingSmallLogoIcon />
        <Title>Регистрация</Title>

        {serverError && <FormErrorMessage message={serverError} />}

        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          {/* Email field with success styling */}
          <InputField label="Ваш Email" registration={register('email')} type="email" readOnly={true} success={true} endContent={<SuccessIcon />} />

          <InputField
            label="Пароль"
            registration={register('password')}
            type={showPassword ? 'text' : 'password'}
            placeholder="Введите пароль"
            error={errors.password}
            success={!errors.password && !!password && password.length >= 8}
            endContent={
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                {showPassword ? (
                  <EyeIcon color={errors.password ? 'var(--error)' : !errors.password && !!password && password.length >= 8 ? 'var(--green-900)' : 'var(--primary)'} />
                ) : (
                  <EyeClosedIcon
                    color={errors.password ? 'var(--error)' : !errors.password && !!password && password.length >= 8 ? 'var(--green-900)' : 'var(--primary)'}
                  />
                )}
              </button>
            }
          />

          <InputField
            label="Подтвердите пароль"
            registration={register('confirmPassword')}
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Повторите пароль"
            error={errors.confirmPassword}
            disabled={!isConfirmEnabled}
            success={isConfirmPasswordValid}
            endContent={
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                disabled={!isConfirmEnabled}>
                {showConfirmPassword ? (
                  <EyeIcon color={errors.confirmPassword ? 'var(--error)' : isConfirmPasswordValid ? 'var(--green-900)' : 'var(--primary)'} />
                ) : (
                  <EyeClosedIcon color={errors.confirmPassword ? 'var(--error)' : isConfirmPasswordValid ? 'var(--green-900)' : 'var(--primary)'} />
                )}
              </button>
            }
          />

          <Button type="submit" isLoading={isLoading} disabled={isLoading || !isValid || !isConfirmEnabled}>
            Завершить регистрацию
          </Button>
        </FormContainer>
      </Container>
    </AuthLayout>
  );
};

export default CompleteRegistrationPage;
