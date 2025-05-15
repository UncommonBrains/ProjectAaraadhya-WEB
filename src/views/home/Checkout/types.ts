export interface PaymentDetails {
  paymentMethod?: PaymentMethod;
  screenshot: File | null;
}

export enum PaymentMethod {
  BANK_TRANSFER = 'Bank Transfer',
  UPI = 'UPI',
}
