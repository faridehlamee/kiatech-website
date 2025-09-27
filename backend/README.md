cd..# Kiatech Software Push Notification Backend

A Node.js backend server for managing push notifications for the Kiatech Software PWA.

## 🚀 Features

- **Subscription Management**: Store and manage user subscriptions
- **Push Notifications**: Send notifications to all subscribers
- **Admin Panel**: Beautiful web interface for sending notifications
- **VAPID Support**: Secure push messaging
- **Real-time Stats**: Monitor subscriber count

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## 🛠️ Installation

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Generate VAPID keys (for production):**
   ```bash
   npx web-push generate-vapid-keys
   ```

4. **Update VAPID keys in server.js:**
   - Replace `your-private-vapid-key-here` with your generated private key
   - Update the public key in your frontend service

## 🏃‍♂️ Running the Server

### Development Mode:
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server will start on `http://localhost:3002`

## 📱 Admin Panel

Access the admin panel at: `http://localhost:3002/admin`

### Features:
- **Subscriber Statistics**: See how many users are subscribed
- **Send Notifications**: Create and send push notifications
- **Quick Templates**: Pre-made notification templates
- **Real-time Updates**: Stats refresh automatically

## 🔧 API Endpoints

### `GET /api/vapid-public-key`
Returns the VAPID public key for frontend use.

### `POST /api/subscribe`
Subscribe a user to push notifications.
```json
{
  "endpoint": "https://fcm.googleapis.com/fcm/send/...",
  "keys": {
    "p256dh": "...",
    "auth": "..."
  }
}
```

### `POST /api/unsubscribe`
Unsubscribe a user from push notifications.

### `POST /api/send-notification`
Send a notification to all subscribers.
```json
{
  "title": "Notification Title",
  "body": "Notification message",
  "url": "https://kiatechsoftware.com",
  "icon": "https://kiatechsoftware.com/icon.png"
}
```

### `GET /api/subscription-count`
Get the number of active subscribers.

## 🔐 VAPID Keys

VAPID (Voluntary Application Server Identification) keys are used for secure push messaging.

### Generate Keys:
```bash
npx web-push generate-vapid-keys
```

### Update Frontend:
Update the public key in `src/services/pushNotificationService.js`

## 📊 Usage Examples

### Send a Service Update:
```bash
curl -X POST http://localhost:3002/api/send-notification \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Service Available!",
    "body": "Check out our new web development services.",
    "url": "https://kiatechsoftware.com/services"
  }'
```

### Send a Special Offer:
```bash
curl -X POST http://localhost:3002/api/send-notification \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Special Offer!",
    "body": "Get 20% off your first project. Limited time!",
    "url": "https://kiatechsoftware.com/contact"
  }'
```

## 🚀 Deployment

### Environment Variables:
- `PORT`: Server port (default: 3002)
- `VAPID_PUBLIC_KEY`: Your VAPID public key
- `VAPID_PRIVATE_KEY`: Your VAPID private key

### Production Checklist:
- [ ] Generate new VAPID keys
- [ ] Update CORS settings
- [ ] Set up HTTPS
- [ ] Configure database (optional)
- [ ] Set up monitoring

## 🔧 Troubleshooting

### Common Issues:

1. **VAPID Key Mismatch**: Ensure frontend and backend use the same VAPID keys
2. **CORS Errors**: Check CORS settings in server.js
3. **Subscription Storage**: Verify subscriptions.json file permissions
4. **Network Issues**: Ensure server is accessible from frontend

### Debug Mode:
Set `NODE_ENV=development` for detailed logging.

## 📝 License

MIT License - Feel free to use and modify for your projects.

## 🤝 Support

For issues or questions, contact: info@kiatechsoftware.com
