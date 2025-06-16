import { Button } from '@/components/Form/Button';
import { InputField } from '@/components/Form/InputField';
import { SelectField } from '@/components/select/SelectField';
import { InfoIcon } from '@/icons/icons';
import MainLayout from '@/layouts/MainLayout';
import React from 'react';
import { Controller, FieldError, useForm } from 'react-hook-form';
import { FormGroup, InfoBox, InfoText, InputWithSymbol, PageContainer, Title } from './styles.module';

interface ReshuffleFormData {
  officeFrom: string;
  officeTo: string;
  sendingCurrency: string;
  amount: string;
  comment?: string;
  promoCode?: string;
  error?: string | FieldError;
}

export const ReshufflePage: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ReshuffleFormData>({
    defaultValues: {
      officeFrom: '',
      officeTo: '',
      sendingCurrency: '',
      amount: '',
      comment: '',
      promoCode: '',
    },
  });

  const onSubmit = (data: ReshuffleFormData) => {
    console.log(data);
    // Handle form submission
  };

  const officeOptions = [
    { value: 'office1', label: 'Москва, ул. Тверская, 1' },
    { value: 'office2', label: 'Санкт-Петербург, Невский пр., 28' },
    { value: 'office3', label: 'Казань, ул. Баумана, 15' },
  ];

  const currencyOptions = [
    { value: 'rub', label: 'Рубли (₽)' },
    { value: 'usd', label: 'Доллары ($)' },
    { value: 'eur', label: 'Евро (€)' },
  ];

  return (
    <MainLayout>
      <PageContainer>
        <Title>Перестановка</Title>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Controller
              name="officeFrom"
              control={control}
              rules={{ required: 'Это поле обязательно' }}
              render={({ field }) => <SelectField label="Офис приёма" options={officeOptions} {...field} placeholder="Адрес офиса" error={errors.officeFrom?.message} />}
            />
          </FormGroup>
          <FormGroup>
            <Controller
              name="officeTo"
              control={control}
              rules={{ required: 'Это поле обязательно' }}
              render={({ field }) => <SelectField label="Офис получения" options={officeOptions} {...field} placeholder="Адрес офиса" error={errors.officeTo?.message} />}
            />
          </FormGroup>

          <FormGroup>
            <Controller
              name="sendingCurrency"
              control={control}
              rules={{ required: 'Это поле обязательно' }}
              render={({ field }) => (
                <SelectField label="Валюта к передаче" options={currencyOptions} {...field} placeholder="Отправляемая валюта" error={errors.sendingCurrency?.message} />
              )}
            />
          </FormGroup>

          <FormGroup>
            <Controller
              name="amount"
              control={control}
              rules={{ required: 'Это поле обязательно' }}
              render={({ field }) => (
                <InputWithSymbol>
                  <InputField label="Желаемая сумма к получению" placeholder="Введите сумму" type="text" {...field} error={errors.amount?.message} />
                </InputWithSymbol>
              )}
            />
          </FormGroup>

          <FormGroup>
            <Controller
              name="comment"
              control={control}
              render={({ field }) => <InputField label="Комментарий" type="textarea" {...field} placeholder="Напишите свои пожелания" rows={5} />}
            />
          </FormGroup>
          <FormGroup>
            <Controller
              name="promoCode"
              control={control}
              render={({ field }) => <InputField label="Промокод" placeholder="Введите промокод" type="text" {...field} />}
            />
          </FormGroup>
          <InfoBox>
            <InfoIcon></InfoIcon>
            <InfoText>Расчёт предварительный, курс выдаётся клиенту индивидуально в чате с менеджером</InfoText>
          </InfoBox>
          <Button style={{ width: '100%' }} type="submit">
            Оставить заявку
          </Button>
        </form>
      </PageContainer>
    </MainLayout>
  );
}; 
