import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Snackbar, Alert } from '@mui/material';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface NotificationContextType {
  showNotification: (message: string, type?: NotificationType, duration?: number) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

/**
 * NotificationProvider component that provides global notification functionality
 * Uses Snackbar for non-blocking user feedback
 */
export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<NotificationType>('info');
  const [duration, setDuration] = useState(6000);

  const showNotification = useCallback((
    newMessage: string, 
    notificationType: NotificationType = 'info',
    notificationDuration: number = 3000
  ) => {
    setMessage(newMessage);
    setType(notificationType);
    setDuration(notificationDuration);
    setOpen(true);
  }, []);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  
  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={duration}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleClose} 
          severity={type} 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
