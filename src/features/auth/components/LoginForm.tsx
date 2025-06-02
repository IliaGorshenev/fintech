import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'; // Assuming you use React Router
import styled from 'styled-components';

import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { Button } from '../../../components/Form/Button';
import { FormErrorMessage } from '../../../components/Form/ErrorMessage';
import { InputField } from '../../../components/Form/InputField';
import { fakeLoginUser } from '../hooks/useAuth';
import { LoginFormData } from '../types';
import { loginSchema } from '../validation/authSchemas';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding-top: 148px; 
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
`;

const LinksContainer = styled.div`
  margin-top: 1rem;
  text-align: center;
  font-size: 0.9rem;

  a {
    color: #007bff;
    text-decoration: none;
    margin: 0 0.5rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const LoginForm: React.FC = () => {
  const [serverError, setServerError] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    setServerError(undefined); // Clear previous server errors
    try {
      const response = await fakeLoginUser(data);
      if (response.success) {
        console.log('Login successful:', response.token);
        // TODO: Handle successful login (e.g., save token, redirect)
        // For now, redirect to home page as an example
        navigate('/'); // Redirect to your main page after login
      } else {
        setServerError(response.message);
      }
    } catch (error) {
      // This catch block might be for network errors or unexpected issues
      setServerError('An unexpected error occurred. Please try again.');
      console.error('Login error:', error);
    }
  };

  // The Figma mockups for "Вход" [cite: 1] show email and password fields.
  // They also typically have a "Forgot password?" link and a link to "Registration".

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} noValidate>
      <Title>Вход</Title> {/* Login */}
      {serverError && <FormErrorMessage message={serverError} />}
      <InputField
        label="Email"
        registration={register('email')}
        type="email"
        placeholder="example@example.com"
        error={errors.email}
        // Add autoCapitalize="none" for better mobile UX for email fields
        autoCapitalize="none"
      />
      <InputField
        label="Пароль" // Password
        registration={register('password')}
        type="password"
        placeholder="********"
        error={errors.password}
      />
      <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
        Войти {/* Sign In */}
      </Button>
      <LinksContainer>
        <Link to="/recovery">Забыли пароль?</Link> {/* Forgot password? */}|<Link to="/registration">Регистрация</Link> {/* Registration */}
      </LinksContainer>
    </FormContainer>
  );
};
