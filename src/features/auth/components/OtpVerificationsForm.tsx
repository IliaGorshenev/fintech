import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../../components/Form/Button';
import { FormErrorMessage } from '../../../components/Form/ErrorMessage';
import { InputField } from '../../../components/Form/InputField';
import { fakeVerifyOtp } from '../hooks/useAuth';
import { OtpVerificationFormData } from '../types';
import { otpVerificationSchema } from '../validation/authSchemas';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding-top: 148px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 0.5rem;
  color: #333;
`;

const InfoText = styled.p`
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 1.5rem;
  text-align: center;
`;

interface OtpVerificationFormProps {
  // email can be passed as a prop or retrieved from URL query params
  email?: string;
  onSuccess: () => void; // Callback for successful verification
}

export const OtpVerificationForm: React.FC<OtpVerificationFormProps> = ({ email: propEmail, onSuccess }) => {
  const [serverError, setServerError] = useState<string | undefined>(undefined);
  //   const navigate = useNavigate();
  const location = useLocation();

  // Get email from URL query params if not passed as prop
  const queryParams = new URLSearchParams(location.search);
  const emailFromQuery = queryParams.get('email');
  const emailForVerification = propEmail || emailFromQuery || undefined;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OtpVerificationFormData>({
    resolver: zodResolver(otpVerificationSchema),
  });

  const onSubmit: SubmitHandler<OtpVerificationFormData> = async (data) => {
    setServerError(undefined);
    try {
      const response = await fakeVerifyOtp({ ...data, email: emailForVerification });
      if (response.success) {
        alert(response.message); // Or show a success message
        onSuccess(); // Call the success callback (e.g., navigate to login or dashboard)
      } else {
        setServerError(response.message);
      }
    } catch (error) {
      setServerError('An unexpected error occurred. Please try again.');
      console.error('OTP verification error:', error);
    }
  };

  // The Figma mockups [cite: 1] show screens like "Регистрация" with just a code input.
  // Example codes: 1655, 5530, 5550 (this one has 4 digits in mockup, my schema allows 4-6), 3159

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} noValidate>
      <Title>Подтверждение</Title> {/* Confirmation */}
      <InfoText>
        {emailForVerification ? `Мы отправили код подтверждения на ${emailForVerification}. Введите его ниже.` : 'Введите код подтверждения, отправленный вам.'}
      </InfoText>
      {serverError && <FormErrorMessage message={serverError} />}
      <InputField
        // label="Код подтверждения" // The Figma mockups [cite: 1] don't show a label explicitly for the OTP field, just a placeholder or title
        registration={register('code')}
        placeholder="----" // Placeholder from Figma [cite: 1] (e.g., for "5555", "1655")
        error={errors.code}
        // For OTP, you might want to use a specific input type or component that handles digit-by-digit input
        // For simplicity, a regular text input is used here.
        // Consider inputMode="numeric" pattern="[0-9]*" for better mobile UX
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={6} // Max length according to schema
      />
      <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
        Подтвердить {/* Confirm */}
      </Button>
      {/* Add a "Resend code" link/button if needed */}
    </FormContainer>
  );
};
