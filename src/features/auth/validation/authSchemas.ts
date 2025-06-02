import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Неверный формат email' }),
  password: z.string().min(1, { message: 'Пароль обязателен' }),
  // From Figma[cite: 1], login seems to be email and password.
});

export const registrationSchema = z.object({
  // Example fields, adjust based on the specific registration screen from Figma [cite: 1]
  fullName: z.string().min(2, { message: 'Имя должно содержать минимум 2 символа' }).optional(),
  email: z.string().email({ message: 'Неверный формат email' }),
  password: z.string().min(8, { message: 'Пароль должен содержать минимум 8 символов' }),
  confirmPassword: z.string(),
  phoneNumber: z.string().min(10, {message: "Номер телефона слишком короткий"}).optional(), // Example
}).refine(data => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ['confirmPassword'], // Path to the field to show the error on
});

export const requestPasswordRecoverySchema = z.object({
  // This is for the first step of password recovery from Figma [cite: 2]
  email: z.string().email({ message: 'Неверный формат email' }),
});

export const resetPasswordSchema = z.object({
  // This is for the step after code verification in password recovery from Figma [cite: 2]
  code: z.string().min(4, { message: 'Код подтверждения обязателен' }), // Assuming a code length
  newPassword: z.string().min(8, { message: 'Пароль должен содержать минимум 8 символов' }),
  confirmNewPassword: z.string(),
}).refine(data => data.newPassword === data.confirmNewPassword, {
  message: "Новые пароли не совпадают",
  path: ['confirmNewPassword'],
});

export const otpVerificationSchema = z.object({
    // For OTP screens in Figma [cite: 1]
    code: z.string().min(4, { message: 'Код должен содержать минимум 4 цифры' }).max(6, {message: "Код может содержать максимум 6 цифр"}),
});
