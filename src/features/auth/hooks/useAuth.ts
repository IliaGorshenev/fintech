import { LoginFormData, PasswordRecoveryFormData, RegistrationFormData } from '../types';

const apiDelay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fakeLoginUser = async (data: LoginFormData): Promise<{ success: boolean; message: string; token?: string }> => {
  await apiDelay(1000);
  console.log('Fake API Login Request:', data);
  if (data.email === 'test@example.com' && data.password === 'password123') {
    return { success: true, message: 'Login successful!', token: 'fake-jwt-token' };
  }
  if (data.email === 'error@example.com') {
    return { success: false, message: 'User not found or incorrect credentials.' };
  }
  return { success: false, message: 'Invalid email or password.' };
};

export const fakeRegisterUser = async (data: RegistrationFormData): Promise<{ success: boolean; message: string }> => {
  await apiDelay(1500);
  console.log('Fake API Registration Request:', data);
  if (data.email === 'exists@example.com') {
    return { success: false, message: 'This email is already registered.' };
  }
  // Add more validation checks if needed from Figma (e.g. password complexity)
  if (data.password !== data.confirmPassword) {
    // This should ideally be caught by client-side validation first
    return { success: false, message: 'Passwords do not match.' };
  }
  return { success: true, message: 'Registration successful! Please check your email to verify.' };
};

// Based on the Figma screens[cite: 1], registration might involve:
// 1. Email, Password, Confirm Password
// 2. Possibly a step for entering a code sent to email (this would be a separate form/API call)
// For now, this function simulates the initial registration.

export const fakeRequestPasswordRecovery = async (data: { email: string }): Promise<{ success: boolean; message: string }> => {
  await apiDelay(1000);
  console.log('Fake API Password Recovery Request:', data);
  if (data.email === 'notfound@example.com') {
    return { success: false, message: 'Email not found.' };
  }
  // The Figma [cite: 2] suggests a flow: enter email -> get code -> enter code + new password.
  // This function simulates the first step: requesting the code.
  return { success: true, message: 'If an account with this email exists, a recovery link/code has been sent.' };
};

export const fakeResetPasswordWithCode = async (data: PasswordRecoveryFormData): Promise<{ success: boolean; message: string }> => {
  await apiDelay(1000);
  console.log('Fake API Reset Password with Code Request:', data);
  if (data.code !== '123456') {
    // Example code
    return { success: false, message: 'Invalid or expired recovery code.' };
  }
  if (data.newPassword !== data.confirmNewPassword) {
    return { success: false, message: 'New passwords do not match.' };
  }
  // The Figma [cite: 2] shows screens for entering a code and new passwords.
  return { success: true, message: 'Password has been reset successfully!' };
};

// Add fake API for OTP/Code verification if needed from Figma [cite: 1]
export const fakeVerifyOtp = async (data: { email?: string; code: string }): Promise<{ success: boolean; message: string }> => {
  await apiDelay(1000);
  console.log('Fake API OTP Verification Request:', data);
  if (data.code === '5555' || data.code === '1655' || data.code === '5530' || data.code === '3159') {
    // Example codes from Figma [cite: 1]
    return { success: true, message: 'Account verified successfully!' };
  }
  return { success: false, message: 'Invalid or expired verification code.' };
};
