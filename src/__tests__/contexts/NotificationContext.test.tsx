import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NotificationProvider, useNotification } from '../../contexts/NotificationContext';

const TestComponent = () => {
  const { showNotification } = useNotification();
  
  return (
    <div>
      <button onClick={() => showNotification('Success message', 'success')}>
        Show Success
      </button>
      <button onClick={() => showNotification('Error message', 'error')}>
        Show Error
      </button>
      <button onClick={() => showNotification('Info message')}>
        Show Info
      </button>
    </div>
  );
};

// Mock the Material UI Snackbar and Alert components
jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  Snackbar: ({ open, children }: { open: boolean, children: React.ReactNode }) => (
    open ? <div data-testid="mock-snackbar">{children}</div> : null
  ),
  Alert: ({ severity, children }: { severity: string, children: React.ReactNode }) => (
    <div data-testid="mock-alert" data-severity={severity}>{children}</div>
  )
}));

describe('NotificationContext', () => {
  test('provides showNotification function', () => {
    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );
    
    expect(screen.getByText('Show Success')).toBeInTheDocument();
    expect(screen.getByText('Show Error')).toBeInTheDocument();
    expect(screen.getByText('Show Info')).toBeInTheDocument();
  });
  
  test('displays a success notification when triggered', () => {
    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );
    
    expect(screen.queryByTestId('mock-snackbar')).not.toBeInTheDocument();
    
    act(() => {
      screen.getByText('Show Success').click();
    });
    
    expect(screen.getByTestId('mock-snackbar')).toBeInTheDocument();
    expect(screen.getByText('Success message')).toBeInTheDocument();
    
    const alert = screen.getByTestId('mock-alert');
    expect(alert).toHaveAttribute('data-severity', 'success');
  });
  
  test('displays an error notification when triggered', () => {
    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );
    
    act(() => {
      screen.getByText('Show Error').click();
    });
    
    expect(screen.getByTestId('mock-snackbar')).toBeInTheDocument();
    expect(screen.getByText('Error message')).toBeInTheDocument();
    
    const alert = screen.getByTestId('mock-alert');
    expect(alert).toHaveAttribute('data-severity', 'error');
  });
  
  test('uses info severity by default when not specified', () => {
    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );
    
    act(() => {
      screen.getByText('Show Info').click();
    });
    
    const alert = screen.getByTestId('mock-alert');
    expect(alert).toHaveAttribute('data-severity', 'info');
  });
});
