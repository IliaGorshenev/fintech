import { addErrorNotification, errorNotificationsAtom } from '@/store/notifications';
import { useSetAtom } from 'jotai';

export const useErrorNotification = () => {
  const setErrorNotifications = useSetAtom(errorNotificationsAtom);

  const showError = (message: string) => {
    const notification = addErrorNotification(message);
    setErrorNotifications((prev) => [...prev, notification]);

    // Auto-remove after 5 seconds
    // eslint-disable-next-line no-undef
    setTimeout(() => {
      setErrorNotifications((prev) => prev.filter((n) => n.id !== notification.id));
    }, 5000);

    return notification.id;
  };

  const clearError = (id: string) => {
    setErrorNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAllErrors = () => {
    setErrorNotifications([]);
  };

  return { showError, clearError, clearAllErrors };
};
