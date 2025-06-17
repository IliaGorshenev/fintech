import { AuthLayout } from '@/components/layout/AuthLayout';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { keyframes, styled } from 'styled-components';

// Define the WebApp type based on Telegram's API
interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    query_id: string;
    user: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
      language_code?: string;
    };
    auth_date: number;
    hash: string;
  };
  colorScheme: 'light' | 'dark';
  themeParams: {
    bg_color: string;
    text_color: string;
    hint_color: string;
    link_color: string;
    button_color: string;
    button_text_color: string;
  };
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  ready(): void;
  expand(): void;
  close(): void;
  setHeaderColor(color: string): void;
  setBackgroundColor(color: string): void;
  enableClosingConfirmation(): void;
  disableClosingConfirmation(): void;
  onEvent(eventType: string, eventHandler: () => void): void;
  offEvent(eventType: string, eventHandler: () => void): void;
  sendData(data: string): void;
  openLink(url: string): void;
  openTelegramLink(url: string): void;
  showPopup(params: object, callback?: (id: string) => void): void;
  showAlert(message: string, callback?: () => void): void;
  showConfirm(message: string, callback?: (confirmed: boolean) => void): void;
  MainButton: {
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isActive: boolean;
    isProgressVisible: boolean;
    setText(text: string): void;
    onClick(callback: () => void): void;
    offClick(callback: () => void): void;
    show(): void;
    hide(): void;
    enable(): void;
    disable(): void;
    showProgress(leaveActive: boolean): void;
    hideProgress(): void;
  };
  BackButton: {
    isVisible: boolean;
    onClick(callback: () => void): void;
    offClick(callback: () => void): void;
    show(): void;
    hide(): void;
  };
  HapticFeedback: {
    impactOccurred(style: string): void;
    notificationOccurred(type: string): void;
    selectionChanged(): void;
  };
}

interface TelegramContextType {
  webApp: TelegramWebApp | null;
  isReady: boolean;
  user: TelegramWebApp['initDataUnsafe']['user'] | null;
  isLoading: boolean; // Add loading state
}

const TelegramContext = createContext<TelegramContextType>({
  webApp: null,
  isReady: false,
  user: null,
  isLoading: true, // Default to loading
});

export const useTelegram = () => useContext(TelegramContext);

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingSpinner = styled.div`
  width: 32px;
  height: 32px;
  border: 1.5px solid #ffffff;
  border-radius: 50%;
  border-top-color: #344cff;
  animation: ${spin} 1s ease-in-out infinite;
`;

const LoadingText = styled.p`
  margin-top: 8px;

  color: #344cff;

  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
`;

const PromoText = styled.div`
  color: #344cff;
  font-family: Inter;
  font-size: 64px;
  font-style: normal;
  font-weight: 600;
  line-height: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

// Loading component
const LoadingScreen: React.FC<{ message?: string }> = ({ message = 'Загрузка' }) => {
  return (
    <>
      <div style={{ margin: '450px auto 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <LoadingSpinner />
        <LoadingText>{message}</LoadingText>
      </div>
    </>
  );
};

// Loading component
const LoadingLogoWrapper = styled.div`
  position: absolute;
  top: 250px;
  left: -80px;
`;

const LoadingLogo: React.FC = () => {
  return (
    <LoadingLogoWrapper>
      <img src="/big-blue-logo.png" alt="Blue Logo" width="1030" height="1030" />
    </LoadingLogoWrapper>
  );
};

const LoadingSmallLogoIcon = () => (
  <svg width="64" height="56" viewBox="0 0 64 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M25.7105 43.6597L17.4562 51.914L4 38.4579V17.5421L17.4562 4.08597L25.7105 12.3403L11.8208 26.2299C10.8455 27.2053 10.8455 28.7947 11.8208 29.7701L25.7105 43.6597Z"
      fill="#344CFF"
    />
    <path d="M37.3785 4.095H25.7104V51.905H37.3785V4.095Z" fill="#344CFF" />
    <path
      d="M37.3785 43.6597L45.6329 51.914L59.089 38.4579V17.5421L45.6329 4.08597L37.3785 12.3403L51.2682 26.2299C52.2435 27.2053 52.2435 28.7947 51.2682 29.7701L37.3785 43.6597Z"
      fill="#344CFF"
    />
  </svg>
);
const PromoFirstLine = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoadingPromo: React.FC = () => {
  return (
    <PromoText>
      <PromoFirstLine>
        <span>БУДУЩЕЕ</span>
        <span>ТРЕЙДИНГА</span>
        <span style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          УЖЕ <LoadingSmallLogoIcon />
        </span>
      </PromoFirstLine>
      <span style={{ marginLeft: 'auto' }}>ЗДЕСЬ</span>
    </PromoText>
  );
};

export const TelegramProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Access the Telegram WebApp API
    const tgWebApp = (window as any).Telegram?.WebApp;

    if (tgWebApp) {
      setWebApp(tgWebApp);

      // Tell Telegram that the WebApp is ready
      tgWebApp.ready();

      // Optional: Sync Telegram theme with your app theme
      if (tgWebApp.colorScheme) {
        document.documentElement.className = tgWebApp.colorScheme;
      }

      // Set a timeout to ensure we show the loading screen for at least a short time
      // This prevents flickering if the app loads very quickly
      setTimeout(() => {
        setIsReady(true);
        setIsLoading(false);
      }, 1000); // Show loading for at least 1 second
    } else {
      // If we're not in a Telegram WebApp environment, still allow the app to load
      // This is useful for development outside of Telegram
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }

    // Add a fallback timeout to prevent infinite loading
    const fallbackTimer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // Max 5 seconds of loading

    return () => clearTimeout(fallbackTimer);
  }, []);

  const value = {
    webApp,
    isReady,
    user: webApp?.initDataUnsafe?.user || null,
    isLoading,
  };

  return (
    <TelegramContext.Provider value={value}>
      {isLoading ? (
        <AuthLayout>
          <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* <LoadingOverlay> */}
            <LoadingPromo />
            <LoadingLogo />
            <LoadingScreen />
          </div>
          {/* </LoadingOverlay> */}
        </AuthLayout>
      ) : (
        children
      )}
    </TelegramContext.Provider>
  );
};
