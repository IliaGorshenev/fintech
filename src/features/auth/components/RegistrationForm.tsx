import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import z from 'zod';
import { Button } from '../../../components/Form/Button';
import { FormErrorMessage } from '../../../components/Form/ErrorMessage';
import { InputField } from '../../../components/Form/InputField';

import { fakeRegisterUser } from '../hooks/useAuth';
import { RegistrationFormData } from '../types';
import { registrationSchema } from '../validation/authSchemas';
// You might have an OTP form as a subsequent step.
// import { OtpVerificationForm } from './OtpVerificationForm';

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
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const RegistrationForm: React.FC = () => {
  const [serverError, setServerError] = useState<string | undefined>(undefined);
  // const [showOtpForm, setShowOtpForm] = useState<boolean>(false);

  // @ts-ignore
  const [registrationEmail, setRegistrationEmail] = useState<string>('');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset, // To clear the form after successful submission
  } = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
    // Default values can be set here if needed
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
    },
  });

  const onSubmit: SubmitHandler<RegistrationFormData> = async (data) => {
    setServerError(undefined);
    try {
      const response = await fakeRegisterUser(data);
      if (response.success) {
        console.log('Registration successful:', response.message);
        setRegistrationEmail(data.email); // Store email for OTP step
        // According to Figma[cite: 1], after initial registration details, an OTP screen appears.
        // setShowOtpForm(true); // Show OTP form instead of navigating or resetting immediately
        alert(response.message); // Or navigate to an OTP page
        reset(); // Clear the form
        // Potentially navigate to an OTP verification page:
        // navigate(`/verify-otp?email=${data.email}`);
        // For now, let's assume OTP is a separate page or we directly go to login.
        navigate('/auth'); // Redirect to login after successful registration (or to OTP page)
      } else {
        setServerError(response.message);
      }
    } catch (error) {
      setServerError('An unexpected error occurred during registration.');
      console.error('Registration error:', error);
    }
  };

  // if (showOtpForm) {
  //   // You would pass the email to the OtpVerificationForm
  //   // return <OtpVerificationForm email={registrationEmail} onOtpVerified={() => navigate('/auth')} />;
  //   // For now, this part is commented out as OtpVerificationForm is not fully detailed yet
  // }

  // The Figma mockups for "Регистрация" [cite: 1] show variations.
  // Some have Email, Password, Confirm Password.
  // Some have Name, Email, Password, Confirm Password.
  // Some are just OTP input screens.
  // This form implements a more comprehensive set. You can create variations if needed.

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} noValidate>
      <Title>Регистрация</Title> {/* Registration */}
      {serverError && <FormErrorMessage message={serverError} />}
      {/* Optional Full Name field based on some Figma screens [cite: 1] */}
      {/* <InputField
        label="Полное имя" // Full Name
        registration={register('fullName')}
        placeholder="Иван Иванов"
        error={errors.fullName}
      /> */}
      <InputField label="Email" registration={register('email')} type="email" placeholder="user@example.com" error={errors.email} autoCapitalize="none" />
      <InputField
        label="Пароль" // Password
        registration={register('password')}
        type="password"
        placeholder="Создайте пароль" // Create a password
        error={errors.password}
      />
      <InputField
        label="Повторите пароль" // Confirm Password
        registration={register('confirmPassword')}
        type="password"
        placeholder="Повторите пароль" // Confirm password
        error={errors.confirmPassword}
      />
      {/* Optional Phone Number field based on some Figma screens [cite: 1] */}
      {/* <InputField
        label="Номер телефона (необязательно)" // Phone Number (optional)
        registration={register('phoneNumber')}
        type="tel"
        placeholder="+7 (999) 000-00-00"
        error={errors.phoneNumber}
      /> */}
      <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
        Зарегистрироваться {/* Register */}
      </Button>
      <LinksContainer>
        Уже есть аккаунт? <Link to="/auth">Войти</Link> {/* Already have an account? Sign In */}
      </LinksContainer>
    </FormContainer>
  );
};
