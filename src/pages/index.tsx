import { AuthLayout } from '@/features/auth/layout/AuthLayout';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const WelcomeSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  background-color: var(--background);
  color: var(--foreground);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--foreground);
  font-weight: bold;
`;

const Description = styled.p`
  color: var(--foreground);
  margin-bottom: 1.5rem;
  max-width: 600px;
`;

const TelegramButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0088cc; /* Telegram blue */
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  margin-top: 1.5rem;
  transition: all 0.2s ease;
  border: 1px solid transparent;

  /* Dark mode specific styles using CSS variables */
  .dark & {
    opacity: 0.9;
    box-shadow: 0 0 10px rgba(0, 136, 204, 0.3);
  }

  &:hover {
    background-color: #0077b5;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    opacity: 1;
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    margin-right: 0.5rem;
  }
`;

const TelegramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20.665 3.717L2.93497 10.554C1.72497 11.04 1.73197 11.715 2.71297 12.016L7.26497 13.436L17.797 6.791C18.295 6.488 18.75 6.651 18.376 6.983L9.84297 14.684H9.84097L9.84297 14.685L9.52897 19.377C9.98897 19.377 10.192 19.166 10.45 18.917L12.661 16.767L17.26 20.164C18.108 20.631 18.717 20.391 18.928 19.379L21.947 5.151C22.256 3.912 21.474 3.351 20.665 3.717Z"
      fill="currentColor"
    />
  </svg>
);

export default function IndexPage() {
  return (
    <AuthLayout>
      <WelcomeSection>
        <Title>ФинТех - Быстрый и безопасный обмен криптовалют</Title>
        <Description>
          Обменивайте криптовалюты с низкими комиссиями, безопасными транзакциями и актуальными рыночными курсами.
        </Description>

        <TelegramButton to="/auth">
          <TelegramIcon />
          Войти через Telegram
        </TelegramButton>
      </WelcomeSection>
    </AuthLayout>
  );
}
