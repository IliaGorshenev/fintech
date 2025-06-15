import { LoginForm } from '@/components/auth-components/LoginForm';
import { AuthLayout } from '@/components/layout/AuthLayout';
import React from 'react';

// import { AuthLayout } from '../components/layout/AuthLayout'; // Optional

const AuthPage: React.FC = () => {
  // If using AuthLayout:
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
  // return <LoginForm />;
};

export default AuthPage; // For lazy loading if you set it up
