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

// Fade in animation
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
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
        backgroundColor: '#1a1a1a',
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
          backgroundPosition: '50% 20%',
          animation: `${kenBurns} 20s ease-out infinite alternate`,
          zIndex: 0,
        }}
      />

      {/* Gradient Overlay - Warmer tone */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            linear-gradient(to bottom, 
              rgba(0,0,0,0.6) 0%, 
              rgba(0,0,0,0.1) 30%, 
              rgba(0,0,0,0.1) 50%, 
              rgba(45,55,72,0.85) 100%
            )
          `,
          zIndex: 1,
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '12%',
          left: 0,
          right: 0,
          zIndex: 2,
          textAlign: 'center',
          color: 'white',
          px: 3,
          animation: `${fadeIn} 1.2s ease-out`,
        }}
      >
        {/* Main Title */}
        <Typography 
          variant="h1" 
          component="h1" 
          sx={{ 
            fontFamily: '"Heebo", sans-serif',
            fontWeight: 700, 
            mb: 2,
            textShadow: '2px 4px 8px rgba(0,0,0,0.5)',
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
            letterSpacing: '-0.02em',
          }}
        >
          לזכר איתי אזולאי ז״ל
        </Typography>

        {/* Dates */}
        <Typography 
          variant="h4" 
          sx={{ 
            fontFamily: '"Frank Ruhl Libre", serif',
            fontWeight: 400, 
            opacity: 0.95,
            textShadow: '1px 2px 4px rgba(0,0,0,0.5)',
            mb: 3,
            letterSpacing: '3px',
            fontSize: { xs: '1.25rem', md: '1.75rem' },
          }}
        >
          1999 - 2024
        </Typography>

        {/* Decorative line */}
        <Box
          sx={{
            width: '60px',
            height: '3px',
            background: 'linear-gradient(90deg, #E85A4F, #FF7B6F)',
            mx: 'auto',
            borderRadius: '2px',
            boxShadow: '0 2px 8px rgba(232, 90, 79, 0.4)',
          }}
        />
      </Box>

      {/* Scroll Indicator */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: 0.7,
          cursor: 'pointer',
          transition: 'opacity 0.2s',
          '&:hover': {
            opacity: 1,
          },
        }}
        onClick={() => {
          document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <Typography 
          variant="body2" 
          sx={{ 
            mb: 0.5, 
            fontSize: '0.85rem',
            fontWeight: 500,
            letterSpacing: '1px',
          }}
        >
          גלול למטה
        </Typography>
        <KeyboardArrowDownIcon 
          sx={{ 
            fontSize: 36,
            animation: `${bounce} 2s infinite`,
          }} 
        />
      </Box>
    </Box>
  );
};

export default WelcomeSection;
