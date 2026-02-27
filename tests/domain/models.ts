export interface User {
  email: string;
  password: string;
  securityQuestion?: string;
  securityAnswer?: string;
}

export interface Product {
  name: string;
  quantity: number;
}

export interface Address {
  country: string;
  name: string;
  mobileNumber: string;
  zipCode: string;
  addressLine: string;
  city: string;
  state: string;
}

export interface PaymentCard {
  name: string;
  number: string;
  cvc: string;
  expiryMonthIndex: number;
  expiryYearIndex: number;
}

