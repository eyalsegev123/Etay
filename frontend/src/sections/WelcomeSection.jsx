import { Box } from '@mui/material';
import azulPic from '../assets/etaypic-azul.JPG';

const WelcomeSection = () => {
  return (
    <Box 
      id="welcome"
      component="section" 
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: 1,
        },
        backgroundImage: `url(${azulPic})`,
        backgroundSize: 'cover', // Changed back to 'cover'
        backgroundColor: '#000',
        backgroundPosition: '50% 30%', // Adjust vertical position to show more of the face
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        width: '100%', // Ensure full width
        margin: 0, // Remove any margin
        padding: 0, // Remove any padding
      }}
    >
    </Box>
  );
};

export default WelcomeSection;
