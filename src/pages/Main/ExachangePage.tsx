import { Button } from '@/components/Form/Button';
import { Checkbox, CheckboxContainer } from '@/components/Form/Checkbox';
import { InputField } from '@/components/Form/InputField';
import { SelectField } from '@/components/select/SelectField';
import { ChangeArrowsIcon, InfoIcon, QuestionIcon } from '@/icons/icons';
import MainLayout from '@/layouts/MainLayout';
import React, { useState } from 'react';
import styled from 'styled-components';
import { FormGroup, InfoBox, InfoText, InputWithSymbol, PageContainer, Title } from './styles.module';

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
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
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
  flex-direction: column;
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

const ErrorText = styled.p`
  color: var(--error);
  font-size: 12px;
  margin-top: 4px;
`;

const ExchangePage: React.FC = () => {
  const [givingAmount, setGivingAmount] = useState('');
  const [receivingAmount, setReceivingAmount] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [isCourierDelivery, setIsCourierDelivery] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState('');

  // Validation states
  const [errors, setErrors] = useState({
    selectedOffice: '',
    givingAmount: '',
  });
  const [touched, setTouched] = useState({
    selectedOffice: false,
    givingAmount: false,
  });

  const validate = () => {
    const newErrors = {
      selectedOffice: !selectedOffice ? 'Выберите адрес офиса' : '',
      givingAmount: !givingAmount ? 'Введите сумму' : '',
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSwap = () => {
    if (validate()) {
      const temp = givingAmount;
      setGivingAmount(receivingAmount);
      setReceivingAmount(temp);
    } else {
      // Mark fields as touched to show errors
      setTouched({
        selectedOffice: true,
        givingAmount: true,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      console.log({ givingAmount, receivingAmount, promoCode, isCourierDelivery, selectedOffice });
      // Submit form logic here
    } else {
      // Mark fields as touched to show errors
      setTouched({
        selectedOffice: true,
        givingAmount: true,
      });
    }
  };

  const handleRefreshRate = () => {
    console.log('Refreshing exchange rate');
  };

  const handleOfficeChange = (value: string) => {
    setSelectedOffice(value);
    setTouched((prev) => ({ ...prev, selectedOffice: true }));
    setErrors((prev) => ({ ...prev, selectedOffice: !value ? 'Выберите адрес офиса' : '' }));
  };

  const handleGivingAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGivingAmount(value);
    setTouched((prev) => ({ ...prev, givingAmount: true }));
    setErrors((prev) => ({ ...prev, givingAmount: !value ? 'Введите сумму' : '' }));
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

        <ExchangeRateBox>Текущий курс: 83,26 ₽ ≈ 1 USDT</ExchangeRateBox>

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <SelectField
              label="Адрес офиса"
              options={officeOptions}
              value={selectedOffice}
              onChange={handleOfficeChange}
              placeholder="Выберите адрес офиса"
              error={touched.selectedOffice && errors.selectedOffice ? errors.selectedOffice : undefined}
            />
          </FormGroup>

          <FormGroup>
            <InputWithSymbol>
            <InputField
              label="Отдаёте"
              placeholder="200 000"
              type="text"
              value={givingAmount}
              onChange={handleGivingAmountChange}
              error={touched.givingAmount && errors.givingAmount ? { type: 'manual', message: errors.givingAmount } : undefined}
            />
            </InputWithSymbol>
          </FormGroup>

          <ArrowButton type="button" onClick={handleSwap} disabled={!selectedOffice || !givingAmount}>
            <ChangeArrowsIcon />
          </ArrowButton>

          <FormGroup>
            <InputWithSymbol>
              <InputField label="Получаете" placeholder="24 02" type="text" value={receivingAmount} onChange={(e) => setReceivingAmount(e.target.value)} />
            </InputWithSymbol>
          </FormGroup>

          <CheckboxContainer>
  <Checkbox
    id="courierDelivery"
    label={
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        Доставка курьером <QuestionIcon></QuestionIcon>
      </div>
    }
    checked={isCourierDelivery}
    onChange={(e) => setIsCourierDelivery((e.target as HTMLInputElement).checked)}
    error={false}
  />
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
            <Button type="submit" disabled={!selectedOffice || !givingAmount}>
              Оставить заявку
            </Button>
            <SecondaryButton type="button" onClick={handleRefreshRate}>
              Обновить курс
            </SecondaryButton>
          </ButtonGroup>
        </form>
      </PageContainer>
    </MainLayout>
  );
};

export default ExchangePage;
