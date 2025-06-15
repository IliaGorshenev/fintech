import { PasswordRecoveryForm } from '@/components/auth-components/PasswordRecoveryForm';
import { AuthLayout } from '@/components/layout/AuthLayout';
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
