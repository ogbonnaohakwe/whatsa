const express = require('express');
const WhatsAppBusinessAPI = require('../services/whatsappBusinessAPI');
const router = express.Router();

const whatsappAPI = new WhatsAppBusinessAPI();

// Send message endpoint
router.post('/send', async (req, res) => {
  try {
    const { to, message, type = 'text', mediaUrl, caption } = req.body;

    if (!to || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: to, message',
      });
    }

    let messageId;

    switch (type) {
      case 'text':
        messageId = await whatsappAPI.sendMessage(to, message);
        break;
      case 'image':
        if (!mediaUrl) {
          return res.status(400).json({
            success: false,
            error: 'mediaUrl is required for image messages',
          });
        }
        messageId = await whatsappAPI.sendImage(to, mediaUrl, caption);
        break;
      default:
        return res.status(400).json({
          success: false,
          error: 'Unsupported message type',
        });
    }

    res.json({
      success: true,
      messageId,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Send template message
router.post('/send-template', async (req, res) => {
  try {
    const { to, templateName, languageCode = 'en_US', components = [] } = req.body;

    if (!to || !templateName) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: to, templateName',
      });
    }

    const messageId = await whatsappAPI.sendTemplate(to, templateName, languageCode, components);

    res.json({
      success: true,
      messageId,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Send template error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get message status
router.get('/status/:messageId', async (req, res) => {
  try {
    const { messageId } = req.params;
    const status = await whatsappAPI.getMessageStatus(messageId);

    res.json({
      success: true,
      status,
    });
  } catch (error) {
    console.error('Get status error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Mark message as read
router.post('/mark-read', async (req, res) => {
  try {
    const { messageId } = req.body;

    if (!messageId) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: messageId',
      });
    }

    const success = await whatsappAPI.markAsRead(messageId);

    res.json({
      success,
    });
  } catch (error) {
    console.error('Mark read error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Configuration status
router.get('/config', (req, res) => {
  res.json({
    configured: whatsappAPI.isConfigured(),
    phoneNumberId: whatsappAPI.phoneNumberId ? '***' + whatsappAPI.phoneNumberId.slice(-4) : null,
  });
});

module.exports = router;