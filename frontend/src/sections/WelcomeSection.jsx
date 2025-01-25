import { Container, Typography, Box, Fade } from '@mui/material';
import { keyframes } from '@mui/system';
import duvdevanFlag from '../assets/duvdevan-flag.png';
import itayPic from '../assets/etaypic-welcomesection-removebg.png';

// Define slide-in animation
const slideIn = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

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
        overflow: 'hidden', // Add this to contain the sliding image
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
          zIndex: 1,
        },
        backgroundImage: `url(${duvdevanFlag})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Image Container */}
      <Fade in timeout={1000}>
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: { xs: '50%', md: '15%' },
            transform: { xs: 'translateX(-50%)', md: 'translateX(0)' },
            height: { xs: '50vh', md: '70vh' },
            zIndex: 2,
            animation: `${slideIn} 1.5s ease-out`,
            '& img': {
              height: '100%',
              width: 'auto',
              objectFit: 'contain',
            }
          }}
        >
          <img
            src={itayPic}
            alt="Itay"
            style={{ filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.5))' }}
          />
        </Box>
      </Fade>

      <Container 
        maxWidth="md" 
        sx={{ 
          position: 'relative',
          zIndex: 2,
          ml: { md: 'auto' },
          width: { md: '60%' }
        }}
      >
        <Typography 
          variant="h1" 
          component="h1" 
          color="white" 
          gutterBottom
          sx={{ textAlign: 'center' }}
        >
          לזכר איתי שלנו
        </Typography>
        <Typography 
          variant="h5" 
          color="white" 
          paragraph 
          sx={{ textAlign: 'center' }}
        >
          מקום לשתף זכרונות, סיפורים ולחגוג את חייו של איתי האהוב שלנו
        </Typography>
      </Container>
    </Box>
  );
};

export default WelcomeSection;
