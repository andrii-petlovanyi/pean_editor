export interface IDeleteResponse {
  message: string;
}

export interface IUpdateResponse {
  message: string;
  data?: any;
}

export interface User {
  nickname: string;
  password: string;
  token?: string;
}

export interface UserResponse {
  id: string;
  nickname: string;
  token: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
}

export interface ICreateResponse extends IUpdateResponse {}
