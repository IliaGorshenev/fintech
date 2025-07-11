import { RegistrationForm } from '@/components/auth-components/RegistrationForm';
import { AuthLayout } from '@/components/layout/AuthLayout';
import React from 'react';
// import { AuthLayout } from '../components/layout/AuthLayout'; // Optional

const RegPage: React.FC = () => {
  return (
    <AuthLayout>
      <RegistrationForm />
    </AuthLayout>
  );
};

export default RegPage;
