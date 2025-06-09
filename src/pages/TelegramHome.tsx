import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useTelegram } from '@/features/telegram/TelegramProvider';
import { title } from '@/components/primitives';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  height: 100vh;
  background-color: var(--background);
  color: var(--foreground);
`;

const UserInfo = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 8px;
  background-color: var(--secondary);
  width: 100%;
  max-width: 400px;
`;

const Button = styled.button`
  background-color: var(--primary);
  color: var(--primary-foreground);
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  margin-top: 1rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const TelegramHome: React.FC = () => {
  const { webApp, user, isReady } = useTelegram();

  useEffect(() => {
    if (webApp && isReady) {
      // Configure the main button
      webApp.MainButton.setText('CONTINUE');
      webApp.MainButton.show();
      
      const handleMainButtonClick = () => {
        webApp.showAlert('You clicked the main button!');
      };
      
      webApp.MainButton.onClick(handleMainButtonClick);
      
      return () => {
        webApp.MainButton.offClick(handleMainButtonClick);
      };
    }
  }, [webApp, isReady]);

  const handleShowPopup = () => {
    if (webApp) {
      webApp.showPopup({
        title: 'Sample Popup',
        message: 'This is a sample popup in Telegram Web App',
        buttons: [
          { id: 'ok', text: 'OK' },
          { id: 'cancel', text: 'Cancel' }
        ]
      }, (buttonId) => {
        webApp.showAlert(`You clicked: ${buttonId}`);
      });
    }
  };

  const handleSendData = () => {
    if (webApp) {
      // Send data back to the bot
      const data = JSON.stringify({
        action: 'user_interaction',
        timestamp: Date.now()
      });
      webApp.sendData(data);
    }
  };

  return (
    <Container>
      <h1 className={title({ color: "blue", size: "lg" })}>
        Telegram Web App
      </h1>
      
      {user && (
        <UserInfo>
          <h3>User Information</h3>
          <p>ID: {user.id}</p>
          <p>Name: {user.first_name} {user.last_name || ''}</p>
          {user.username && <p>Username: @{user.username}</p>}
        </UserInfo>
      )}
      
      <Button onClick={handleShowPopup}>
        Show Popup
      </Button>
      
      <Button onClick={handleSendData}>
        Send Data to Bot
      </Button>
    </Container>
  );
};

export default TelegramHome;
