import { useTheme } from '@heroui/use-theme';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import IndexPage from './pages';
import AuthPage from './pages/Auth/AuthPage';
import RecPage from './pages/Auth/RecPage';
import RegPage from './pages/Auth/RegPage';
import VerifyOtpPage from './pages/Auth/VerifyPage';
import { TelegramProvider } from './telegram/TelegramProvider';

import { ErrorNotifications } from './components/Form/ErrorNotifications';

import CompleteRegistrationPage from './components/auth-components/CompleteRegistration';
import Dashboard from './pages/Main/Dashboard';
import ExchangePage from './pages/Main/ExachangePage';
import InvoicePage from './pages/Main/InvoicePage/InvoicePage';
import OnBoardingPages from './pages/Onboarding/OnBoardingPages';
import TelegramHome from './pages/TelegramHome';
import { ThemePreview } from './telegram/ThemePreview';

import FAQ from './pages/Main/FAQ';
import ProfilePage from './pages/Main/Profile/Profile';

import { RequestsPage } from './pages/Main/Requests';
import { ReshufflePage } from './pages/Main/ReshufflePage';
import SettingsPage from './pages/Main/SettingsPage';

// Flag to enable theme preview mode (you can toggle this during development)
const THEME_PREVIEW_MODE = import.meta.env.DEV && true; // Set to true when you want to preview both themes

function App() {
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setTheme('light');
    // setTheme('dark');
  }, []);

  const appContent = (
    <TelegramProvider>
      <ErrorNotifications />
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/registration" element={<RegPage />} />
        <Route path="/verify-email" element={<VerifyOtpPage />} />
        <Route path="/complete-registration" element={<CompleteRegistrationPage />} />
        <Route path="/recovery" element={<RecPage />} />
        <Route path="/telegram" element={<TelegramHome />} />
        <Route path="/onboarding" element={<OnBoardingPages />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reshuffle" element={<ReshufflePage />} />
        <Route path="/exchange" element={<ExchangePage />} />
        <Route path="/invoice" element={<InvoicePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/requests" element={<RequestsPage />} />
      </Routes>
    </TelegramProvider>
  );

  if (THEME_PREVIEW_MODE) {
    return <ThemePreview>{appContent}</ThemePreview>;
  }

  return <div className={theme === 'dark' ? 'dark' : 'light'}>{appContent}</div>;
}

export default App;
