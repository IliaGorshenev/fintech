import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import styled from 'styled-components';
import { InputField } from '@/components/Form/InputField';
import { Button } from '@/components/Form/Button';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
  background-color: var(--background);
  min-height: 100vh;
  padding: 24px;
  padding-top: 62px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  color: var(--foreground);
`;

const ContentCard = styled.div`
  background-color: var(--background);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0px 4px 12px 0px rgba(52, 76, 255, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background-color: var(--input-bg);
  color: var(--foreground);
  font-size: 16px;
  margin-bottom: 16px;
  
  &:focus {
    border-color: var(--primary);
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background-color: var(--input-bg);
  color: var(--foreground);
  font-size: 16px;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    border-color: var(--primary);
    outline: none;
  }
`;

const FileUploadSection = styled.div`
  margin-bottom: 20px;
`;

const FileUploadButton = styled.label`
  display: flex;
  align-items: center;
  color: var(--primary);
  cursor: pointer;
  margin-bottom: 12px;
  
  input {
    display: none;
  }
  
  svg {
    margin-right: 8px;
  }
`;

const FileList = styled.div`
  margin-top: 12px;
`;

const FileItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  background-color: var(--input-bg);
  border-radius: 4px;
  margin-bottom: 8px;
`;

const FileIcon = styled.div`
  width: 24px;
  height: 24px;
  background-color: var(--text-secondary);
  color: white;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  margin-right: 8px;
`;

const FileName = styled.span`
  flex: 1;
  font-size: 14px;
  color: var(--foreground);
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 16px;
  
  &:hover {
    color: var(--error);
  }
`;

const InvoicePage: React.FC = () => {
  const [country, setCountry] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [amount, setAmount] = useState('');
  const [comment, setComment] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [files, setFiles] = useState([
    { id: 1, name: 'invoice_details.pdf', type: 'PDF' },
    { id: 2, name: 'product_image.jpg', type: 'JPG' }
  ]);
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((file, index) => ({
        id: Date.now() + index,
        name: file.name,
        type: file.name.split('.').pop()?.toUpperCase() || 'FILE'
      }));
      
      setFiles([...files, ...newFiles]);
    }
  };
  
  const handleDeleteFile = (id: number) => {
    setFiles(files.filter(file => file.id !== id));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ country, serviceName, amount, comment, promoCode, files });
  };
  
  return (
    <MainLayout>
      <PageContainer>
        <Title>Инвойс</Title>
        <ContentCard>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <InputField 
                label="Страна оплаты" 
                type="text" 
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </FormGroup>
            
            <FormGroup>
              <Select defaultValue="">
                <option value="" disabled>Адрес офиса</option>
                <option value="office1">Москва, ул. Тверская, 1</option>
                <option value="office2">Санкт-Петербург, Невский пр., 28</option>
                <option value="office3">Казань, ул. Баумана, 15</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <InputField 
                label="Наименование услуги/товаров" 
                type="text" 
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
              />
            </FormGroup>
            
            <FormGroup>
              <Select defaultValue="">
                <option value="" disabled>Валюта оплаты</option>
                <option value="rub">Рубли (₽)</option>
                <option value="usd">Доллары ($)</option>
                <option value="eur">Евро (€)</option>
                <option value="usdt">USDT</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <InputField 
                label="Сумма оплаты" 
                type="text" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </FormGroup>
            
            <FormGroup>
              <label>Комментарий</label>
              <TextArea 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Введите комментарий"
              />
            </FormGroup>
            
            <FileUploadSection>
              <FileUploadButton>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 5.5V12.5C14 13.0523 13.5523 14 13 14H3C2.44772 14 2 13.0523 2 12.5V3.5C2 2.94772 2.44772 2 3 2H10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M5.5 8.5L8 6L10.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 6V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Прикрепить файл
                <input type="file" onChange={handleFileUpload} multiple />
              </FileUploadButton>
              
              <FileList>
                {files.map(file => (
                  <FileItem key={file.id}>
                    <FileIcon>{file.type}</FileIcon>
                    <FileName>{file.name}</FileName>
                    <DeleteButton onClick={() => handleDeleteFile(file.id)}>×</DeleteButton>
                  </FileItem>
                ))}
              </FileList>
            </FileUploadSection>
            
            <FormGroup>
              <InputField 
                label="Промокод" 
                type="text" 
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
            </FormGroup>
            
            <Button type="submit">Оставить заявку</Button>
          </form>
        </ContentCard>
      </PageContainer>
    </MainLayout>
  );
};

export default InvoicePage;
