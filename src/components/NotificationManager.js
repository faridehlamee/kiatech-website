import React, { useState, useEffect } from 'react';
import pushNotificationService from '../services/pushNotificationService';
import './NotificationManager.css';

const NotificationManager = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] = useState('default');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showManager, setShowManager] = useState(false);

  useEffect(() => {
    checkSupport();
    checkPermission();
    checkSubscription();
  }, []);

  const checkSupport = () => {
    setIsSupported(pushNotificationService.isSupported);
  };

  const checkPermission = () => {
    setPermission(Notification.permission);
  };

  const checkSubscription = async () => {
    try {
      const subscribed = await pushNotificationService.isSubscribed();
      setIsSubscribed(subscribed);
    } catch (error) {
      console.error('Error checking subscription:', error);
    }
  };

  const handleSubscribe = async () => {
    setIsLoading(true);
    try {
      await pushNotificationService.subscribe();
      setIsSubscribed(true);
      setPermission('granted');
      showNotification('Successfully subscribed to notifications!');
    } catch (error) {
      console.error('Subscription failed:', error);
      showNotification('Failed to subscribe to notifications', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnsubscribe = async () => {
    setIsLoading(true);
    try {
      await pushNotificationService.unsubscribe();
      setIsSubscribed(false);
      showNotification('Unsubscribed from notifications');
    } catch (error) {
      console.error('Unsubscribe failed:', error);
      showNotification('Failed to unsubscribe', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = (message, type = 'success') => {
    // Create a temporary notification
    const notification = document.createElement('div');
    notification.className = `notification-toast ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  if (!isSupported) {
    return null;
  }

  return (
    <>
      <button 
        className="notification-toggle-btn"
        onClick={() => setShowManager(!showManager)}
        title="Manage notifications"
      >
        🔔
      </button>

      {showManager && (
        <div className="notification-manager">
          <div className="notification-content">
            <h4>📱 Push Notifications</h4>
            <p>Get notified about:</p>
            <ul>
              <li>✨ New service updates</li>
              <li>🎯 Special offers</li>
              <li>📞 Important announcements</li>
            </ul>

            <div className="notification-status">
              <span className={`status ${permission}`}>
                Status: {permission === 'granted' ? '✅ Enabled' : '❌ Disabled'}
              </span>
            </div>

            <div className="notification-actions">
              {!isSubscribed ? (
                <button 
                  className="subscribe-btn"
                  onClick={handleSubscribe}
                  disabled={isLoading}
                >
                  {isLoading ? '⏳ Enabling...' : '🔔 Enable Notifications'}
                </button>
              ) : (
                <button 
                  className="unsubscribe-btn"
                  onClick={handleUnsubscribe}
                  disabled={isLoading}
                >
                  {isLoading ? '⏳ Disabling...' : '🔕 Disable Notifications'}
                </button>
              )}
            </div>

            <button 
              className="close-manager-btn"
              onClick={() => setShowManager(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationManager;
