import { useTheme } from '@heroui/use-theme';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import IndexPage from './pages';
import AuthPage from './pages/Auth/AuthPage';
import RecPage from './pages/Auth/RecPage';
import RegPage from './pages/Auth/RegPage';
import VerifyOtpPage from './pages/Auth/VerifyPage';
import TelegramHome from './pages/TelegramHome';
import { TelegramProvider } from './features/telegram/TelegramProvider';

function App() {
  const { theme } = useTheme();

  // Apply theme class to the document element to enable CSS variables
  useEffect(() => {
    document.documentElement.className = theme === 'dark' ? 'dark' : 'light';
  }, [theme]);

  return (
    <TelegramProvider>
      <div className={theme === 'dark' ? 'dark' : 'light'}>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/registration" element={<RegPage />} />
          <Route path="/verify-otp" element={<VerifyOtpPage />} />
          <Route path="/recovery" element={<RecPage />} />
          <Route path="/telegram" element={<TelegramHome />} />

          {/* Protected routes */}
          <Route
            path="/"
            element={
              // <ProtectedRoute>
              <IndexPage />
              // </ProtectedRoute>
            }
          />
          {/* Add other protected routes here */}
        </Routes>
      </div>
    </TelegramProvider>
  );
}

export default App;
