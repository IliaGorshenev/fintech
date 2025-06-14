import { Promo } from '@/components/Promo/Promo';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthLayout } from '../auth/layout/AuthLayout';

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
      }, 1200); // Show loading for at least 1 second
    } else {
      // If we're not in a Telegram WebApp environment, still allow the app to load
      // This is useful for development outside of Telegram
      setTimeout(() => {
        setIsLoading(false);
      }, 700);
    }

    // Add a fallback timeout to prevent infinite loading
    const fallbackTimer = setTimeout(() => {
      setIsLoading(false);
    }, 6000); // Max 5 seconds of loading

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
        // <AuthLayout>
        //   <Promo></Promo>
        // </AuthLayout>
        children
      ) : (
        children
      )}
    </TelegramContext.Provider>
  );
};
