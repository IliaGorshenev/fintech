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
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333;
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
  transition: background-color 0.2s;

  &:hover {
    background-color: #0077b5;
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
        <p>Обменивайте криптовалюты с низкими комиссиями, безопасными транзакциями и актуальными рыночными курсами.</p>

        <TelegramButton to="/auth">
          <TelegramIcon />
          Войти через Telegram
        </TelegramButton>
      </WelcomeSection>
    </AuthLayout>
  );
}
