#!/bin/bash

# Railway deployment script for backend only

echo "🚀 Deploying Kiatech Backend to Railway..."

# Install Railway CLI if not installed
if ! command -v railway &> /dev/null; then
    echo "Installing Railway CLI..."
    npm install -g @railway/cli
fi

# Login to Railway
railway login

# Deploy from current directory (backend)
railway up

echo "✅ Deployment complete!"
echo "Your backend is now live on Railway!"
