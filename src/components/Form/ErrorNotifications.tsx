import { FormErrorMessage } from '@/components/Form/ErrorMessage';
import { errorNotificationsAtom } from '@/store/notifications';
import { useAtom } from 'jotai';
import React from 'react';
import styled from 'styled-components';

const NotificationsContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  width: 100%;
`;

export const ErrorNotifications: React.FC = () => {
  const [notifications, setNotifications] = useAtom(errorNotificationsAtom);

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  if (notifications.length === 0) return null;

  return (
    <NotificationsContainer>
      {notifications.map((notification) => (
        <FormErrorMessage key={notification.id} message={notification.message} duration={5000} onClose={() => removeNotification(notification.id)} />
      ))}
    </NotificationsContainer>
  );
};
