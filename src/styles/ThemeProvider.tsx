import React from 'react';

// Define theme types
interface ThemeColors {
  background: string;
  foreground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  success: string;
  successForeground: string;
  warning: string;
  warningForeground: string;
  error: string;
  errorForeground: string;
  border: string;
  input: string;
}

interface Theme {
  colors: ThemeColors;
}

// Hook to use theme in styled components
export const useStyledTheme = () => {
  return React.useContext(React.createContext<Theme>({} as Theme));
};
