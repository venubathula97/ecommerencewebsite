// Mock Stripe service for handling payments
// In a real application, this would communicate with a backend
// that would interact with the Stripe API

interface PaymentIntent {
  id: string;
  amount: number;
  status: 'succeeded' | 'processing' | 'requires_payment_method' | 'requires_confirmation';
}

interface CheckoutSession {
  id: string;
  url: string;
}

export const createPaymentIntent = async (amount: number): Promise<PaymentIntent> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: `pi_${Math.random().toString(36).substring(2, 15)}`,
        amount,
        status: 'requires_payment_method',
      });
    }, 500);
  });
};

export const processPayment = async (paymentMethodId: string, amount: number): Promise<PaymentIntent> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: `pi_${Math.random().toString(36).substring(2, 15)}`,
        amount,
        status: 'succeeded',
      });
    }, 1000);
  });
};

export const createCheckoutSession = async (items: { id: number; quantity: number }[]): Promise<CheckoutSession> => {
  // Simulate creating a checkout session
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real application, this would redirect to Stripe Checkout
      // For this mock, we'll just simulate the redirect with a fake URL
      resolve({
        id: `cs_${Math.random().toString(36).substring(2, 15)}`,
        url: `/checkout/success?session_id=cs_${Math.random().toString(36).substring(2, 15)}`,
      });
    }, 800);
  });
};

export const validatePaymentMethod = (
  cardNumber: string,
  expiryDate: string,
  cvc: string
): { valid: boolean; error?: string } => {
  // Basic validation
  if (!cardNumber || cardNumber.length < 15) {
    return { valid: false, error: 'Invalid card number' };
  }
  
  if (!expiryDate || !expiryDate.includes('/')) {
    return { valid: false, error: 'Invalid expiry date' };
  }
  
  if (!cvc || cvc.length < 3) {
    return { valid: false, error: 'Invalid CVC' };
  }
  
  return { valid: true };
};