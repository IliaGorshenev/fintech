import { LoadingSmallLogoIcon, TelegramIcon } from '@/components/icons';
import { AuthLayout } from '@/features/auth/layout/AuthLayout';
import { TelegramButton, Title, WelcomeSection } from './styles.module';

export default function IndexPage() {
  return (
    <AuthLayout>
      <WelcomeSection>
        <LoadingSmallLogoIcon></LoadingSmallLogoIcon>
        <Title>Вход</Title>

        <TelegramButton to="/auth">
          <TelegramIcon />
          Войти через Телеграм
        </TelegramButton>
      </WelcomeSection>
    </AuthLayout>
  );
}
