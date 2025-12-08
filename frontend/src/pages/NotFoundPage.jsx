import { Box, Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

/**
 * 404 Not Found Page
 * 
 * Shown when a user navigates to a URL that doesn't exist.
 * Provides a friendly message and a way to get back to the homepage.
 */
const NotFoundPage = () => {
  const navigate = useNavigate();

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
          }}
        >
          <SentimentDissatisfiedIcon 
            sx={{ 
              fontSize: 80, 
              color: 'text.secondary',
              mb: 2,
              opacity: 0.5,
            }} 
          />
          
          <Typography 
            variant="h1" 
            component="h1" 
            sx={{ 
              fontSize: { xs: '4rem', md: '6rem' },
              fontWeight: 700,
              color: 'primary.main',
              mb: 1,
            }}
          >
            404
          </Typography>
          
          <Typography 
            variant="h5" 
            component="h2" 
            gutterBottom
            sx={{ fontWeight: 600 }}
          >
            העמוד לא נמצא
          </Typography>
          
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            מצטערים, העמוד שחיפשת לא קיים או שהוסר.
          </Typography>
          
          <Button
            variant="contained"
            size="large"
            startIcon={<HomeIcon />}
            onClick={() => navigate('/')}
            sx={{ px: 4 }}
          >
            חזרה לדף הבית
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default NotFoundPage;
