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
        
        setNotifications(prev => {
          // Check if notification already exists (avoid duplicates)
          const exists = prev.find(n => 
            n.title === notification.title && 
            n.body === notification.body && 
            Math.abs(new Date(n.timestamp) - new Date(notification.timestamp)) < 1000
          );
          
          if (exists) {
            console.log('Notification already exists, not adding duplicate');
            return prev;
          }
          
          const updated = [notification, ...prev];
          // Save to localStorage
          localStorage.setItem('kiatech-notifications', JSON.stringify(updated));
          return updated;
        });
        
        // Update unread count based on actual notifications
        setNotifications(prev => {
          const unreadCount = prev.filter(n => !n.read).length;
          setUnreadCount(unreadCount);
          return prev;
        });
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

  const cleanupOldNotifications = (notifications) => {
    // Keep only the last 50 notifications and remove very old ones (older than 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const cleaned = notifications
      .filter(n => new Date(n.timestamp) > thirtyDaysAgo)
      .slice(0, 50)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    return cleaned;
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
          
          // Merge notifications, avoiding duplicates by ID
          const allNotifications = [...indexedNotifications];
          localStorageNotifications.forEach(localNotif => {
            if (!allNotifications.find(n => n.id === localNotif.id)) {
              allNotifications.push(localNotif);
            }
          });
          
          // Clean up old notifications
          const cleanedNotifications = cleanupOldNotifications(allNotifications);
          
          // Calculate unread count properly
          const unreadCount = cleanedNotifications.filter(n => !n.read).length;
          
          setNotifications(cleanedNotifications);
          setUnreadCount(unreadCount);
          
          // Update localStorage with cleaned data
          localStorage.setItem('kiatech-notifications', JSON.stringify(cleanedNotifications));
          
          console.log('Total notifications:', allNotifications.length);
          console.log('Unread notifications:', unreadCount);
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

  const clearAllNotifications = async () => {
    setNotifications([]);
    setUnreadCount(0);
    localStorage.removeItem('kiatech-notifications');
    
    // Clear IndexedDB
    try {
      const db = await openIndexedDB();
      if (db) {
        const transaction = db.transaction(['notifications'], 'readwrite');
        const store = transaction.objectStore('notifications');
        store.clear();
      }
    } catch (error) {
      console.error('Error clearing notifications from IndexedDB:', error);
    }
    
    // Clear app badge
    if ('clearAppBadge' in navigator) {
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
          <div className="notification-dropdown" onClick={(e) => e.stopPropagation()}>
            <div className="notification-panel">
              <div className="notification-header">
                <h3>🔔 Notifications</h3>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                  {unreadCount > 0 && (
                    <button onClick={markAllAsRead} className="mark-all-read">
                      Mark all read
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
                    ⚙️ Settings
                  </button>
                  <button 
                    onClick={() => {
                      clearAllNotifications();
                      setShowNotifications(false);
                    }}
                    className="mark-all-read"
                    style={{ background: '#dc3545' }}
                  >
                    🗑️ Clear All
                  </button>
                  <button 
                    onClick={() => setShowNotifications(false)}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      fontSize: '1.5rem', 
                      color: '#999', 
                      cursor: 'pointer',
                      padding: '0',
                      width: '30px',
                      height: '30px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f0f0'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    ×
                  </button>
                </div>
              </div>
              
              <div className="notification-list">
                {notifications.length === 0 ? (
                  <div className="no-notifications">
                    <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🔔</div>
                    <div>No notifications yet</div>
                    <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '5px' }}>
                      We'll notify you when there's something new!
                    </div>
                  </div>
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
                          {new Date(notification.timestamp).toLocaleString()}
                        </span>
                      </div>
                      {!notification.read && <div className="unread-dot"></div>}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {showManager && (
        <div className="notification-manager" onClick={(e) => e.stopPropagation()}>
          <div className="notification-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h4>📱 Push Notifications</h4>
              <button 
                onClick={() => setShowManager(false)}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  fontSize: '1.5rem', 
                  color: '#999', 
                  cursor: 'pointer',
                  padding: '0',
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f0f0'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                ×
              </button>
            </div>
            
            <p style={{ marginBottom: '15px', color: '#666' }}>Get notified about:</p>
            <ul style={{ marginBottom: '20px', paddingLeft: '20px' }}>
              <li style={{ marginBottom: '8px', color: '#555' }}>✨ New service updates</li>
              <li style={{ marginBottom: '8px', color: '#555' }}>🎯 Special offers</li>
              <li style={{ marginBottom: '8px', color: '#555' }}>📞 Important announcements</li>
            </ul>

            <div className="notification-status" style={{ 
              background: '#f8f9fa', 
              padding: '15px', 
              borderRadius: '10px', 
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              <span className={`status ${permission}`} style={{ 
                fontSize: '1rem',
                fontWeight: '500',
                color: permission === 'granted' ? '#28a745' : '#dc3545'
              }}>
                Status: {permission === 'granted' ? '✅ Enabled' : '❌ Disabled'}
              </span>
            </div>

            <div className="notification-actions" style={{ textAlign: 'center' }}>
              {!isSubscribed ? (
                <button 
                  className="subscribe-btn"
                  onClick={handleSubscribe}
                  disabled={isLoading}
                  style={{
                    background: 'linear-gradient(135deg, #007bff 0%, #667eea 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '25px',
                    fontSize: '1rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(0, 123, 255, 0.3)',
                    width: '100%',
                    maxWidth: '250px'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  {isLoading ? '⏳ Enabling...' : '🔔 Enable Notifications'}
                </button>
              ) : (
                <button 
                  className="unsubscribe-btn"
                  onClick={handleUnsubscribe}
                  disabled={isLoading}
                  style={{
                    background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '25px',
                    fontSize: '1rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(220, 53, 69, 0.3)',
                    width: '100%',
                    maxWidth: '250px'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  {isLoading ? '⏳ Disabling...' : '🔕 Disable Notifications'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationManager;
