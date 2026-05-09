import type { ComponentType } from "react";

export interface ISendOtp {
  email: string;
}

export interface IVerifyOtp {
  email: string;
  otp: string;
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
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

export interface ISidebarItems {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}

export interface ITourPackage {
  _id: string;
  title: string;
  slug: string;
  startDate: string;
  endDate: string;
  arrivalLocation: string;
  departureLocation: string;
  location: string;
  description: string;
  costFrom: number;
  maxGuest: number;
  minAge: number;
  division: string;
  tourType: string;
  amenities: string[];
  included: string[];
  excluded: string[];
  tourPlan: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER";
