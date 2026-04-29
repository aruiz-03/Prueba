export interface User {
  id: string;
  username: string;
  password: string;
}

export interface CurrentUser {
  id: string;
  username: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  password: string;
  confirmPassword: string;
}
