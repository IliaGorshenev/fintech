import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import styled from 'styled-components';
import { Button } from '@/components/Form/Button';
import { InputField } from '@/components/Form/InputField';

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

const Section = styled.div`
  margin-bottom: 32px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--foreground);
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

const Avatar = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: var(--primary-light);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  color: var(--primary);
  font-size: 24px;
  font-weight: 600;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: var(--foreground);
`;

const UserHandle = styled.span`
  font-size: 14px;
  color: var(--text-secondary);
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
  margin-left: auto;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  
  &:checked + span {
    background-color: var(--primary);
  }
  
  &:checked + span:before {
    transform: translateX(24px);
  }
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--border-color);
  transition: 0.4s;
  border-radius: 24px;
  
  &:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const SettingRow = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid var(--border-color);
  
  &:last-child {
    border-bottom: none;
  }
`;

const SettingLabel = styled.span`
  font-size: 16px;
  color: var(--foreground);
`;

const LogoutButton = styled(Button)`
  background-color: var(--error);
  
  &:hover {
    background-color: var(--error-dark);
  }
`;

const SettingsPage: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [biometrics, setBiometrics] = useState(true);
  
  return (
    <MainLayout>
      <PageContainer>
        <Title>Настройки</Title>
        
        <ContentCard>
          <Section>
            <ProfileInfo>
              <Avatar>А</Avatar>
              <UserDetails>
                <UserName>Александр</UserName>
                <UserHandle>@aplanov</UserHandle>
              </UserDetails>
            </ProfileInfo>
            
            <Button>Редактировать профиль</Button>
          </Section>
          
          <Section>
            <SectionTitle>Безопасность</SectionTitle>
            
            <SettingRow>
              <SettingLabel>Биометрическая аутентификация</SettingLabel>
              <ToggleSwitch>
                <ToggleInput 
                  type="checkbox" 
                  checked={biometrics}
                  onChange={() => setBiometrics(!biometrics)}
                />
                <ToggleSlider />
              </ToggleSwitch>
            </SettingRow>
            
            <SettingRow>
              <SettingLabel>Изменить пароль</SettingLabel>
              <Button>Изменить</Button>
            </SettingRow>
          </Section>
          
          <Section>
            <SectionTitle>Уведомления</SectionTitle>
            
            <SettingRow>
              <SettingLabel>Push-уведомления</SettingLabel>
              <ToggleSwitch>
                <ToggleInput 
                  type="checkbox" 
                  checked={notifications}
                  onChange={() => setNotifications(!notifications)}
                />
                <ToggleSlider />
              </ToggleSwitch>
            </SettingRow>
          </Section>
          
          <Section>
            <SectionTitle>Внешний вид</SectionTitle>
            
            <SettingRow>
              <SettingLabel>Темная тема</SettingLabel>
              <ToggleSwitch>
                <ToggleInput 
                  type="checkbox" 
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                />
                <ToggleSlider />
              </ToggleSwitch>
            </SettingRow>
          </Section>
          
          <Section>
            <SectionTitle>Аккаунт</SectionTitle>
            <LogoutButton>Выйти из аккаунта</LogoutButton>
          </Section>
        </ContentCard>
      </PageContainer>
    </MainLayout>
  );
};

export default SettingsPage;
