import React, { useState, useEffect } from 'react';
import pushNotificationService from '../services/pushNotificationService';
import './NotificationManager.css';

const NotificationManager = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] = useState('default');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showManager, setShowManager] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    checkSupport();
    checkPermission();
    checkSubscription();
    loadNotifications();
    
    // Listen for messages from service worker
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'NOTIFICATION_RECEIVED') {
        const notification = {
          id: Date.now(),
          title: event.data.data.title,
          body: event.data.data.body,
          timestamp: new Date(event.data.data.timestamp),
          read: false
        };
        setNotifications(prev => [notification, ...prev]);
        setUnreadCount(prev => prev + 1);
        
        // Save to localStorage
        const updated = [notification, ...notifications];
        localStorage.setItem('kiatech-notifications', JSON.stringify(updated));
      }
    };

    navigator.serviceWorker.addEventListener('message', handleMessage);
    return () => navigator.serviceWorker.removeEventListener('message', handleMessage);
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

  const loadNotifications = () => {
    // Load notifications from localStorage
    const savedNotifications = localStorage.getItem('kiatech-notifications');
    if (savedNotifications) {
      const parsed = JSON.parse(savedNotifications);
      setNotifications(parsed);
      setUnreadCount(parsed.filter(n => !n.read).length);
    }
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
    
    // Save to localStorage
    const updated = notifications.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    );
    localStorage.setItem('kiatech-notifications', JSON.stringify(updated));
    
    // Clear app badge if no unread notifications
    if (unreadCount <= 1 && 'clearAppBadge' in navigator) {
      navigator.clearAppBadge().catch(console.error);
    }
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
    localStorage.setItem('kiatech-notifications', JSON.stringify(notifications.map(n => ({ ...n, read: true }))));
    
    // Clear app badge
    if ('clearAppBadge' in navigator) {
      navigator.clearAppBadge().catch(console.error);
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
      <div className="notification-bell-container">
        <button 
          className="notification-toggle-btn"
          onClick={() => setShowManager(!showManager)}
          title="Manage notifications"
        >
          🔔
          {unreadCount > 0 && (
            <span className="notification-badge">{unreadCount}</span>
          )}
        </button>
        
        {showManager && (
          <div className="notification-dropdown">
            <div className="notification-header">
              <h3>Notifications</h3>
              {unreadCount > 0 && (
                <button onClick={markAllAsRead} className="mark-all-read">
                  Mark all as read
                </button>
              )}
            </div>
            
            <div className="notification-list">
              {notifications.length === 0 ? (
                <div className="no-notifications">No notifications yet</div>
              ) : (
                notifications.map(notification => (
                  <div 
                    key={notification.id} 
                    className={`notification-item ${!notification.read ? 'unread' : ''}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="notification-content">
                      <h4>{notification.title}</h4>
                      <p>{notification.body}</p>
                      <span className="notification-time">
                        {notification.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    {!notification.read && <div className="unread-dot"></div>}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

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
