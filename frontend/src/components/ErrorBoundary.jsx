import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

/**
 * Error Boundary Component
 * 
 * This catches JavaScript errors anywhere in the child component tree,
 * logs the error, and displays a fallback UI instead of a blank screen.
 * 
 * Why we need this:
 * - In production, if any component crashes, the whole app would show a white screen
 * - This catches the error and shows a friendly message in Hebrew
 * - Users can refresh the page to try again
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // This lifecycle method catches errors during rendering
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // This logs the error for debugging (you could send this to a logging service)
  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleRefresh = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.default',
            direction: 'rtl',
          }}
        >
          <Container maxWidth="sm">
            <Box
              sx={{
                textAlign: 'center',
                p: 4,
                bgcolor: 'background.paper',
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              }}
            >
              <ErrorOutlineIcon 
                sx={{ 
                  fontSize: 64, 
                  color: 'primary.main',
                  mb: 2,
                }} 
              />
              
              <Typography 
                variant="h4" 
                component="h1" 
                gutterBottom
                sx={{ fontWeight: 600 }}
              >
                משהו השתבש
              </Typography>
              
              <Typography 
                variant="body1" 
                color="text.secondary"
                sx={{ mb: 4 }}
              >
                מצטערים, אירעה שגיאה בטעינת העמוד. 
                אנא נסו לרענן את הדף.
              </Typography>
              
              <Button
                variant="contained"
                size="large"
                startIcon={<RefreshIcon />}
                onClick={this.handleRefresh}
                sx={{ px: 4 }}
              >
                רענן את הדף
              </Button>
            </Box>
          </Container>
        </Box>
      );
    }

    // If no error, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;
