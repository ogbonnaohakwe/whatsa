// Example WebSocket server using Socket.io
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://bkcog0cs4w4g8og4880gg800.67.205.133.254.sslip.io",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Store connected users
const connectedUsers = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle user authentication
  socket.on('authenticate', (userId) => {
    connectedUsers.set(userId, socket.id);
    socket.userId = userId;
    console.log(`User ${userId} authenticated`);
  });

  // Handle sending messages
  socket.on('send_message', async (data) => {
    const { contactId, message, userId } = data;
    
    try {
      // Send message via WhatsApp API
      // const result = await sendWhatsAppMessage(contactId, message);
      
      // Emit message status to user
      socket.emit('message_status', {
        messageId: 'msg_' + Date.now(),
        status: 'sent',
        contactId,
        message
      });
      
      // Save message to database
      // await saveMessageToDatabase(userId, contactId, message);
      
    } catch (error) {
      socket.emit('message_error', {
        error: error.message,
        contactId
      });
    }
  });

  // Handle incoming WhatsApp messages (webhook)
  socket.on('incoming_message', (data) => {
    const { userId, contactId, message } = data;
    const userSocketId = connectedUsers.get(userId);
    
    if (userSocketId) {
      io.to(userSocketId).emit('message_received', {
        contactId,
        message,
        timestamp: new Date()
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

// Webhook endpoint for WhatsApp
app.post('/webhook/whatsapp', (req, res) => {
  const { from, message, userId } = req.body;
  
  // Find user's socket and emit the message
  const userSocketId = connectedUsers.get(userId);
  if (userSocketId) {
    io.to(userSocketId).emit('message_received', {
      contactId: from,
      message,
      timestamp: new Date()
    });
  }
  
  res.status(200).send('OK');
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`);
});