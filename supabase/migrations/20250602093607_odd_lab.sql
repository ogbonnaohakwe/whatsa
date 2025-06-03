-- Add Paystack-specific fields to user_subscriptions table
ALTER TABLE user_subscriptions
ADD COLUMN paystack_customer_code text,
ADD COLUMN paystack_authorization_code text,
ADD COLUMN paystack_card_last4 text,
ADD COLUMN paystack_card_brand text,
ADD COLUMN paystack_card_exp_month integer,
ADD COLUMN paystack_card_exp_year integer;

-- Create payment_transactions table for tracking all payment attempts
CREATE TABLE payment_transactions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  subscription_id uuid REFERENCES user_subscriptions(id),
  amount numeric NOT NULL,
  currency text NOT NULL DEFAULT 'NGN',
  paystack_reference text UNIQUE,
  status text NOT NULL,
  payment_method text NOT NULL,
  metadata jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Add indexes for better query performance
CREATE INDEX idx_payment_transactions_user_id ON payment_transactions(user_id);
CREATE INDEX idx_payment_transactions_subscription_id ON payment_transactions(subscription_id);
CREATE INDEX idx_payment_transactions_status ON payment_transactions(status);
CREATE INDEX idx_payment_transactions_created_at ON payment_transactions(created_at);

-- Add RLS policies for payment_transactions
ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own payment transactions"
  ON payment_transactions
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own payment transactions"
  ON payment_transactions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_payment_transactions_updated_at
    BEFORE UPDATE ON payment_transactions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add webhook_events table for tracking Paystack webhooks
CREATE TABLE webhook_events (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider text NOT NULL,
  event_type text NOT NULL,
  payload jsonb NOT NULL,
  processed boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now()
);

-- Add index for webhook processing
CREATE INDEX idx_webhook_events_processed ON webhook_events(processed);