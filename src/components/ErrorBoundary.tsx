import { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary component to catch JavaScript errors anywhere in the component tree
 * Displays a fallback UI instead of crashing the whole app
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  resetErrorBoundary = (): void => {
    this.setState({
      hasError: false,
      error: null
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            m: 2, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            bgcolor: '#fff9fa',
            borderRadius: 2
          }}
        >
          <ErrorOutlineIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h5" component="h2" gutterBottom>
            Something went wrong
          </Typography>
          <Box sx={{ my: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1, width: '100%', overflow: 'auto' }}>
            <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace' }}>
              {this.state.error?.message || 'An unexpected error occurred'}
            </Typography>
          </Box>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={this.resetErrorBoundary}
            sx={{ mt: 2 }}
          >
            Try again
          </Button>
        </Paper>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
