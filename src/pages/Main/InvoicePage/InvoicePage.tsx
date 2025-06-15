import { Button } from '@/components/Form/Button';
import { InputField } from '@/components/Form/InputField';
import { SelectField } from '@/components/select/SelectField';
import { InfoIcon } from '@/icons/icons';
import MainLayout from '@/layouts/MainLayout';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormGroup, InfoBox, InfoText, PageContainer, Title } from '../styles.module';
import { DeleteButton, FileIcon, FileItem, FileList1, FileName, FileUploadButton, FileUploadSection } from './style.module';

// Define form data type
interface InvoiceFormData {
  country: string;
  office: string;
  serviceName: string;
  currency: string;
  amount: string;
  comment?: string;
  promoCode?: string;
}

const InvoicePage: React.FC = () => {
  // Use React Hook Form for all fields
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InvoiceFormData>({
    defaultValues: {
      country: '',
      office: '',
      serviceName: '',
      currency: '',
      amount: '',
      comment: '',
      promoCode: '',
    },
    mode: 'onBlur', // Validate on blur for better UX
  });

  const [files, setFiles] = useState([
    { id: 1, name: 'invoice_details.pdf', type: 'PDF' },
    { id: 2, name: 'product_image.jpg', type: 'JPG' },
  ]);

  // Options for select fields
  const officeOptions = [
    { value: 'office1', label: 'Москва, ул. Тверская, 1' },
    { value: 'office2', label: 'Санкт-Петербург, Невский пр., 28' },
    { value: 'office3', label: 'Казань, ул. Баумана, 15' },
  ];

  const currencyOptions = [
    { value: 'rub', label: 'Рубли (₽)' },
    { value: 'usd', label: 'Доллары ($)' },
    { value: 'eur', label: 'Евро (€)' },
    { value: 'usdt', label: 'USDT' },
  ];

  // File handlers
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((file, index) => ({
        id: Date.now() + index,
        name: file.name,
        type: file.name.split('.').pop()?.toUpperCase() || 'FILE',
      }));

      setFiles([...files, ...newFiles]);
    }
  };

  const handleDeleteFile = (id: number) => {
    setFiles(files.filter((file) => file.id !== id));
  };

  // Form submission
  const onSubmit = (data: InvoiceFormData) => {
    console.log({
      ...data,
      files,
    });
    // Submit logic here
  };

  return (
    <MainLayout>
      <PageContainer>
        <Title>Инвойс</Title>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Controller
              name="country"
              control={control}
              rules={{ required: 'Укажите страну оплаты' }}
              render={({ field }) => <InputField label="Страна оплаты" type="text" placeholder="Введите название страны" {...field} error={errors.country} />}
            />
          </FormGroup>

          <FormGroup>
            <Controller
              name="office"
              control={control}
              rules={{ required: 'Выберите адрес офиса' }}
              render={({ field }) => (
                <SelectField label="Адрес офиса" options={officeOptions} placeholder="Выберите адрес офиса" {...field} error={errors.office?.message} />
              )}
            />
          </FormGroup>

          <FormGroup>
            <Controller
              name="serviceName"
              control={control}
              rules={{ required: 'Укажите наименование услуги/товаров' }}
              render={({ field }) => <InputField label="Наименование услуги/товаров" type="text" placeholder="Введите название" {...field} error={errors.serviceName} />}
            />
          </FormGroup>

          <FormGroup>
            <Controller
              name="currency"
              control={control}
              rules={{ required: 'Выберите валюту оплаты' }}
              render={({ field }) => (
                <SelectField label="Валюта оплаты" options={currencyOptions} placeholder="Выберите валюту" {...field} error={errors.currency?.message} />
              )}
            />
          </FormGroup>

          <FormGroup>
            <Controller
              name="amount"
              control={control}
              rules={{ required: 'Укажите сумму оплаты' }}
              render={({ field }) => <InputField label="Сумма оплаты" type="text" placeholder="Введите сумму" {...field} error={errors.amount} />}
            />
          </FormGroup>

          <FormGroup>
            <Controller
              name="comment"
              control={control}
              render={({ field }) => <InputField label="Комментарий" type="textarea" {...field} placeholder="Напишите свои пожелания" rows={5} />}
            />
          </FormGroup>

          <FileUploadSection>
            <FileUploadButton>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14 5.5V12.5C14 13.0523 13.5523 14 13 14H3C2.44772 14 2 13.0523 2 12.5V3.5C2 2.94772 2.44772 2 3 2H10.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path d="M5.5 8.5L8 6L10.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 6V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Прикрепить файл
              <input type="file" onChange={handleFileUpload} multiple />
            </FileUploadButton>

            <FileList1>
              {files.map((file) => (
                <FileItem key={file.id}>
                  <FileIcon>{file.type}</FileIcon>
                  <FileName>{file.name}</FileName>
                  <DeleteButton onClick={() => handleDeleteFile(file.id)}>×</DeleteButton>
                </FileItem>
              ))}
            </FileList1>
          </FileUploadSection>

          <FormGroup>
            <Controller
              name="promoCode"
              control={control}
              render={({ field }) => <InputField label="Промокод" type="text" placeholder="Введите промокод" {...field} />}
            />
          </FormGroup>

          <InfoBox>
            <InfoIcon />
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

export default InvoicePage;
