import { ReactNode } from 'react';

// Payment Gateway Types
export enum PaymentGateway {
  RAZORPAY = 'razorpay',
  STRIPE = 'stripe',
  PAYU = 'payu',
  CASHFREE = 'cashfree',
  // Add more gateways as needed
}

// Legacy payment methods (kept for backward compatibility)
export enum PaymentMethod {
  BANK_TRANSFER = 'Bank Transfer',
  UPI = 'UPI',
  // Gateway-specific methods
  RAZORPAY = 'razorpay',
  STRIPE = 'stripe',
  PAYU = 'payu',
  CASHFREE = 'cashfree',
}

// Payment Gateway Configuration Interface
export interface PaymentGatewayConfig {
  id: PaymentGateway;
  name: string;
  logo?: string;
  enabled: boolean;
  icon: ReactNode;
  description: string;
  supportedMethods: string[];
  config?: {
    keyId?: string;
    secretKey?: string;
    webhookSecret?: string;
    environment?: 'sandbox' | 'production';
    [key: string]: any;
  };
}

// Standardized Payment Response Interface
export interface PaymentResponse {
  success: boolean;
  paymentId: string;
  orderId: string;
  signature?: string;
  gateway: PaymentGateway;
  transactionId?: string;
  amount?: number;
  currency?: string;
  status?: 'pending' | 'completed' | 'failed' | 'cancelled';
  timestamp?: Date;
  metadata?: {
    [key: string]: any;
  };
}

// Gateway-specific response interfaces
export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface StripeResponse {
  id: string;
  object: string;
  amount: number;
  currency: string;
  status: string;
  payment_intent: string;
}

export interface PayUResponse {
  mihpayid: string;
  mode: string;
  status: string;
  txnid: string;
  amount: string;
  productinfo: string;
  hash: string;
}

export interface CashfreeResponse {
  cf_payment_id: string;
  order_id: string;
  order_amount: string;
  payment_status: string;
  payment_amount: string;
  payment_currency: string;
}

// Updated Payment Details Interface
export interface PaymentDetails {
  // Legacy fields (kept for backward compatibility)
  paymentMethod?: PaymentMethod;
  screenshot?: File | null;
  
  // New gateway-based fields
  gateway: PaymentGateway; // Made required
  paymentId?: string;
  orderId?: string;
  signature?: string;
  transactionId?: string;
  status?: 'pending' | 'completed' | 'failed' | 'cancelled';
  amount?: number;
  currency?: string;
  timestamp?: Date;
  
  // Gateway-specific data
  gatewayResponse?: RazorpayResponse | StripeResponse | PayUResponse | CashfreeResponse;
  
  // Additional metadata
  metadata?: {
    gatewayFee?: number;
    processingTime?: number;
    failureReason?: string;
    retryCount?: number;
    [key: string]: any;
  };
}

// Payment Order Creation Interface
export interface PaymentOrderRequest {
  amount: number;
  currency: string;
  receipt?: string;
  notes?: {
    [key: string]: string;
  };
  gateway: PaymentGateway;
}

export interface PaymentOrderResponse {
  id: string;
  entity: string;
  amount: number;
  currency: string;
  status: string;
  receipt?: string;
  notes?: {
    [key: string]: string;
  };
  created_at: number;
  gateway: PaymentGateway;
}

// Payment Gateway Settings Interface (for admin/config)
export interface PaymentGatewaySettings {
  gateway: PaymentGateway;
  enabled: boolean;
  priority: number; // For ordering in UI
  config: {
    keyId: string;
    secretKey: string;
    webhookSecret?: string;
    environment: 'sandbox' | 'production';
    supportedCurrencies: string[];
    minimumAmount?: number;
    maximumAmount?: number;
    processingFee?: {
      percentage?: number;
      fixed?: number;
    };
  };
  uiConfig: {
    displayName: string;
    description: string;
    icon?: string;
    color?: string;
    showInCheckout: boolean;
  };
}

// Payment Processing State Interface
export interface PaymentProcessingState {
  isLoading: boolean;
  selectedGateway: PaymentGateway;
  error?: string;
  orderData?: PaymentOrderResponse;
  paymentResponse?: PaymentResponse;
}

// Payment Verification Interface (for webhook handling)
export interface PaymentVerificationRequest {
  gateway: PaymentGateway;
  paymentId: string;
  orderId: string;
  signature?: string;
  amount: number;
  currency: string;
}

export interface PaymentVerificationResponse {
  verified: boolean;
  paymentStatus: 'success' | 'failed' | 'pending';
  transactionId?: string;
  failureReason?: string;
  gatewayResponse?: any;
}

// Webhook Event Interface
export interface PaymentWebhookEvent {
  id: string;
  gateway: PaymentGateway;
  event: string;
  payload: any;
  timestamp: Date;
  signature?: string;
  processed: boolean;
}

// Payment Analytics Interface
export interface PaymentAnalytics {
  gateway: PaymentGateway;
  totalTransactions: number;
  successfulTransactions: number;
  failedTransactions: number;
  totalAmount: number;
  averageAmount: number;
  successRate: number;
  averageProcessingTime: number;
  topFailureReasons: {
    reason: string;
    count: number;
  }[];
}

// Refund Interface
export interface RefundRequest {
  paymentId: string;
  amount?: number; // If not provided, full refund
  reason?: string;
  notes?: {
    [key: string]: string;
  };
}

export interface RefundResponse {
  id: string;
  paymentId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'processed' | 'failed';
  reason?: string;
  processedAt?: Date;
  gateway: PaymentGateway;
}

// Error Types
export enum PaymentErrorCode {
  GATEWAY_ERROR = 'GATEWAY_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS',
  CARD_DECLINED = 'CARD_DECLINED',
  AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED',
  ORDER_NOT_FOUND = 'ORDER_NOT_FOUND',
  DUPLICATE_REQUEST = 'DUPLICATE_REQUEST',
  AMOUNT_MISMATCH = 'AMOUNT_MISMATCH',
  CURRENCY_NOT_SUPPORTED = 'CURRENCY_NOT_SUPPORTED',
  GATEWAY_TIMEOUT = 'GATEWAY_TIMEOUT',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export interface PaymentError {
  code: PaymentErrorCode;
  message: string;
  gateway: PaymentGateway;
  details?: {
    [key: string]: any;
  };
  timestamp: Date;
  retryable: boolean;
}

// Type guards for gateway-specific responses
export const isRazorpayResponse = (response: any): response is RazorpayResponse => {
  return response && typeof response.razorpay_payment_id === 'string';
};

export const isStripeResponse = (response: any): response is StripeResponse => {
  return response && typeof response.id === 'string' && response.object === 'payment_intent';
};

export const isPayUResponse = (response: any): response is PayUResponse => {
  return response && typeof response.mihpayid === 'string';
};

export const isCashfreeResponse = (response: any): response is CashfreeResponse => {
  return response && typeof response.cf_payment_id === 'string';
};