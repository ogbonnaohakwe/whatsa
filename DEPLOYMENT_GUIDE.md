# Complete Deployment Guide

## Overview

This guide will help you deploy the WhatsApp Autoresponder with real WhatsApp Business API integration.

## Prerequisites

1. **Supabase Account**: For database and authentication
2. **Meta Developer Account**: For WhatsApp Business API
3. **Coolify Instance**: Your deployment platform
4. **Domain**: For webhook endpoints

## Step 1: Set Up WhatsApp Business API

Follow the detailed guide in `WHATSAPP_BUSINESS_API_SETUP.md` to:

1. Create a Meta app
2. Add WhatsApp product
3. Get your credentials:
   - Access Token
   - Phone Number ID
   - Webhook Verify Token

## Step 2: Set Up Supabase Database

1. **Create Supabase Project**:
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note your project URL and anon key

2. **Run Database Migrations**:
   - In your Supabase dashboard, go to SQL Editor
   - Run each migration file in order:
     - `supabase/migrations/20250601112034_divine_coast.sql`
     - `supabase/migrations/20250602093607_odd_lab.sql`
     - `supabase/migrations/20250602095325_holy_tree.sql`
     - `supabase/migrations/20250602095928_foggy_crystal.sql`
     - `supabase/migrations/20250603163622_floating_wave.sql`

## Step 3: Deploy Backend to Coolify

1. **Create New Service**:
   - In Coolify, create a new Node.js service
   - Set source to your `backend/` folder
   - Set build command: `npm install`
   - Set start command: `npm start`

2. **Environment Variables**:
   ```bash
   PORT=3001
   NODE_ENV=production
   FRONTEND_URL=http://bkcog0cs4w4g8og4880gg800.67.205.133.254.sslip.io
   
   # Supabase
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   
   # WhatsApp Business API
   WHATSAPP_ACCESS_TOKEN=your_whatsapp_access_token
   WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
   WHATSAPP_WEBHOOK_VERIFY_TOKEN=your_webhook_verify_token
   ```

3. **Deploy Backend**:
   - Deploy the backend service
   - Note the backend URL (e.g., `http://backend.your-domain.com`)

## Step 4: Update Frontend Environment

1. **Update Frontend Environment Variables**:
   ```bash
   # Supabase
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Backend API
   VITE_API_URL=http://your-backend-url:3001
   VITE_WEBSOCKET_URL=http://your-backend-url:3001
   
   # WhatsApp Business API (Frontend)
   VITE_WHATSAPP_ACCESS_TOKEN=your_whatsapp_access_token
   VITE_WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
   VITE_WHATSAPP_WEBHOOK_VERIFY_TOKEN=your_webhook_verify_token
   ```

2. **Redeploy Frontend**:
   - Update environment variables in Coolify
   - Redeploy the frontend service

## Step 5: Configure WhatsApp Webhook

1. **Set Webhook URL**:
   - In Meta Developer Console, go to WhatsApp > Configuration
   - Set webhook URL to: `http://your-backend-url:3001/webhook/whatsapp`
   - Set verify token to your `WHATSAPP_WEBHOOK_VERIFY_TOKEN`

2. **Subscribe to Events**:
   - Subscribe to: `messages`, `message_deliveries`, `message_reads`

## Step 6: Test the Integration

1. **Health Check**:
   - Visit: `http://your-backend-url:3001/api/health`
   - Should show: `whatsappConfigured: true`

2. **Send Test Message**:
   - Use the frontend to send a test message
   - Check backend logs for API calls

3. **Test Webhooks**:
   - Send a message TO your WhatsApp Business number
   - Check backend logs for incoming webhooks
   - Verify auto-responses work

## Step 7: Production Checklist

### Security
- [ ] All environment variables are set correctly
- [ ] Webhook verify token is secure
- [ ] Access tokens are not exposed in frontend
- [ ] HTTPS is enabled for webhooks

### Functionality
- [ ] Can send text messages
- [ ] Can receive incoming messages
- [ ] Auto-responses work
- [ ] Real-time updates via WebSocket
- [ ] Message status updates work
- [ ] Database operations work

### Performance
- [ ] Backend responds quickly
- [ ] WebSocket connections are stable
- [ ] Database queries are optimized
- [ ] Rate limiting is in place

## Troubleshooting

### Common Issues

1. **Webhook Verification Fails**:
   ```bash
   # Check backend logs for verification attempts
   # Ensure verify token matches exactly
   # Verify webhook URL is accessible
   ```

2. **Messages Not Sending**:
   ```bash
   # Check access token validity
   # Verify phone number format
   # Check API rate limits
   ```

3. **Database Connection Issues**:
   ```bash
   # Verify Supabase URL and keys
   # Check RLS policies
   # Ensure migrations ran successfully
   ```

4. **WebSocket Not Connecting**:
   ```bash
   # Check CORS settings
   # Verify WebSocket URL
   # Check firewall settings
   ```

### Debug Commands

```bash
# Check backend health
curl http://your-backend-url:3001/api/health

# Test WhatsApp API directly
curl -X POST "https://graph.facebook.com/v18.0/YOUR_PHONE_NUMBER_ID/messages" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "messaging_product": "whatsapp",
    "to": "RECIPIENT_PHONE_NUMBER",
    "type": "text",
    "text": {"body": "Test message"}
  }'

# Check webhook endpoint
curl -X GET "http://your-backend-url:3001/webhook/whatsapp?hub.mode=subscribe&hub.verify_token=YOUR_VERIFY_TOKEN&hub.challenge=test"
```

## Monitoring

Set up monitoring for:

1. **API Response Times**
2. **Message Delivery Rates**
3. **Webhook Success Rates**
4. **Database Performance**
5. **WebSocket Connection Health**

## Scaling Considerations

As your application grows:

1. **Database**: Consider read replicas for heavy read workloads
2. **Backend**: Implement horizontal scaling with load balancers
3. **WebSocket**: Use Redis for session management across instances
4. **WhatsApp API**: Monitor rate limits and implement queuing

## Support

If you encounter issues:

1. Check the logs in Coolify dashboard
2. Review WhatsApp Business API documentation
3. Test individual components separately
4. Verify all environment variables are correct

Your WhatsApp Autoresponder is now ready for production use! 🚀