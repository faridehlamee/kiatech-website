import React, { useState, useEffect } from 'react';
import './OfflineNotice.css';

const OfflineNotice = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineNotice, setShowOfflineNotice] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineNotice(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineNotice(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!showOfflineNotice || isOnline) {
    return null;
  }

  return (
    <div className="offline-notice">
      <div className="offline-content">
        <div className="offline-icon">📡</div>
        <div className="offline-text">
          <h4>You're Offline</h4>
          <p>Don't worry! You can still browse our cached content.</p>
        </div>
        <button 
          className="offline-dismiss"
          onClick={() => setShowOfflineNotice(false)}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default OfflineNotice;
