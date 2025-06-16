import { Button } from '@/components/Form/Button';
import { ThemeSwitch } from '@/components/theme-switch';
import { TelegramIcon } from '@/icons/icons';
import MainLayout from '@/layouts/MainLayout';
import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { TelegramButton, Title } from '../styles.module';
import { PageContainer } from './styles.module';

const MenuLink = styled(Link)`
  display: flex;
  padding: 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border-radius: 12px;
  background: var(--bg-menu-item);
  margin-bottom: 12px;
  text-decoration: none;
  color: var(--foreground);
`;

const MenuItemContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const MenuItemText = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: var(--foreground);
`;

const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.51192 4.43057C8.82641 4.161 9.29989 4.19743 9.56946 4.51192L15.5695 11.5119C15.8102 11.7928 15.8102 12.2072 15.5695 12.4881L9.56946 19.4881C9.29989 19.8026 8.82641 19.839 8.51192 19.5695C8.19743 19.2999 8.161 18.8264 8.43057 18.5119L14.0122 12L8.43057 5.48811C8.161 5.17361 8.19743 4.70014 8.51192 4.43057Z"
      fill="#A1A1AA"
    />
  </svg>
);

const ProfileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
      stroke="#3F3D51"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22"
      stroke="#3F3D51"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const RequestsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M8 2V5" stroke="#3F3D51" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 2V5" stroke="#3F3D51" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3.5 9.09H20.5" stroke="#3F3D51" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
      stroke="#3F3D51"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M15.6947 13.7H15.7037" stroke="#3F3D51" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15.6947 16.7H15.7037" stroke="#3F3D51" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11.9955 13.7H12.0045" stroke="#3F3D51" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11.9955 16.7H12.0045" stroke="#3F3D51" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8.29431 13.7H8.30329" stroke="#3F3D51" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8.29431 16.7H8.30329" stroke="#3F3D51" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 13.4299C13.7231 13.4299 15.12 12.0331 15.12 10.3099C15.12 8.58681 13.7231 7.18994 12 7.18994C10.2769 7.18994 8.88 8.58681 8.88 10.3099C8.88 12.0331 10.2769 13.4299 12 13.4299Z"
      stroke="#3F3D51"
      strokeWidth="1.5"
    />
    <path
      d="M3.62001 8.49C5.59001 -0.169998 18.42 -0.159997 20.38 8.5C21.53 13.58 18.37 17.88 15.6 20.54C13.59 22.48 10.41 22.48 8.39001 20.54C5.63001 17.88 2.47001 13.57 3.62001 8.49Z"
      stroke="#3F3D51"
      strokeWidth="1.5"
    />
  </svg>
);

const DeliveryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 14H13C14.1 14 15 13.1 15 12V2H6C4.5 2 3.19001 2.82999 2.51001 4.04999" stroke="#3F3D51" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M2 17C2 18.66 3.34 20 5 20H6C6 18.9 6.9 18 8 18C9.1 18 10 18.9 10 20H14C14 18.9 14.9 18 16 18C17.1 18 18 18.9 18 20H19C20.66 20 22 18.66 22 17V14H19C18.45 14 18 13.55 18 13V10C18 9.45 18.45 9 19 9H20.29L18.58 6.01001C18.22 5.39001 17.56 5 16.84 5H15V12C15 13.1 14.1 14 13 14H12"
      stroke="#3F3D51"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 22C9.10457 22 10 21.1046 10 20C10 18.8954 9.10457 18 8 18C6.89543 18 6 18.8954 6 20C6 21.1046 6.89543 22 8 22Z"
      stroke="#3F3D51"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 22C17.1046 22 18 21.1046 18 20C18 18.8954 17.1046 18 16 18C14.8954 18 14 18.8954 14 20C14 21.1046 14.8954 22 16 22Z"
      stroke="#3F3D51"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M22 12V14" stroke="#3F3D51" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 8H8" stroke="#3F3D51" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 11H6" stroke="#3F3D51" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 14H4" stroke="#3F3D51" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BonusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M19.5 12.5C19.5 11.12 20.62 10 22 10V9C22 5 21 4 17 4H7C3 4 2 5 2 9V9.5C3.38 9.5 4.5 10.62 4.5 12C4.5 13.38 3.38 14.5 2 14.5V15C2 19 3 20 7 20H17C21 20 22 19 22 15C20.62 15 19.5 13.88 19.5 12.5Z"
      stroke="#3F3D51"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M10 4L10 20" stroke="#3F3D51" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5 5" />
  </svg>
);

const ReferralIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M17 18.43H13L8.54999 20.39C7.88999 20.72 7.09999 20.24 7.09999 19.5V18.43C4.99999 18.43 3.5 16.93 3.5 14.83V8.17C3.5 6.07 4.99999 4.57 7.09999 4.57H17C19.1 4.57 20.6 6.07 20.6 8.17V14.83C20.5 16.93 19 18.43 17 18.43Z"
      stroke="#3F3D51"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 11.36V11.15C12 10.47 12.42 10.11 12.84 9.82C13.25 9.54 13.66 9.18 13.66 8.52C13.66 7.6 12.92 6.85999 12 6.85999C11.08 6.85999 10.34 7.6 10.34 8.52"
      stroke="#3F3D51"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M11.9955 13.75H12.0045" stroke="#3F3D51" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const NotificationsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M12.02 2.91C8.71 2.91 6.02 5.6 6.02 8.91V11.8C6.02 12.41 5.76 13.34 5.45 13.86L4.3 15.77C3.59 16.95 4.08 18.26 5.38 18.7C9.69 20.14 14.34 20.14 18.65 18.7C19.86 18.3 20.39 16.87 19.73 15.77L18.58 13.86C18.28 13.34 18.02 12.41 18.02 11.8V8.91C18.02 5.61 15.32 2.91 12.02 2.91Z"
      stroke="#3F3D51"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeMiterlimit="10"
    />
    <path
      d="M13.87 3.2C13.56 3.11 13.24 3.04 12.91 3C11.95 2.88 11.03 2.95 10.17 3.2C10.46 2.46 11.18 1.94 12.02 1.94C12.86 1.94 13.58 2.46 13.87 3.2Z"
      stroke="#3F3D51"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.02 19.06C15.02 20.71 13.67 22.06 12.02 22.06C11.2 22.06 10.44 21.72 9.89999 21.18C9.35999 20.64 9.01999 19.88 9.01999 19.06"
      stroke="#3F3D51"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FAQIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
      stroke="#3F3D51"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.09003 9.00002C9.32513 8.33169 9.78918 7.76813 10.4 7.40915C11.0108 7.05018 11.7289 6.91896 12.4272 7.03873C13.1255 7.15851 13.7588 7.52153 14.2151 8.06353C14.6713 8.60554 14.9211 9.29153 14.92 10C14.92 12 11.92 13 11.92 13"
      stroke="#3F3D51"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M12 17H12.01" stroke="#3F3D51" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
`;

const SettingsPage: React.FC = () => {
  return (
    <MainLayout>
      <PageContainer>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <Title>Меню</Title>
          <ThemeSwitch></ThemeSwitch>
        </div>
        <MenuLink to="/profile">
          <MenuItemContent>
            <ProfileIcon />
            <MenuItemText>Профиль</MenuItemText>
          </MenuItemContent>
          <ArrowIcon />
        </MenuLink>

        <MenuLink to="/requests">
          <MenuItemContent>
            <RequestsIcon />
            <MenuItemText>Мои заявки</MenuItemText>
          </MenuItemContent>
          <ArrowIcon />
        </MenuLink>

        <MenuLink to="/location">
          <MenuItemContent>
            <LocationIcon />
            <MenuItemText>Геолокация</MenuItemText>
          </MenuItemContent>
          <ArrowIcon />
        </MenuLink>

        <MenuLink to="/delivery">
          <MenuItemContent>
            <DeliveryIcon />
            <MenuItemText>Доставка</MenuItemText>
          </MenuItemContent>
          <ArrowIcon />
        </MenuLink>

        <MenuLink to="/bonus">
          <MenuItemContent>
            <BonusIcon />
            <MenuItemText>Бонусная программа</MenuItemText>
          </MenuItemContent>
          <ArrowIcon />
        </MenuLink>

        <MenuLink to="/referral">
          <MenuItemContent>
            <ReferralIcon />
            <MenuItemText>Реферальная программа</MenuItemText>
          </MenuItemContent>
          <ArrowIcon />
        </MenuLink>

        <MenuLink to="/notifications">
          <MenuItemContent>
            <NotificationsIcon />
            <MenuItemText>Уведомления</MenuItemText>
          </MenuItemContent>
          <ArrowIcon />
        </MenuLink>

        <MenuLink to="/faq">
          <MenuItemContent>
            <FAQIcon />
            <MenuItemText>FAQ</MenuItemText>
          </MenuItemContent>
          <ArrowIcon />
        </MenuLink>

        <TelegramButton style={{ width: '100%', margin: '0', justifyContent: 'flex-start' }} to={'/'}>
          <TelegramIcon></TelegramIcon>Чат с менеджером
        </TelegramButton>
        <ButtonsContainer>
          <Button type="button" variant="outline" style={{ width: '100%', margin: '0', justifyContent: 'flex-start' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12.75 11C12.75 10.5858 12.4142 10.25 12 10.25C11.5858 10.25 11.25 10.5858 11.25 11V13C11.25 13.4142 11.5858 13.75 12 13.75C12.4142 13.75 12.75 13.4142 12.75 13V11Z"
                fill="#344CFF"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.7247 2.02709L16.1585 2.43272C17.3143 2.62533 18.2506 2.78137 18.9831 2.99943C19.7459 3.22653 20.3761 3.54467 20.8613 4.11746C21.3465 4.69024 21.5568 5.36421 21.6554 6.15397C21.75 6.91231 21.75 7.86155 21.75 9.03325V14.9667C21.75 16.1384 21.75 17.0877 21.6554 17.846C21.5568 18.6358 21.3465 19.3097 20.8613 19.8825C20.3761 20.4553 19.7459 20.7734 18.9831 21.0005C18.2506 21.2186 17.3143 21.3746 16.1586 21.5672L13.7247 21.9729C12.6915 22.1451 11.8373 22.2875 11.155 22.304C10.4394 22.3213 9.77599 22.2063 9.22247 21.7374C8.75523 21.3416 8.52385 20.827 8.40256 20.25H7.94632C6.8135 20.25 5.88774 20.25 5.15689 20.1518C4.39294 20.0491 3.7306 19.8268 3.20191 19.2981C2.67321 18.7694 2.45093 18.1071 2.34822 17.3431C2.24996 16.6123 2.24998 15.6865 2.25 14.5537V9.4463C2.24998 8.31348 2.24996 7.38773 2.34822 6.65688C2.45093 5.89293 2.67321 5.23059 3.20191 4.7019C3.7306 4.1732 4.39294 3.95092 5.15689 3.84821C5.88775 3.74995 6.81348 3.74997 7.94631 3.74999L8.40256 3.74999C8.52384 3.17295 8.75523 2.65841 9.22247 2.2626C9.77599 1.7937 10.4394 1.67869 11.155 1.69597C11.8373 1.71246 12.6916 1.85487 13.7247 2.02709ZM8.25 17.3351C8.24999 17.8511 8.24997 18.3231 8.26143 18.75H8C6.80029 18.75 5.97595 18.7484 5.35676 18.6652C4.75914 18.5848 4.46611 18.441 4.26257 18.2374C4.05903 18.0339 3.91519 17.7409 3.83484 17.1432C3.7516 16.524 3.75 15.6997 3.75 14.5V9.49999C3.75 8.30028 3.7516 7.47594 3.83484 6.85675C3.91519 6.25913 4.05903 5.9661 4.26257 5.76256C4.46611 5.55902 4.75914 5.41518 5.35676 5.33483C5.97595 5.25159 6.80029 5.24999 8 5.24999H8.26143C8.24997 5.6769 8.24999 6.14889 8.25 6.6649V17.3351ZM11.1188 3.19554C10.5765 3.18243 10.3458 3.2769 10.192 3.40713C10.0383 3.53736 9.90719 3.7494 9.83097 4.28646C9.75179 4.84427 9.75 5.60296 9.75 6.72183V17.2781C9.75 18.397 9.75179 19.1557 9.83097 19.7135C9.90719 20.2506 10.0383 20.4626 10.192 20.5928C10.3458 20.7231 10.5765 20.8175 11.1188 20.8044C11.682 20.7908 12.4307 20.6679 13.5343 20.4839L15.8631 20.0958C17.0793 19.8931 17.9228 19.7511 18.5551 19.5629C19.1672 19.3806 19.4911 19.1794 19.7168 18.9129C19.9425 18.6465 20.0878 18.294 20.1669 17.6602C20.2486 17.0056 20.25 16.1502 20.25 14.9172V9.08275C20.25 7.84973 20.2486 6.99439 20.1669 6.33981C20.0878 5.706 19.9425 5.35347 19.7168 5.08702C19.4911 4.82057 19.1672 4.61933 18.5551 4.43707C17.9228 4.24885 17.0793 4.10688 15.8631 3.90418L13.5343 3.51604C12.4307 3.33211 11.682 3.20914 11.1188 3.19554Z"
                fill="#344CFF"
              />
            </svg>

            <span style={{ marginLeft: '8px' }}>Выход</span>
          </Button>
        </ButtonsContainer>
      </PageContainer>
    </MainLayout>
  );
};

export default SettingsPage;
