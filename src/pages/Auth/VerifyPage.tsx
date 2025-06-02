import { OtpVerificationForm } from '@/features/auth/components/OtpVerificationsForm';
import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { AuthLayout } from '../components/layout/AuthLayout';

const VerifyOtpPage: React.FC = () => {
  const navigate = useNavigate();

  const handleOtpSuccess = () => {
    // Navigate to login or dashboard after successful OTP verification
    navigate('/auth'); // Or '/dashboard' if auto-login after OTP
  };

  // return <AuthLayout><OtpVerificationForm onSuccess={handleOtpSuccess} /></AuthLayout>;
  return <OtpVerificationForm onSuccess={handleOtpSuccess} />;
};

export default VerifyOtpPage;
