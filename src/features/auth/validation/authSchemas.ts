import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Неверный формат email' }),
  password: z.string().min(1, { message: 'Пароль обязателен' }),
});

const baseRegistrationSchema = z.object({
  fullName: z.string().min(1, 'Имя обязательно'),
  email: z.string().email('Неверный формат email'),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'Вы должны принять условия пользовательского соглашения',
  }),
  acceptMarketing: z.boolean(),
  otpCode: z.string().min(4, 'Код должен содержать минимум 4 символа').max(6, 'Код может содержать максимум 6 символов'),
  password: z.string().min(8, 'Пароль должен содержать минимум 8 символов'),
  confirmPassword: z.string(),
});

export const fullRegistrationSchema = baseRegistrationSchema.refine((data) => data.password === data.confirmPassword, {
  message: 'Пароли не совпадают',
  path: ['confirmPassword'],
});

export const initialRegistrationSchema = baseRegistrationSchema.pick({
  fullName: true,
  email: true,
  acceptTerms: true,
  acceptMarketing: true,
});

export const otpVerificationSchema = baseRegistrationSchema.pick({
  otpCode: true,
});

export const completeRegistrationSchema = baseRegistrationSchema.pick({
  password: true,
  confirmPassword: true,
});

export type FullRegistrationData = z.infer<typeof fullRegistrationSchema>;

export const requestPasswordRecoverySchema = z.object({
  email: z.string().email({ message: 'Неверный формат email' }),
});

export const resetPasswordSchema = z
  .object({
    code: z.string().min(4, { message: 'Код подтверждения обязателен' }),
    newPassword: z.string().min(8, { message: 'Пароль должен содержать минимум 8 символов' }),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Новые пароли не совпадают',
    path: ['confirmNewPassword'],
  });
