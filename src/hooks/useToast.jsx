import React, { createContext, useContext, useState, useCallback } from 'react';
import NotificationToast from '../components/common/NotificationToast';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ type = 'info', title, message, duration = 4000 }) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, title, message, duration }]);
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = {
    show: addToast,
    success: (message, title = 'Succès', duration = 4000) =>
      addToast({ type: 'success', title, message, duration }),
    warning: (message, title = 'Attention', duration = 4500) =>
      addToast({ type: 'warning', title, message, duration }),
    error: (message, title = 'Erreur', duration = 5000) =>
      addToast({ type: 'error', title, message, duration }),
    info: (message, title = 'Information', duration = 4000) =>
      addToast({ type: 'info', title, message, duration }),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {/* Toast Container Flottant */}
      <div
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 'var(--z-toast)',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          pointerEvents: 'none',
        }}
      >
        {toasts.map((t) => (
          <div key={t.id} style={{ pointerEvents: 'auto' }}>
            <NotificationToast
              type={t.type}
              title={t.title}
              message={t.message}
              duration={t.duration}
              onClose={() => removeToast(t.id)}
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    // Fallback safe si utilisé en dehors du provider
    return {
      show: () => {},
      success: (msg) => console.log('Toast success:', msg),
      warning: (msg) => console.log('Toast warning:', msg),
      error: (msg) => console.log('Toast error:', msg),
      info: (msg) => console.log('Toast info:', msg),
    };
  }
  return context;
}
