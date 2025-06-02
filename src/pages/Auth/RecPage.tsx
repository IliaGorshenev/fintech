import { PasswordRecoveryForm } from '@/features/auth/components/PasswordRecoveryForm';
import { AuthLayout } from '@/features/auth/layout/AuthLayout';
import React from 'react';
// import { AuthLayout } from '../components/layout/AuthLayout'; // Optional

const RecPage: React.FC = () => {
  return (
    <AuthLayout>
      <PasswordRecoveryForm />
    </AuthLayout>
  );
};

export default RecPage;
