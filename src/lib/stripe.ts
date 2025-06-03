import { STRIPE_PRODUCTS } from '../stripe-config';
import { supabase } from './supabase';

export async function createCheckoutSession(priceId: string, mode: 'payment' | 'subscription') {
  try {
    const { data: { session_url } } = await supabase.functions.invoke('stripe-checkout', {
      body: {
        price_id: priceId,
        success_url: `${window.location.origin}/checkout/success`,
        cancel_url: `${window.location.origin}/checkout/cancel`,
        mode
      }
    });

    return session_url;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}

export async function getCurrentSubscription() {
  try {
    const { data: subscription, error } = await supabase
      .from('stripe_user_subscriptions')
      .select('*')
      .maybeSingle();

    if (error) throw error;

    return subscription;
  } catch (error) {
    console.error('Error fetching subscription:', error);
    throw error;
  }
}

export async function getOrderHistory() {
  try {
    const { data: orders, error } = await supabase
      .from('stripe_user_orders')
      .select('*')
      .order('order_date', { ascending: false });

    if (error) throw error;

    return orders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
}

export function getProductByPriceId(priceId: string) {
  return Object.values(STRIPE_PRODUCTS).find(product => product.priceId === priceId);
}