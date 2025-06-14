import { atom } from 'jotai';

export interface ErrorNotification {
  id: string;
  message: string;
}

export const errorNotificationsAtom = atom<ErrorNotification[]>([]);

// Helper functions to add and remove error notifications
export const addErrorNotification = (message: string): ErrorNotification => {
  const notification = {
    id: `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    message,
  };
  
  return notification;
};
