export interface RegisterState {
  name: string;
  email: string;
  password: string;
  isMember: boolean;
  isAlert: boolean;
}

export interface UsersType {
  name: string;
  email: string;
  lastName?: string;
  isMember?: boolean;
  location?: string;
  isAlert: boolean;
}

export interface AuthState {
  user: UsersType;
  token: string;
  location: string;
}

export interface TogglerTypes {
  sidebar: boolean;
}

export interface rootState {
  auth: AuthState;
  toggler: TogglerTypes;
}

export interface CustomError extends Error {
  data: {
    status: string;
    message: string;
  };
  error: {
    status: number;
    message: string;
  };
}
