# Backend API Requirements

## Core Endpoints Needed

### Authentication
- POST /api/auth/login
- POST /api/auth/register
- POST /api/auth/logout
- GET /api/auth/me

### WhatsApp Integration
- POST /api/whatsapp/initialize
- POST /api/whatsapp/send
- GET /api/whatsapp/status/:messageId
- POST /api/whatsapp/webhook
- GET /api/whatsapp/qr-code

### Contacts Management
- GET /api/contacts
- POST /api/contacts
- PUT /api/contacts/:id
- DELETE /api/contacts/:id
- POST /api/contacts/import

### Campaigns
- GET /api/campaigns
- POST /api/campaigns
- PUT /api/campaigns/:id
- DELETE /api/campaigns/:id
- POST /api/campaigns/:id/send

### Auto Responses
- GET /api/auto-responses
- POST /api/auto-responses
- PUT /api/auto-responses/:id
- DELETE /api/auto-responses/:id

### Lead Pages
- GET /api/lead-pages
- POST /api/lead-pages
- PUT /api/lead-pages/:id
- DELETE /api/lead-pages/:id
- POST /api/lead-pages/:id/submit

### Analytics
- GET /api/analytics/dashboard
- GET /api/analytics/messages
- GET /api/analytics/campaigns

## Technology Stack Recommendations

### Option 1: Node.js + Express
- Express.js for API routes
- Socket.io for real-time messaging
- WhatsApp Business API integration
- Supabase as database

### Option 2: Python + FastAPI
- FastAPI for high-performance API
- WebSockets for real-time features
- WhatsApp Business API integration
- Supabase as database

### Option 3: Supabase Edge Functions
- Use Supabase Edge Functions for serverless backend
- Deno runtime
- Built-in database integration