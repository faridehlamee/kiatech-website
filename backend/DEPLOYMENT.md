# Railway Deployment Guide

## Environment Variables Required

Set these in your Railway dashboard:

```
VAPID_PUBLIC_KEY=your_vapid_public_key_here
VAPID_PRIVATE_KEY=your_vapid_private_key_here
VAPID_EMAIL=mailto:your-email@example.com
PORT=3001
NODE_ENV=production
```

## Deployment Steps

1. Connect your GitHub repository to Railway
2. Select the `backend` folder as the root directory
3. Add the environment variables above
4. Deploy!

## Getting Your VAPID Keys

Run this command locally to generate your keys:
```bash
node generate-keys.js
```

Copy the generated keys to your Railway environment variables.
