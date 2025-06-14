import { LoginFormData, PasswordRecoveryFormData, RegistrationFormData } from '../types';

const apiDelay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fakeLoginUser = async (data: LoginFormData): Promise<{ success: boolean; message: string; token?: string }> => {
  await apiDelay(1000);
  console.log('Запрос на вход:', data);
  if (data.email === 'test@example.com' && data.password === 'password123') {
    return { success: true, message: 'Вход выполнен успешно!', token: 'fake-jwt-token' };
  }
  if (data.email === 'error@example.com') {
    return { success: false, message: 'Пользователь не найден или неверные учетные данные.' };
  }
  return { success: false, message: 'Неверный email или пароль.' };
};

export const fakeRegisterUser = async (data: RegistrationFormData): Promise<{ success: boolean; message: string }> => {
  await apiDelay(100);
  console.log('Запрос на регистрацию:', data);

  // Check if email already exists
  if (data.email === 'exists@example.com') {
    return { success: false, message: 'Этот email уже зарегистрирован.' };
  }

  // Check if terms are accepted
  if (!data.acceptTerms) {
    return { success: false, message: 'Необходимо принять условия и положения.' };
  }

  // Simulate successful registration
  if (data.fullName && data.email) {
    return {
      success: true,
      message: 'Регистрация успешна! Пожалуйста, проверьте свою электронную почту для получения кода подтверждения.',
    };
  }

  // If we reach here, something is wrong with the data
  return { success: false, message: 'Неверные данные регистрации. Пожалуйста, проверьте введенную информацию.' };
};

export const fakeCompleteRegistration = async (data: any): Promise<{ success: boolean; message?: string }> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate successful registration
      console.log('Регистрация завершена с данными:', data);
      resolve({
        success: true,
        message: 'Регистрация успешно завершена',
      });
    }, 1000);
  });
};

// Based on the Figma screens[cite: 1], registration might involve:
// 1. Email, Password, Confirm Password
// 2. Possibly a step for entering a code sent to email (this would be a separate form/API call)
// For now, this function simulates the initial registration.

export const fakeRequestPasswordRecovery = async (data: { email: string }): Promise<{ success: boolean; message: string }> => {
  await apiDelay(1000);
  console.log('Запрос на восстановление пароля:', data);
  if (data.email === 'notfound@example.com') {
    return { success: false, message: 'Email не найден.' };
  }
  // The Figma [cite: 2] suggests a flow: enter email -> get code -> enter code + new password.
  // This function simulates the first step: requesting the code.
  return { success: true, message: 'Если аккаунт с этим email существует, ссылка/код для восстановления был отправлен.' };
};

export const fakeResetPasswordWithCode = async (data: PasswordRecoveryFormData): Promise<{ success: boolean; message: string }> => {
  await apiDelay(1000);
  console.log('Запрос на сброс пароля с кодом:', data);
  if (data.code !== '123456') {
    // Example code
    return { success: false, message: 'Неверный или просроченный код восстановления.' };
  }
  if (data.newPassword !== data.confirmNewPassword) {
    return { success: false, message: 'Новые пароли не совпадают.' };
  }
  // The Figma [cite: 2] shows screens for entering a code and new passwords.
  return { success: true, message: 'Пароль успешно сброшен!' };
};

// Add fake API for OTP/Code verification if needed from Figma [cite: 1]
export const fakeVerifyOtp = async (data: { email?: string; code: string }): Promise<{ success: boolean; message: string }> => {
  await apiDelay(1000);
  console.log('Запрос на проверку OTP:', data);
  if (data.code === '5555' || data.code === '1234' || data.code === '5530' || data.code === '3159') {
    // Example codes from Figma [cite: 1]
    return { success: true, message: 'Аккаунт успешно подтвержден!' };
  }
  return { success: false, message: 'Неверный или просроченный код подтверждения.' };
};
