import React, { useState, useEffect } from 'react';
import pushNotificationService from '../services/pushNotificationService';
import './NotificationManager.css';

const NotificationManager = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] = useState('default');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showManager, setShowManager] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
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
          read: false,
          url: event.data.data.url || '/'
        };
        setNotifications(prev => [notification, ...prev]);
        setUnreadCount(prev => prev + 1);
        
        // Save to localStorage
        const updated = [notification, ...notifications];
        localStorage.setItem('kiatech-notifications', JSON.stringify(updated));
      }
    };

    navigator.serviceWorker.addEventListener('message', handleMessage);
    
    // Close dropdowns when clicking outside
    const handleClickOutside = (event) => {
      if (!event.target.closest('.notification-bell-container') && 
          !event.target.closest('.notification-manager')) {
        setShowNotifications(false);
        setShowManager(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    
    return () => {
      navigator.serviceWorker.removeEventListener('message', handleMessage);
      document.removeEventListener('click', handleClickOutside);
    };
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

  const loadNotifications = async () => {
    try {
      // First try to load from IndexedDB (for notifications received when app was closed)
      const db = await openIndexedDB();
      if (db) {
        const transaction = db.transaction(['notifications'], 'readonly');
        const store = transaction.objectStore('notifications');
        const request = store.getAll();
        
        request.onsuccess = () => {
          const indexedNotifications = request.result || [];
          console.log('Loaded notifications from IndexedDB:', indexedNotifications);
          
          // Also load from localStorage as fallback
          const savedNotifications = localStorage.getItem('kiatech-notifications');
          let localStorageNotifications = [];
          if (savedNotifications) {
            localStorageNotifications = JSON.parse(savedNotifications);
          }
          
          // Merge notifications, avoiding duplicates
          const allNotifications = [...indexedNotifications];
          localStorageNotifications.forEach(localNotif => {
            if (!allNotifications.find(n => n.id === localNotif.id)) {
              allNotifications.push(localNotif);
            }
          });
          
          // Sort by timestamp (newest first)
          allNotifications.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
          
          setNotifications(allNotifications);
          setUnreadCount(allNotifications.filter(n => !n.read).length);
          
          // Update localStorage with merged data
          localStorage.setItem('kiatech-notifications', JSON.stringify(allNotifications));
        };
      } else {
        // Fallback to localStorage only
        const savedNotifications = localStorage.getItem('kiatech-notifications');
        if (savedNotifications) {
          const parsed = JSON.parse(savedNotifications);
          setNotifications(parsed);
          setUnreadCount(parsed.filter(n => !n.read).length);
        }
      }
    } catch (error) {
      console.error('Error loading notifications:', error);
      // Fallback to localStorage
      const savedNotifications = localStorage.getItem('kiatech-notifications');
      if (savedNotifications) {
        const parsed = JSON.parse(savedNotifications);
        setNotifications(parsed);
        setUnreadCount(parsed.filter(n => !n.read).length);
      }
    }
  };

  const openIndexedDB = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('KiatechNotifications', 1);
      
      request.onerror = () => {
        console.log('IndexedDB not available, using localStorage');
        resolve(null);
      };
      request.onsuccess = () => resolve(request.result);
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('notifications')) {
          const store = db.createObjectStore('notifications', { keyPath: 'id', autoIncrement: true });
          store.createIndex('timestamp', 'timestamp', { unique: false });
          store.createIndex('read', 'read', { unique: false });
        }
      };
    });
  };

  const markAsRead = async (notificationId) => {
    const updated = notifications.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    );
    
    setNotifications(updated);
    setUnreadCount(updated.filter(n => !n.read).length);
    
    // Save to localStorage
    localStorage.setItem('kiatech-notifications', JSON.stringify(updated));
    
    // Update IndexedDB
    try {
      const db = await openIndexedDB();
      if (db) {
        const transaction = db.transaction(['notifications'], 'readwrite');
        const store = transaction.objectStore('notifications');
        const request = store.get(notificationId);
        
        request.onsuccess = () => {
          const notification = request.result;
          if (notification) {
            notification.read = true;
            store.put(notification);
          }
        };
      }
    } catch (error) {
      console.error('Error updating notification in IndexedDB:', error);
    }
    
    // Clear app badge if no unread notifications
    if (unreadCount <= 1 && 'clearAppBadge' in navigator) {
      navigator.clearAppBadge().catch(console.error);
    }
  };

  const markAllAsRead = async () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    setUnreadCount(0);
    localStorage.setItem('kiatech-notifications', JSON.stringify(updated));
    
    // Update IndexedDB
    try {
      const db = await openIndexedDB();
      if (db) {
        const transaction = db.transaction(['notifications'], 'readwrite');
        const store = transaction.objectStore('notifications');
        const request = store.getAll();
        
        request.onsuccess = () => {
          const allNotifications = request.result || [];
          allNotifications.forEach(notification => {
            notification.read = true;
            store.put(notification);
          });
        };
      }
    } catch (error) {
      console.error('Error updating notifications in IndexedDB:', error);
    }
    
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
          onClick={() => setShowNotifications(!showNotifications)}
          title="View notifications"
        >
          🔔
          {unreadCount > 0 && (
            <span className="notification-badge">{unreadCount}</span>
          )}
        </button>
        
        <button 
          className="notification-toggle-btn"
          onClick={() => setShowManager(!showManager)}
          title="Notification settings"
          style={{ 
            marginTop: '10px',
            background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
            fontSize: '1rem'
          }}
        >
          ⚙️
        </button>
        
        {showNotifications && (
          <div className="notification-dropdown">
            <div className="notification-header">
              <h3>Notifications</h3>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                {unreadCount > 0 && (
                  <button onClick={markAllAsRead} className="mark-all-read">
                    Mark all as read
                  </button>
                )}
                <button 
                  onClick={() => {
                    setShowNotifications(false);
                    setShowManager(true);
                  }}
                  className="mark-all-read"
                  style={{ background: '#28a745' }}
                >
                  Settings
                </button>
                <button 
                  onClick={() => setShowNotifications(false)}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    fontSize: '1.2rem', 
                    color: '#999', 
                    cursor: 'pointer',
                    padding: '0',
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  ×
                </button>
              </div>
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
