import { Button } from '@/components/Form/Button';
import { InputField } from '@/components/Form/InputField';
import { SelectField } from '@/components/select/SelectField';
import { ChangeArrowsIcon, InfoIcon } from '@/icons/icons';
import MainLayout from '@/layouts/MainLayout';
import React, { useState } from 'react';
import styled from 'styled-components';
import { FormGroup, InfoBox, InfoText, InputWithSymbol, PageContainer, Title } from './styles.module';

// New styled components specific to ExchangePage
const ContentCard = styled.div`
  background: var(--background);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const ExchangeRateBox = styled.div`
  background: var(--primary-light);
  color: var(--primary);
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-weight: 600;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin: 10px 0;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
`;

const QuestionMark = styled.span`
  margin-left: 5px;
  color: var(--primary);
  cursor: help;
`;

const DisabledText = styled.p`
  color: var(--grey-500);
  font-size: 14px;
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const SecondaryButton = styled(Button)`
  background: var(--background);
  color: var(--primary);
  border: 1px solid var(--primary);

  &:hover {
    background: var(--primary-light);
  }
`;

const ExchangePage: React.FC = () => {
  const [givingAmount, setGivingAmount] = useState('');
  const [receivingAmount, setReceivingAmount] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [isCourierDelivery, setIsCourierDelivery] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState('');

  const handleSwap = () => {
    const temp = givingAmount;
    setGivingAmount(receivingAmount);
    setReceivingAmount(temp);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ givingAmount, receivingAmount, promoCode, isCourierDelivery, selectedOffice });
  };

  const handleRefreshRate = () => {
    console.log('Refreshing exchange rate');
  };

  const officeOptions = [
    { value: 'office1', label: 'Москва, ул. Тверская, 1' },
    { value: 'office2', label: 'Санкт-Петербург, Невский пр., 28' },
    { value: 'office3', label: 'Казань, ул. Баумана, 15' },
  ];

  return (
    <MainLayout>
      <PageContainer>
        <Title>Обмен</Title>
        <ContentCard>
          <ExchangeRateBox>Текущий курс: 83,26 ₽ ≈ 1 USDT</ExchangeRateBox>

          <form onSubmit={handleSubmit}>
            <FormGroup>
              <SelectField
                label="Адрес офиса"
                options={officeOptions}
                value={selectedOffice}
                onChange={setSelectedOffice}
                placeholder="Выберите адрес офиса"
              />
            </FormGroup>

            <FormGroup>
              <InputWithSymbol>
                <InputField label="Отдаёте" type="text" value={givingAmount} onChange={(e) => setGivingAmount(e.target.value)} />
                <button type="button">₽</button>
              </InputWithSymbol>
            </FormGroup>

            <ArrowButton type="button" onClick={handleSwap}>
              <ChangeArrowsIcon />
            </ArrowButton>

            <FormGroup>
              <InputWithSymbol>
                <InputField label="Получаете" type="text" value={receivingAmount} onChange={(e) => setReceivingAmount(e.target.value)} />
                <button type="button">₿</button>
              </InputWithSymbol>
            </FormGroup>

            <CheckboxContainer>
              <Checkbox type="checkbox" id="courierDelivery" checked={isCourierDelivery} onChange={(e) => setIsCourierDelivery(e.target.checked)} disabled />
              <CheckboxLabel htmlFor="courierDelivery">
                Доставка курьером
                <QuestionMark title="Информация о доставке курьером">?</QuestionMark>
              </CheckboxLabel>
            </CheckboxContainer>
            <DisabledText>Функция станет доступна с уровня «Gold»</DisabledText>

            <FormGroup>
              <InputField label="Промокод" type="text" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
            </FormGroup>

            <InfoBox>
              <InfoIcon />
              <InfoText>Курс фиксируется на 1 час</InfoText>
            </InfoBox>

            <ButtonGroup>
              <Button type="submit">Оставить заявку</Button>
              <SecondaryButton type="button" onClick={handleRefreshRate}>
                Обновить курс
              </SecondaryButton>
            </ButtonGroup>
          </form>
        </ContentCard>
      </PageContainer>
    </MainLayout>
  );
};

export default ExchangePage;