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
    const { contactId, message, userId } = data;
    
    try {
      // Here you would integrate with WhatsApp Business API
      // For now, we'll simulate the message sending
      console.log(`Sending message from ${userId} to ${contactId}: ${message}`);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Emit success status
      socket.emit('message_status', {
        messageId: 'msg_' + Date.now(),
        status: 'sent',
        contactId,
        message,
        timestamp: new Date()
      });
      
      // Simulate message delivery after 2 seconds
      setTimeout(() => {
        socket.emit('message_status', {
          messageId: 'msg_' + Date.now(),
          status: 'delivered',
          contactId,
          message,
          timestamp: new Date()
        });
      }, 2000);
      
    } catch (error) {
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

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    connectedUsers: connectedUsers.size
  });
});

// WhatsApp API endpoints
app.post('/api/whatsapp/send', async (req, res) => {
  try {
    const { to, message, userId } = req.body;
    
    // Here you would integrate with WhatsApp Business API
    // For now, we'll simulate the response
    console.log(`API: Sending message from ${userId} to ${to}: ${message}`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const messageId = 'msg_' + Date.now();
    
    res.json({
      success: true,
      messageId,
      status: 'sent',
      timestamp: new Date()
    });
    
    // Notify connected user via WebSocket
    const userSocketId = connectedUsers.get(userId);
    if (userSocketId) {
      io.to(userSocketId).emit('message_status', {
        messageId,
        status: 'sent',
        contactId: to,
        message,
        timestamp: new Date()
      });
    }
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.get('/api/whatsapp/status/:messageId', (req, res) => {
  const { messageId } = req.params;
  
  // Simulate message status check
  res.json({
    messageId,
    status: 'delivered',
    timestamp: new Date()
  });
});

// Webhook endpoint for WhatsApp (this would be called by WhatsApp Business API)
app.post('/webhook/whatsapp', (req, res) => {
  try {
    const { from, message, to, messageId } = req.body;
    
    console.log(`Webhook: Received message from ${from} to ${to}: ${message}`);
    
    // Find the user this message is for and notify them
    const userSocketId = connectedUsers.get(to);
    if (userSocketId) {
      io.to(userSocketId).emit('message_received', {
        messageId,
        contactId: from,
        message,
        timestamp: new Date()
      });
    }
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Auto-response processing
app.post('/api/auto-response/process', async (req, res) => {
  try {
    const { message, contactId, userId } = req.body;
    
    // Here you would check auto-response rules and send automated replies
    console.log(`Processing auto-response for message: ${message}`);
    
    // Simulate auto-response logic
    const autoResponse = getAutoResponse(message);
    
    if (autoResponse) {
      // Send auto-response
      const userSocketId = connectedUsers.get(userId);
      if (userSocketId) {
        io.to(userSocketId).emit('message_status', {
          messageId: 'auto_' + Date.now(),
          status: 'sent',
          contactId,
          message: autoResponse,
          isAutomated: true,
          timestamp: new Date()
        });
      }
    }
    
    res.json({ success: true, autoResponse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Simple auto-response logic (you would make this more sophisticated)
function getAutoResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return "Hello! Thanks for reaching out. How can I help you today?";
  }
  
  if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
    return "Our pricing starts at $29/month. Would you like to know more about our plans?";
  }
  
  if (lowerMessage.includes('hours') || lowerMessage.includes('open')) {
    return "We're available Monday-Friday 9am to 5pm. How else can I assist you?";
  }
  
  return null; // No auto-response
}

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Frontend URL: ${process.env.FRONTEND_URL || "http://localhost:5173"}`);
});