import { AuthLayout } from '@/components/layout/AuthLayout';
import { LoadingSmallLogoIcon, TelegramIcon } from '@/icons/icons';
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
