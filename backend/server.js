const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

app.use(express.json());

// Socket.io setup
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Make io available to routes
app.set('io', io);

// Store connected users
const connectedUsers = new Map();

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('authenticate', (userId) => {
    connectedUsers.set(userId, socket.id);
    socket.userId = userId;
    console.log(`User ${userId} authenticated`);
  });

  socket.on('send_message', async (data) => {
    const { contactId, message, userId, type = 'text', mediaUrl, caption } = data;
    
    try {
      const WhatsAppBusinessAPI = require('./services/whatsappBusinessAPI');
      const whatsappAPI = new WhatsAppBusinessAPI();
      
      console.log(`Sending ${type} message from ${userId} to ${contactId}: ${message}`);
      
      let messageId;
      
      switch (type) {
        case 'text':
          messageId = await whatsappAPI.sendMessage(contactId, message);
          break;
        case 'image':
          messageId = await whatsappAPI.sendImage(contactId, mediaUrl, caption);
          break;
        default:
          throw new Error('Unsupported message type');
      }
      
      // Emit success status
      socket.emit('message_status', {
        messageId,
        status: 'sent',
        contactId,
        message,
        timestamp: new Date().toISOString()
      });
      
    } catch (error) {
      console.error('Send message error:', error);
      socket.emit('message_error', {
        error: error.message,
        contactId
      });
    }
  });

  socket.on('disconnect', () => {
    if (socket.userId) {
      connectedUsers.delete(socket.userId);
    }
    console.log('User disconnected:', socket.id);
  });
});

// Routes
const whatsappRoutes = require('./routes/whatsapp');
const webhookRoutes = require('./routes/webhook');

app.use('/api/whatsapp', whatsappRoutes);
app.use('/webhook', webhookRoutes);

// Health check
app.get('/api/health', (req, res) => {
  const WhatsAppBusinessAPI = require('./services/whatsappBusinessAPI');
  const whatsappAPI = new WhatsAppBusinessAPI();
  
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    connectedUsers: connectedUsers.size,
    whatsappConfigured: whatsappAPI.isConfigured()
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Frontend URL: ${process.env.FRONTEND_URL || "http://localhost:5173"}`);
  
  const WhatsAppBusinessAPI = require('./services/whatsappBusinessAPI');
  const whatsappAPI = new WhatsAppBusinessAPI();
  
  if (whatsappAPI.isConfigured()) {
    console.log('✅ WhatsApp Business API configured');
  } else {
    console.log('⚠️  WhatsApp Business API not configured - check environment variables');
  }
});

// Export io for use in other modules
module.exports = { app, server, io };