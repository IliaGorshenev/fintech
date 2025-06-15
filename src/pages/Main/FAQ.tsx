import { Button } from '@/components/Form/Button';
import MainLayout from '@/layouts/MainLayout';
import React, { useState } from 'react';
import { styled } from 'styled-components';
import { PageContainer, Title } from './styles.module';

const FAQContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
`;

const AccordionItem = styled.div`
  border-radius: 12px;
  background-color: var(--secondary);
  overflow: hidden;
`;

const AccordionHeader = styled.button<{ $isOpen: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;

  svg {
    transition: transform 0.3s ease;
    transform: ${(props) => (props.$isOpen ? 'rotate(180deg)' : 'rotate(0)')};
  }
`;

const AccordionTitle = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: var(--foreground);
`;

const AccordionContent = styled.div<{ $isOpen: boolean }>`
  padding: ${(props) => (props.$isOpen ? '0 16px 16px 16px' : '0 16px')};
  max-height: ${(props) => (props.$isOpen ? '500px' : '0')};
  overflow: hidden;
  transition: all 0.3s ease;
`;

const AccordionText = styled.p`
  font-size: 14px;
  color: var(--foreground);
  margin: 0;
  line-height: 1.5;
`;

const ActionButton = styled(Button)`
  margin-top: 24px;
`;

interface FAQItemProps {
  question: string;
  answer: string;
}

const faqData: FAQItemProps[] = [
  {
    question: 'Какие криптовалюты и фиатные валюты поддерживаются?',
    answer:
      'Мы поддерживаем широкий спектр криптовалют, включая Bitcoin (BTC), Ethereum (ETH), Tether (USDT), и другие. Из фиатных валют доступны рубли (RUB), доллары (USD), евро (EUR) и другие основные мировые валюты. Полный список доступных валют вы можете увидеть в разделе обмена.',
  },
  {
    question: 'Какая комиссия взимается при обмене?',
    answer:
      'Комиссия зависит от типа операции, объема и выбранных валют. Обычно она составляет от 0.5% до 2%. Точный размер комиссии вы увидите перед подтверждением операции. Для пользователей с высоким уровнем предусмотрены скидки на комиссию.',
  },
  {
    question: 'От чего зависит мой уровень?',
    answer:
      'Ваш уровень (Bronze, Silver, Gold, Platinum) зависит от общего объема проведенных операций и активности в системе. Чем выше уровень, тем больше привилегий вы получаете, включая сниженные комиссии, приоритетную поддержку и эксклюзивные курсы обмена.',
  },
  {
    question: 'Сколько по времени занимает проведение сделки?',
    answer:
      'Время проведения сделки зависит от типа операции. Обмен между фиатными валютами обычно занимает от нескольких минут до 24 часов. Операции с криптовалютами могут занимать от 10 минут до нескольких часов в зависимости от загруженности сети блокчейн. Мы стремимся обрабатывать все операции максимально быстро и предоставляем статус выполнения в реальном времени.',
  },
];

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    if (openItems.includes(index)) {
      setOpenItems(openItems.filter((item) => item !== index));
    } else {
      setOpenItems([...openItems, index]);
    }
  };

  return (
    <MainLayout>
      <PageContainer>
        <Title>FAQ</Title>

        <FAQContainer>
          {faqData.map((item, index) => (
            <AccordionItem key={index}>
              <AccordionHeader $isOpen={openItems.includes(index)} onClick={() => toggleItem(index)}>
                <AccordionTitle>{item.question}</AccordionTitle>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L12 15L18 9" stroke="var(--foreground)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </AccordionHeader>

              <AccordionContent $isOpen={openItems.includes(index)}>
                <AccordionText>{item.answer}</AccordionText>
              </AccordionContent>
            </AccordionItem>
          ))}
        </FAQContainer>

        <ActionButton variant="primary" fullWidth>
          Задать свой вопрос
        </ActionButton>
      </PageContainer>
    </MainLayout>
  );
};

export default FAQ;
