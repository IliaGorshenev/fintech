import { LayoutContainer } from './styles.module';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return <LayoutContainer>{children}</LayoutContainer>;
};
