const express = require('express');
const WhatsAppBusinessAPI = require('../services/whatsappBusinessAPI');
const router = express.Router();

const whatsappAPI = new WhatsAppBusinessAPI();

// Webhook verification (GET)
router.get('/whatsapp', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  console.log('Webhook verification request:', { mode, token, challenge });

  const verificationResult = whatsappAPI.verifyWebhook(mode, token, challenge);
  
  if (verificationResult) {
    console.log('Webhook verified successfully');
    res.status(200).send(challenge);
  } else {
    console.log('Webhook verification failed');
    res.status(403).send('Forbidden');
  }
});

// Webhook endpoint (POST)
router.post('/whatsapp', (req, res) => {
  try {
    console.log('Webhook received:', JSON.stringify(req.body, null, 2));

    const { messages, statuses } = whatsappAPI.processWebhook(req.body);

    // Process incoming messages
    messages.forEach(async (message) => {
      console.log('Processing incoming message:', message);

      // Mark message as read
      if (message.id) {
        await whatsappAPI.markAsRead(message.id);
      }

      // Emit to connected clients via WebSocket
      const io = req.app.get('io');
      if (io) {
        io.emit('message_received', {
          messageId: message.id,
          from: message.from,
          message: message.text,
          type: message.type,
          timestamp: message.timestamp,
          contact: message.contact,
        });
      }

      // Process auto-responses
      await processAutoResponse(message);
    });

    // Process status updates
    statuses.forEach((status) => {
      console.log('Processing status update:', status);

      // Emit to connected clients via WebSocket
      const io = req.app.get('io');
      if (io) {
        io.emit('message_status', {
          messageId: status.id,
          status: status.status,
          timestamp: status.timestamp,
          recipientId: status.recipient_id,
        });
      }
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Auto-response processing
async function processAutoResponse(message) {
  try {
    if (!message.text) return;

    // Simple auto-response rules (you can make this more sophisticated)
    const autoResponses = [
      {
        triggers: ['hello', 'hi', 'hey'],
        response: 'Hello! Thanks for reaching out. How can I help you today?',
      },
      {
        triggers: ['price', 'pricing', 'cost'],
        response: 'Our pricing starts at $29/month. Would you like to know more about our plans?',
      },
      {
        triggers: ['hours', 'open', 'business hours'],
        response: "We're available Monday-Friday 9am to 5pm. How else can I assist you?",
      },
      {
        triggers: ['help', 'support'],
        response: "I'm here to help! Please let me know what you need assistance with.",
      },
    ];

    const messageText = message.text.toLowerCase();

    for (const autoResponse of autoResponses) {
      const matches = autoResponse.triggers.some(trigger => 
        messageText.includes(trigger)
      );

      if (matches) {
        console.log('Sending auto-response:', autoResponse.response);
        
        // Send auto-response
        await whatsappAPI.sendMessage(message.from, autoResponse.response);
        
        // Emit to connected clients
        const io = require('../server').io;
        if (io) {
          io.emit('auto_response_sent', {
            to: message.from,
            message: autoResponse.response,
            trigger: messageText,
            timestamp: new Date().toISOString(),
          });
        }
        
        break; // Send only the first matching response
      }
    }
  } catch (error) {
    console.error('Auto-response error:', error);
  }
}

module.exports = router;