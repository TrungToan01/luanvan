export interface Email {
  email: string;
}

export interface loginForm {
  email: string;
  phone: string;
  password: string;
}

export interface RegisterForm {
  full_name: string;
  email: string;
  phone: string;
  password: string;
}

export interface ConfirmEmailToken {
  email: string;
  token: string;
}

export interface ConfirmResetPassword {
  token: string;
  new_password: string;
  verify_password: string;
}

export interface ChangePassword {
  email?: string;
  old_password: string;
  new_password: string;
  verify_password: string;
}
export interface ForgotPassword {
  email: string;
  otp?: string;
  new_password?: string;
}

export interface Logout {
  email: string;
}

export interface SetRolesRequest {
  role: string;
  user_id: number;
}
