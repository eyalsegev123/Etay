import { Box, Typography, keyframes } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import welcomePic from '../assets/boat_photo_etay_better_asspect_ratio.jpeg';

// Animation for the background zoom (Ken Burns effect)
const kenBurns = keyframes`
  0% { transform: scale(1); }
  100% { transform: scale(1.1); }
`;

// Animation for the scroll indicator
const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
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
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#000',
      }}
    >
      {/* Background Image with Animation */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${welcomePic})`,
          backgroundSize: 'cover',
          backgroundPosition: '50% 20%', // Adjusted for standing portrait to show face/upper body
          animation: `${kenBurns} 20s ease-out infinite alternate`,
          zIndex: 0,
        }}
      />

      {/* Dark Overlay - Gradient at Top (for Header) and Bottom (for Title) */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            linear-gradient(to bottom, 
              rgba(0,0,0,0.7) 0%, 
              rgba(0,0,0,0) 20%, 
              rgba(0,0,0,0) 60%, 
              rgba(0,0,0,0.8) 100%
            )
          `,
          zIndex: 1,
        }}
      />

      {/* Content - Moved to bottom to clear the face */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          left: 0,
          right: 0,
          zIndex: 2,
          textAlign: 'center',
          color: 'white',
          px: 2,
        }}
      >
        <Typography 
          variant="h2" 
          component="h1" 
          sx={{ 
            fontWeight: 700, 
            mb: 1,
            textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
            fontSize: { xs: '2.5rem', md: '4.5rem' }
          }}
        >
          לזכר איתי אזולאי ז״ל
        </Typography>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 300, 
            opacity: 0.95,
            textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
            mb: 4,
            letterSpacing: '2px'
          }}
        >
          1999 - 2024
        </Typography>
      </Box>

      {/* Scroll Indicator */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: 0.8,
          cursor: 'pointer',
        }}
        onClick={() => {
          document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <Typography variant="body2" sx={{ mb: 1, fontSize: '0.9rem' }}>גלול למטה</Typography>
        <KeyboardArrowDownIcon 
          sx={{ 
            fontSize: 40,
            animation: `${bounce} 2s infinite`
          }} 
        />
      </Box>
    </Box>
  );
};

export default WelcomeSection;
