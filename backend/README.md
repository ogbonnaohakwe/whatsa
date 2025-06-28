# WhatsApp Autoresponder Backend

This is the backend API server for the WhatsApp Autoresponder application.

## Features

- RESTful API endpoints
- Real-time WebSocket communication
- WhatsApp Business API integration
- Auto-response processing
- Rate limiting and security

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Update the `.env` file with your configuration

4. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Health Check
- `GET /api/health` - Server health status

### WhatsApp
- `POST /api/whatsapp/send` - Send WhatsApp message
- `GET /api/whatsapp/status/:messageId` - Get message status
- `POST /webhook/whatsapp` - WhatsApp webhook endpoint

### Auto-Response
- `POST /api/auto-response/process` - Process auto-response

## WebSocket Events

### Client to Server
- `authenticate` - Authenticate user
- `send_message` - Send a message

### Server to Client
- `message_received` - New message received
- `message_status` - Message status update
- `message_error` - Message sending error

## Deployment

This server can be deployed to:
- Heroku
- Railway
- DigitalOcean App Platform
- AWS EC2
- Your Coolify instance

Make sure to set the environment variables in your deployment platform.