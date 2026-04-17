export interface ISendOtp {
  email: string;
}

export interface IVerifyOtp {
  email: string;
  otp: string
}

export interface IRegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface IRegisterResponse {
  name: string;
  email: string;
  password: string;
  isDeleted: boolean;
  isActive: string;
  isVerified: boolean;
  role: string;
  auths: Auth[];
  _id: string;
  createdAt: string;
  updatedAt: string;
}
export interface Auth {
  provider: string;
  providerId: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IResponse<T> {
  success: boolean;
  StatusCode: number;
  message: string;
  data: T;
}
