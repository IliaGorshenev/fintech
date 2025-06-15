import MainLayout from '@/layouts/MainLayout';
import React, { useState } from 'react';

import { Button } from '@/components/Form/Button';
import { InputField } from '@/components/Form/InputField';
import { Title } from '@/pages/styles.module';
import { PageContainer, SectionTitle } from '../styles.module';
import {
  AvatarContainer,
  ButtonsContainer,
  DataItem,
  DataLabel,
  DataList,
  DataValue,
  EditButton,
  LanguageButton,
  ProfileContainer,
  SectionHeader,
  UserName,
  UserTier,
} from './styles.module';

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Александр',
    email: 'aplanov@mail.com',
    telegram: '@aplanov',
    birthdate: '19.04.1995',
    phone: '+7 999 999-99-99',
  });

  const handleInputChange = (field: keyof typeof userData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [field]: e.target.value,
    });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // Here you would typically send the updated data to your backend
    console.log('Saving user data:', userData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset to original data
    setUserData({
      name: 'Александр',
      email: 'aplanov@mail.com',
      telegram: '@aplanov',
      birthdate: '19.04.1995',
      phone: '+7 999 999-99-99',
    });
    setIsEditing(false);
  };

  return (
    <MainLayout>
      <PageContainer>
        <Title>Профиль</Title>

        <ProfileContainer>
          <AvatarContainer>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M20 20C23.6819 20 26.6667 17.0152 26.6667 13.3333C26.6667 9.65144 23.6819 6.66667 20 6.66667C16.3181 6.66667 13.3333 9.65144 13.3333 13.3333C13.3333 17.0152 16.3181 20 20 20Z"
                stroke="var(--foreground)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M33.3333 33.3333C33.3333 27.8333 27.3333 23.3333 20 23.3333C12.6667 23.3333 6.66666 27.8333 6.66666 33.3333"
                stroke="var(--foreground)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </AvatarContainer>

          <UserName>Александр</UserName>

          <UserTier>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7.99998 1.33334L10.06 5.50668L14.6666 6.18001L11.3333 9.42668L12.12 14.0133L7.99998 11.8467L3.87998 14.0133L4.66665 9.42668L1.33331 6.18001L5.93998 5.50668L7.99998 1.33334Z"
                stroke="var(--foreground)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Silver
          </UserTier>
        </ProfileContainer>

        <SectionHeader>
          <SectionTitle>Данные</SectionTitle>
          {!isEditing && (
            <EditButton onClick={handleEditToggle}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9.16669 2.33334L3.50002 8.33334V10.6667H5.83335L11.8334 4.66668L9.16669 2.33334Z"
                  stroke="var(--green-900)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M7.5 4L10 6.5" stroke="var(--green-900)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13.3333 13.6667H2.66667" stroke="var(--green-900)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </EditButton>
          )}
        </SectionHeader>

        <DataList>
          {isEditing ? (
            <>
              <InputField label="Имя" value={userData.name} onChange={handleInputChange('name')} />

              <InputField label="E-mail" value={userData.email} onChange={handleInputChange('email')} type="email" />

              <InputField label="Telegram" value={userData.telegram} onChange={handleInputChange('telegram')} />

              <InputField label="Дата рождения" value={userData.birthdate} onChange={handleInputChange('birthdate')} />

              <InputField label="Телефон" value={userData.phone} onChange={handleInputChange('phone')} type="tel" />

              <ButtonsContainer>
                <Button type="button" onClick={handleSave} style={{ flex: 1 }}>
                  Сохранить
                </Button>
                <Button type="button" variant="outline" onClick={handleCancel} style={{ flex: 1 }}>
                  Отмена
                </Button>
              </ButtonsContainer>
            </>
          ) : (
            <>
              <DataItem>
                <DataLabel>Имя</DataLabel>
                <DataValue>{userData.name}</DataValue>
              </DataItem>

              <DataItem>
                <DataLabel>E-mail</DataLabel>
                <DataValue>{userData.email}</DataValue>
              </DataItem>

              <DataItem>
                <DataLabel>Telegram</DataLabel>
                <DataValue>{userData.telegram}</DataValue>
              </DataItem>

              <DataItem>
                <DataLabel>Дата рождения</DataLabel>
                <DataValue>{userData.birthdate}</DataValue>
              </DataItem>

              <DataItem>
                <DataLabel>Телефон</DataLabel>
                <DataValue>{userData.phone}</DataValue>
              </DataItem>
            </>
          )}
        </DataList>

        {!isEditing && <LanguageButton>Выбрать язык интерфейса</LanguageButton>}
      </PageContainer>
    </MainLayout>
  );
};

export default ProfilePage;
