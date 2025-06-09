// src/components/layout/AuthLayout.tsx

import { ThemeSwitch } from '@/components/theme-switch';
import styled from 'styled-components';

// Define a type for the component's props
interface AuthLayoutProps {
  children: React.ReactNode; // To render the content (e.g., LoginForm, RegistrationForm)
  title?: string; // Optional title to display above the children, if needed by some auth pages
}

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; // Full viewport height
  background-color: #f4f7f6; // A light background color, adjust as needed
  padding: 1rem; // Padding for smaller screens
  box-sizing: border-box;
`;

const ContentWrapper = styled.main`
  width: 100%;
  height: 852px;
  max-width: 393px; // Max width for the auth form container
  background-color: #ffffff; // White background for the content card
  padding: 0; // Generous padding inside the card
  border-radius: 8px; // Rounded corners for the card
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); // A subtle shadow
  display: flex;
  flex-direction: column;
  align-items: center; // Center content like logo and title within the card
`;

const PageTitle = styled.h1`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
`;

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title }) => {
  return (
    <LayoutContainer>
      <ContentWrapper>
        <ThemeSwitch />
        {title && <PageTitle>{title}</PageTitle>}
        {children}
      </ContentWrapper>
    </LayoutContainer>
  );
};

// How to use it in your page components (e.g., AuthPage.tsx):
/*
import React from 'react';
import { LoginForm } from '../features/auth/components/LoginForm';
import { AuthLayout } from '../components/layout/AuthLayout';

const AuthPage: React.FC = () => {
  return (
    <AuthLayout title="Вход"> // Or pass the title directly in LoginForm if preferred
      <LoginForm />
    </AuthLayout>
  );
};

export default AuthPage;
*/
