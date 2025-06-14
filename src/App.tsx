import { useTheme } from '@heroui/use-theme';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { TelegramProvider } from './features/telegram/TelegramProvider';
import IndexPage from './pages';
import AuthPage from './pages/Auth/AuthPage';
import RecPage from './pages/Auth/RecPage';
import RegPage from './pages/Auth/RegPage';
import VerifyOtpPage from './pages/Auth/VerifyPage';

import { ErrorNotifications } from './components/Form/ErrorNotifications';
import CompleteRegistrationPage from './features/auth/components/CompleteRegistration';
import OnBoardingPages from './pages/Onboarding/OnBoardingPages';
import TelegramHome from './pages/TelegramHome';

function App() {
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setTheme('light');
    // setTheme('dark');
  }, []);
  return (
    <div className={theme === 'dark' ? 'dark' : 'light'}>
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
        </Routes>
      </TelegramProvider>
    </div>
  );
}

export default App;
