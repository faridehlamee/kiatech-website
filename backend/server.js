const express = require('express');
const cors = require('cors');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware - Allow all origins for debugging
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(bodyParser.json());
app.use(express.static('public'));

// VAPID Keys from environment variables
const vapidKeys = {
  publicKey: process.env.VAPID_PUBLIC_KEY,
  privateKey: process.env.VAPID_PRIVATE_KEY
};

// Configure web-push
webpush.setVapidDetails(
  process.env.VAPID_EMAIL || 'mailto:info@kiatechsoftware.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// Subscription storage file
const subscriptionsFile = path.join(__dirname, 'subscriptions.json');

// Initialize subscriptions file if it doesn't exist
if (!fs.existsSync(subscriptionsFile)) {
  fs.writeFileSync(subscriptionsFile, JSON.stringify([]));
}

// Helper function to read subscriptions
function getSubscriptions() {
  try {
    const data = fs.readFileSync(subscriptionsFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading subscriptions:', error);
    return [];
  }
}

// Helper function to save subscriptions
function saveSubscriptions(subscriptions) {
  try {
    fs.writeFileSync(subscriptionsFile, JSON.stringify(subscriptions, null, 2));
  } catch (error) {
    console.error('Error saving subscriptions:', error);
  }
}

// Routes

// Get VAPID public key
app.get('/api/vapid-public-key', (req, res) => {
  console.log('VAPID public key requested from:', req.headers.origin);
  res.json({ publicKey: vapidKeys.publicKey });
});

// Subscribe to notifications
app.post('/api/subscribe', (req, res) => {
  console.log('Subscription request from:', req.headers.origin);
  console.log('Subscription data:', req.body);
  const subscription = req.body;
  
  try {
    const subscriptions = getSubscriptions();
    
    // Check if subscription already exists
    const existingIndex = subscriptions.findIndex(
      sub => sub.endpoint === subscription.endpoint
    );
    
    if (existingIndex >= 0) {
      subscriptions[existingIndex] = subscription;
    } else {
      subscriptions.push(subscription);
    }
    
    saveSubscriptions(subscriptions);
    
    console.log('New subscription added:', subscription.endpoint);
    res.json({ success: true, message: 'Subscription saved successfully' });
  } catch (error) {
    console.error('Error saving subscription:', error);
    res.status(500).json({ error: 'Failed to save subscription' });
  }
});

// Unsubscribe from notifications
app.post('/api/unsubscribe', (req, res) => {
  const subscription = req.body;
  
  try {
    const subscriptions = getSubscriptions();
    const filteredSubscriptions = subscriptions.filter(
      sub => sub.endpoint !== subscription.endpoint
    );
    
    saveSubscriptions(filteredSubscriptions);
    
    console.log('Subscription removed:', subscription.endpoint);
    res.json({ success: true, message: 'Unsubscribed successfully' });
  } catch (error) {
    console.error('Error removing subscription:', error);
    res.status(500).json({ error: 'Failed to unsubscribe' });
  }
});

// Send notification to all subscribers
app.post('/api/send-notification', (req, res) => {
  const { title, body, url, icon } = req.body;
  
  if (!title || !body) {
    return res.status(400).json({ error: 'Title and body are required' });
  }
  
  const subscriptions = getSubscriptions();
  const payload = JSON.stringify({
    title: title,
    body: body,
    url: url || 'https://kiatechsoftware.com',
    icon: icon || '/icons/icon-192x192.svg',
    type: req.body.type || 'general',
    requireInteraction: true,
    vibrate: [100, 50, 100],
    actions: [
      {
        action: 'explore',
        title: 'Visit Website',
        icon: '/icons/icon-192x192.svg'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/icon-192x192.svg'
      }
    ]
  });
  
  const promises = subscriptions.map(subscription => {
    return webpush.sendNotification(subscription, payload)
      .catch(error => {
        console.error('Error sending notification:', error);
        // Remove invalid subscriptions
        if (error.statusCode === 410) {
          const filteredSubscriptions = subscriptions.filter(
            sub => sub.endpoint !== subscription.endpoint
          );
          saveSubscriptions(filteredSubscriptions);
        }
      });
  });
  
  Promise.all(promises)
    .then(() => {
      console.log(`Notification sent to ${subscriptions.length} subscribers`);
      res.json({ 
        success: true, 
        message: `Notification sent to ${subscriptions.length} subscribers` 
      });
    })
    .catch(error => {
      console.error('Error sending notifications:', error);
      res.status(500).json({ error: 'Failed to send notifications' });
    });
});

// Get subscription count
app.get('/api/subscription-count', (req, res) => {
  const subscriptions = getSubscriptions();
  res.json({ count: subscriptions.length });
});

// Admin panel route
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Kiatech Push Notification Server running on port ${PORT}`);
  console.log(`📱 Admin panel: http://localhost:${PORT}/admin`);
  console.log(`🔑 VAPID Public Key: ${vapidKeys.publicKey}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down server...');
  process.exit(0);
});
