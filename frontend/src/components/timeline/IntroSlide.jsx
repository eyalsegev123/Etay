import { useMemo } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

/**
 * IntroSlide - Opening hero slide before the timeline begins
 * 
 * Features:
 * - Animated background stars
 * - Staggered text entrance animations
 * - Call-to-action with swipe hint
 */
const IntroSlide = ({ onStart }) => {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        background: `
          linear-gradient(
            135deg,
            #1a1a2e 0%,
            #16213e 50%,
            #0f3460 100%
          )
        `,
        overflow: 'hidden',
      }}
    >
      <BackgroundStars />

      <Container maxWidth="md" sx={{ textAlign: 'center', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Typography
            variant="overline"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: { xs: '0.9rem', md: '1rem' },
              letterSpacing: '0.2em',
              mb: 2,
              display: 'block',
            }}
          >
            מסע בזמן
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
              fontWeight: 700,
              color: 'white',
              mb: 3,
              lineHeight: 1.2,
              textShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
            }}
          >
            סיפור החיים של איתי
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Typography
            sx={{
              fontSize: { xs: '1.1rem', md: '1.3rem' },
              color: 'rgba(255, 255, 255, 0.8)',
              maxWidth: 500,
              mx: 'auto',
              lineHeight: 1.8,
              mb: 4,
            }}
          >
            החליקו לצדדים כדי לצאת למסע דרך הרגעים המשמעותיים בחייו של איתי
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Box
            onClick={onStart}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 2,
              cursor: 'pointer',
              color: 'rgba(255, 255, 255, 0.8)',
              transition: 'all 0.3s ease',
              '&:hover': {
                color: 'white',
                transform: 'translateX(-8px)',
              },
            }}
          >
            <Typography sx={{ fontSize: '1rem', fontWeight: 500 }}>
              התחל את המסע
            </Typography>
            <motion.div
              animate={{ x: [0, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowBackIosNewIcon sx={{ fontSize: 24 }} />
            </motion.div>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

/**
 * BackgroundStars - Animated star/particle effect
 */
const BackgroundStars = () => {
  const stars = useMemo(() => 
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 3,
      duration: Math.random() * 3 + 2,
    })),
    []
  );

  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {stars.map((star) => (
        <Box
          key={star.id}
          component={motion.div}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          sx={{
            position: 'absolute',
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            borderRadius: '50%',
            bgcolor: 'rgba(255, 255, 255, 0.8)',
          }}
        />
      ))}
    </Box>
  );
};

export default IntroSlide;
