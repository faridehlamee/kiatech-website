// Push Notification Service for Kiatech Software PWA
class PushNotificationService {
  constructor() {
    this.isSupported = 'Notification' in window && 'serviceWorker' in navigator;
    this.permission = Notification.permission;
  }

  // Request notification permission
  async requestPermission() {
    if (!this.isSupported) {
      throw new Error('Push notifications are not supported');
    }

    if (this.permission === 'granted') {
      return true;
    }

    const permission = await Notification.requestPermission();
    this.permission = permission;
    return permission === 'granted';
  }

  // Subscribe to push notifications
  async subscribe() {
    console.log('Starting subscription process...');
    
    if (!this.isSupported) {
      throw new Error('Push notifications are not supported');
    }

    console.log('Requesting permission...');
    const permission = await this.requestPermission();
    if (!permission) {
      throw new Error('Notification permission denied');
    }
    console.log('Permission granted:', permission);

    try {
      console.log('Getting VAPID public key from server...');
      // Get VAPID public key from server
      const publicKey = await this.getVapidPublicKey();
      console.log('VAPID public key received:', publicKey.substring(0, 20) + '...');
      
      console.log('Getting service worker registration...');
      console.log('Service worker supported:', 'serviceWorker' in navigator);
      console.log('Service worker state:', navigator.serviceWorker.controller ? navigator.serviceWorker.controller.state : 'no controller');
      
      // Force service worker update if needed
      if (navigator.serviceWorker.controller) {
        console.log('Forcing service worker update...');
        navigator.serviceWorker.controller.postMessage({ action: 'SKIP_WAITING' });
      }
      
      const registration = await navigator.serviceWorker.ready;
      console.log('Service worker ready:', registration);
      console.log('Service worker state:', registration.active ? registration.active.state : 'no active worker');
      
      console.log('Subscribing to push manager...');
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(publicKey)
      });
      console.log('Push subscription created:', subscription);

      console.log('Sending subscription to server...');
      // Send subscription to your server
      await this.sendSubscriptionToServer(subscription);
      console.log('Subscription sent to server successfully');
      return subscription;
    } catch (error) {
      console.error('Error subscribing to push notifications:', error);
      throw error;
    }
  }

  // Convert VAPID key
  urlBase64ToUint8Array(base64String) {
    console.log('Converting VAPID key:', base64String);
    try {
      const padding = '='.repeat((4 - base64String.length % 4) % 4);
      const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);

      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      console.log('VAPID key converted successfully, length:', outputArray.length);
      return outputArray;
    } catch (error) {
      console.error('Error converting VAPID key:', error);
      throw error;
    }
  }

  // Get VAPID public key from server
  async getVapidPublicKey() {
    try {
      const response = await fetch('https://kiatech-website-production.up.railway.app/api/vapid-public-key');
      if (!response.ok) {
        throw new Error('Failed to get VAPID public key');
      }
      const data = await response.json();
      return data.publicKey;
    } catch (error) {
      console.error('Error getting VAPID public key:', error);
      throw error;
    }
  }

  // Send subscription to server
  async sendSubscriptionToServer(subscription) {
    try {
      const response = await fetch('https://kiatech-website-production.up.railway.app/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscription),
      });

      if (!response.ok) {
        throw new Error('Failed to save subscription');
      }

      return await response.json();
    } catch (error) {
      console.error('Error sending subscription to server:', error);
      throw error;
    }
  }

  // Unsubscribe from notifications
  async unsubscribe() {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      
      if (subscription) {
        await subscription.unsubscribe();
        await this.sendUnsubscribeToServer(subscription);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error unsubscribing from push notifications:', error);
      throw error;
    }
  }

  // Send unsubscribe to server
  async sendUnsubscribeToServer(subscription) {
    try {
      await fetch('https://kiatech-website-production.up.railway.app/api/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscription),
      });
    } catch (error) {
      console.error('Error sending unsubscribe to server:', error);
    }
  }

  // Check if user is subscribed
  async isSubscribed() {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      return !!subscription;
    } catch (error) {
      console.error('Error checking subscription status:', error);
      return false;
    }
  }
}

export default new PushNotificationService();
