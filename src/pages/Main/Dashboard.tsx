import { AvatarIcon, ChangeArrowsIcon, InvoiceIcon, MoneyIcon, OperationsIcon, TelegramIcon } from '@/icons/icons';
import MainLayout from '@/layouts/MainLayout';

import { motion } from 'framer-motion';
import React, { useState } from 'react';
// At the top of your Dashboard.tsx file

import { getCurrencyColor, getCurrencyIcon } from '@/utils/getCurrencyIcon';
import { currencyData, CurrencyTicker } from './consts';
import {
  ActionButton,
  ActionButtonsContainer,
  ActionIcon,
  ActionLabel,
  Avatar,
  BalanceAmount,
  BalanceInfo,
  BalanceLabel,
  BalanceSection,
  CurrencyDetails,
  CurrencyHeader,
  CurrencyInfo,
  CurrencyItem,
  CurrencyName,
  CurrencySection,
  CurrencyStyledTicker,
  DashboardContainer,
  Header,
  HeaderLabel,
  IconWrapper,
  NavButton,
  RateValue,
  SectionTitle,
  SendButton,
  TopSection,
  UserDetails,
  UserHandle,
  UserInfo,
  UserName,
} from './styles.module';

// Mock data for currency rates

const Dashboard: React.FC = () => {
  const [currentBalanceIndex, setCurrentBalanceIndex] = useState(0);
  const balances = ['250 000 ₽', '1 250 €', '2 500 $'];

  const nextBalance = () => {
    setCurrentBalanceIndex((currentBalanceIndex + 1) % balances.length);
  };

  const prevBalance = () => {
    setCurrentBalanceIndex((currentBalanceIndex - 1 + balances.length) % balances.length);
  };

  return (
    <MainLayout>
      <DashboardContainer>
        <TopSection>
          <Header>
            <UserInfo>
              <Avatar>
                <AvatarIcon></AvatarIcon>
              </Avatar>
              <UserDetails>
                <UserName>Александр</UserName>
                <UserHandle>@aplanov</UserHandle>
              </UserDetails>
            </UserInfo>
            <SendButton>
              <TelegramIcon></TelegramIcon>
            </SendButton>
          </Header>

          <BalanceSection>
            <NavButton onClick={prevBalance}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </NavButton>

            <BalanceInfo>
              <BalanceLabel>Баланс</BalanceLabel>
              <motion.div
                key={currentBalanceIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}>
                <BalanceAmount>{balances[currentBalanceIndex]}</BalanceAmount>
              </motion.div>
            </BalanceInfo>

            <NavButton onClick={nextBalance}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </NavButton>
          </BalanceSection>

          <ActionButtonsContainer>
            <ActionButton>
              <ActionIcon>
                <ChangeArrowsIcon></ChangeArrowsIcon>
              </ActionIcon>
              <ActionLabel>Обмен</ActionLabel>
            </ActionButton>

            <ActionButton>
              <ActionIcon>
                <MoneyIcon></MoneyIcon>
              </ActionIcon>
              <ActionLabel>Перестановка</ActionLabel>
            </ActionButton>
            <ActionButton>
              <ActionIcon>
                <InvoiceIcon></InvoiceIcon>
              </ActionIcon>
              <ActionLabel>Инвойс</ActionLabel>
            </ActionButton>
            <ActionButton>
              <ActionIcon>
                <OperationsIcon></OperationsIcon>
              </ActionIcon>
              <ActionLabel>Мои заявки</ActionLabel>
            </ActionButton>
          </ActionButtonsContainer>
        </TopSection>

        <CurrencySection>
          <SectionTitle>Текущие курсы в кассах</SectionTitle>

          <CurrencyHeader>
            <HeaderLabel>Валюта</HeaderLabel>
            <HeaderLabel>Покупка</HeaderLabel>
            <HeaderLabel>Продажа</HeaderLabel>
          </CurrencyHeader>

          {currencyData.map((currency, index) => {
            const color = getCurrencyColor(currency.ticker as CurrencyTicker);
            const { icon } = getCurrencyIcon(currency.ticker as CurrencyTicker);
            const tickerColor = `var(--${currency.ticker.toLowerCase()}-ticker-color)`;
            const fgColor = `var(--${currency.ticker.toLowerCase()}-fg-color)`;
            const borderColor = currency.ticker === 'USDW' ? 'var(--foreground)' : 'transparent';
            return (
              <CurrencyItem key={index}>
                <CurrencyInfo>
                <IconWrapper bg={color} border={borderColor}>{icon}</IconWrapper>
                  <CurrencyDetails>
                    <CurrencyName>{currency.name}</CurrencyName>
                    <CurrencyStyledTicker bg={tickerColor} color={fgColor}>
                      {currency.ticker}
                    </CurrencyStyledTicker>
                  </CurrencyDetails>
                </CurrencyInfo>
                <RateValue>{currency.buy}</RateValue>
                <RateValue>{currency.sell}</RateValue>
              </CurrencyItem>
            );
          })}
        </CurrencySection>
      </DashboardContainer>
    </MainLayout>
  );
};

export default Dashboard;
