import axios from 'axios';

// Payment gateway configurations
const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const FLUTTERWAVE_PUBLIC_KEY = import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY;

export const paymentService = {
  // Initialize Paystack payment
  async initPaystackPayment(amount: number, email: string, plan: string) {
    try {
      const response = await axios.post('/api/payments/paystack/initialize', {
        amount,
        email,
        plan,
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to initialize Paystack payment');
    }
  },

  // Verify Paystack payment
  async verifyPaystackPayment(reference: string) {
    try {
      const response = await axios.get(`/api/payments/paystack/verify/${reference}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to verify Paystack payment');
    }
  },

  // Initialize Stripe payment
  async initStripePayment(amount: number, email: string, plan: string) {
    try {
      const response = await axios.post('/api/payments/stripe/create-session', {
        amount,
        email,
        plan,
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to initialize Stripe payment');
    }
  },

  // Initialize Flutterwave payment
  async initFlutterwavePayment(amount: number, email: string, plan: string) {
    try {
      const response = await axios.post('/api/payments/flutterwave/initialize', {
        amount,
        email,
        plan,
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to initialize Flutterwave payment');
    }
  },

  // Get payment history
  async getPaymentHistory(userId: string) {
    try {
      const response = await axios.get(`/api/payments/history/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch payment history');
    }
  },

  // Get subscription details
  async getSubscriptionDetails(userId: string) {
    try {
      const response = await axios.get(`/api/subscriptions/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch subscription details');
    }
  },
};