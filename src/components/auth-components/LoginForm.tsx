import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'; // Assuming you use React Router

import { fakeLoginUser } from '@/hooks/useAuth';
import { useErrorNotification } from '@/hooks/useError';
import { LoadingSmallLogoIcon, TelegramIcon } from '@/icons/icons';
import { TelegramButton } from '@/pages/styles.module';
import { LoginFormData } from '@/types';
import { loginSchema } from '@/validation/authSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { Button } from '../Form/Button';
import { InputField } from '../Form/InputField';
import { Container, FormContainer, LinksContainer, Title } from './styles.module';

export const LoginForm: React.FC = () => {
  const { showError } = useErrorNotification();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const response = await fakeLoginUser(data);
      if (response.success) {
        console.log('Login successful:', response.token);
        navigate('/onboarding');
        // TODO: Handle successful login (e.g., save token, redirect)
        // For now, redirect to home page as an example
      } else {
        showError(response.message);
      }
    } catch (error) {
      // This catch block might be for network errors or unexpected issues

      showError('An unexpected error occurred. Please try again.');
      console.error('Login error:', error);
    }
  };

  // The Figma mockups for "Вход" [cite: 1] show email and password fields.
  // They also typically have a "Forgot password?" link and a link to "Registration".

  return (
    <Container>
      <LoadingSmallLogoIcon></LoadingSmallLogoIcon>
      <FormContainer onSubmit={handleSubmit(onSubmit)} noValidate>
        <Title>Вход</Title> {/* Login */}
        <InputField
          label="Email"
          registration={register('email')}
          type="email"
          placeholder="example@example.com"
          error={errors.email}
          success={!!watch('email') && !errors.email}
          // Add autoCapitalize="none" for better mobile UX for email fields
          autoCapitalize="none"
        />
        <InputField
          label="Пароль" // Password
          registration={register('password')}
          type="password"
          placeholder="********"
          error={errors.password}
          success={!!watch('password') && !errors.password}
        />
        <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting || !watch('email') || !watch('password')}>
          Войти {/* Sign In */}
        </Button>
        <TelegramButton to="/auth">
          <TelegramIcon />
          Войти через Телеграм
        </TelegramButton>
        <LinksContainer>
          Нет аккаунта?<Link to="/registration">Регистрация</Link> {/* Registration */}
        </LinksContainer>
        <LinksContainer>
          Забыли пароль? <Link to="/password-recovery">Сбросить пароль</Link> {/* Forgot Password */}
        </LinksContainer>
      </FormContainer>
    </Container>
  );
};
