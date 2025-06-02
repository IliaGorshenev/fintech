export interface LoginFormData {
    email: string;
    password?: string; // Password might be optional if using social login or passwordless
  }
  
  export interface RegistrationFormData {
    // Based on Figma[cite: 1], typical fields are:
    fullName?: string; // Or separate First Name, Last Name
    email: string;
    password?: string;
    confirmPassword?: string;
    phoneNumber?: string; // Some mockups show phone
    // Add other fields as seen in the most complete registration form in Figma [cite: 1]
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
