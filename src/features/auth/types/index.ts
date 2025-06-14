export interface LoginFormData {
    email: string;
    password?: string; // Password might be optional if using social login or passwordless
  }
  

  export interface RegistrationFormData {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber?: string;
    acceptTerms: boolean;
    acceptMarketing: boolean;
  }
  
  export interface PasswordRecoveryFormData {
    email?: string; // On the first step
    code?: string; // On the second step for verification
    newPassword?: string;
    confirmNewPassword?: string;
  }
  
  // For OTP/code verification during registration/login
  export interface OtpVerificationFormData {
      code: string;
      email?: string; // Optional, if the email context is needed
  }
