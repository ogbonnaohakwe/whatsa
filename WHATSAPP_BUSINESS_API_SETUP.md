# WhatsApp Business API Setup Guide

## Prerequisites

1. **Facebook Business Account**: You need a Facebook Business account
2. **WhatsApp Business Account**: A verified WhatsApp Business account
3. **Meta Developer Account**: Access to Meta for Developers

## Step 1: Create a Meta App

1. Go to [Meta for Developers](https://developers.facebook.com/)
2. Click "Create App"
3. Select "Business" as the app type
4. Fill in your app details:
   - App Name: "WhatsApp Autoresponder"
   - Contact Email: Your business email
   - Business Account: Select your business account

## Step 2: Add WhatsApp Product

1. In your app dashboard, click "Add Product"
2. Find "WhatsApp" and click "Set up"
3. This will add WhatsApp Business API to your app

## Step 3: Configure WhatsApp Business API

### Get Your Credentials

1. **Access Token**: 
   - Go to WhatsApp > API Setup
   - Copy the temporary access token (valid for 24 hours)
   - For production, you'll need to generate a permanent token

2. **Phone Number ID**:
   - In the API Setup, you'll see a test phone number
   - Copy the Phone Number ID (not the phone number itself)

3. **Webhook Verify Token**:
   - Create a secure random string (e.g., `whatsapp_webhook_verify_2024`)
   - You'll use this to verify webhook requests

### Set Up Webhook

1. In WhatsApp > Configuration, click "Edit" next to Webhook
2. Set the Webhook URL to: `https://your-backend-domain.com/webhook/whatsapp`
3. Set the Verify Token to your chosen verify token
4. Subscribe to these webhook fields:
   - `messages`
   - `message_deliveries`
   - `message_reads`
   - `message_echoes`

## Step 4: Environment Variables

### Backend (.env)
```bash
# WhatsApp Business API Configuration
WHATSAPP_ACCESS_TOKEN=your_temporary_access_token_here
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id_here
WHATSAPP_WEBHOOK_VERIFY_TOKEN=whatsapp_webhook_verify_2024

# Other configurations...
PORT=3001
FRONTEND_URL=http://bkcog0cs4w4g8og4880gg800.67.205.133.254.sslip.io
```

### Frontend (.env)
```bash
# WhatsApp Business API Configuration (Frontend)
VITE_WHATSAPP_ACCESS_TOKEN=your_temporary_access_token_here
VITE_WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id_here
VITE_WHATSAPP_WEBHOOK_VERIFY_TOKEN=whatsapp_webhook_verify_2024

# Other configurations...
VITE_API_URL=http://bkcog0cs4w4g8og4880gg800.67.205.133.254.sslip.io:3001
```

## Step 5: Test the Integration

### Test Sending Messages

1. Use the Graph API Explorer or your app to send a test message
2. Send to a phone number that has opted in to receive messages
3. Check the API response for success

### Test Webhooks

1. Send a message TO your WhatsApp Business number
2. Check your backend logs for incoming webhook data
3. Verify auto-responses are working

## Step 6: Production Setup

### Generate Permanent Access Token

1. Go to WhatsApp > API Setup
2. Click "Generate Access Token"
3. Follow the steps to create a permanent token
4. Update your environment variables

### Verify Your Business

1. Complete business verification in Meta Business Manager
2. This is required for production use
3. Submit required business documents

### Phone Number Verification

1. Verify your business phone number
2. This may require additional documentation
3. Once verified, you can send messages to any number

## Step 7: Message Templates

For marketing messages, you need approved templates:

1. Go to WhatsApp > Message Templates
2. Create templates for:
   - Welcome messages
   - Order confirmations
   - Appointment reminders
   - Marketing campaigns

3. Submit for approval (usually takes 24-48 hours)

## API Limits

### Development
- 1,000 messages per day
- 50 messages per hour to unique recipients

### Production
- 1,000 messages per day initially
- Increases based on phone number quality rating
- Can scale to millions of messages per day

## Testing Checklist

- [ ] Can send text messages
- [ ] Can receive webhook notifications
- [ ] Auto-responses work correctly
- [ ] Message status updates are received
- [ ] Error handling works properly
- [ ] Rate limiting is respected

## Common Issues

### 1. Webhook Verification Fails
- Check that your verify token matches exactly
- Ensure your webhook URL is accessible
- Verify HTTPS is working properly

### 2. Messages Not Sending
- Check access token is valid
- Verify phone number format (include country code)
- Ensure recipient has opted in

### 3. Not Receiving Webhooks
- Check webhook URL is correct
- Verify webhook subscriptions are active
- Check server logs for incoming requests

## Security Best Practices

1. **Secure Your Tokens**:
   - Never commit tokens to version control
   - Use environment variables
   - Rotate tokens regularly

2. **Validate Webhooks**:
   - Always verify webhook signatures
   - Check the verify token
   - Validate incoming data

3. **Rate Limiting**:
   - Implement proper rate limiting
   - Handle API errors gracefully
   - Queue messages if needed

## Next Steps

Once your WhatsApp Business API is set up:

1. Deploy your backend with the correct environment variables
2. Test the integration thoroughly
3. Set up monitoring and logging
4. Create message templates for your use cases
5. Implement proper error handling and retry logic

## Support Resources

- [WhatsApp Business API Documentation](https://developers.facebook.com/docs/whatsapp)
- [Graph API Reference](https://developers.facebook.com/docs/graph-api)
- [WhatsApp Business API Postman Collection](https://www.postman.com/meta/workspace/whatsapp-business-platform)