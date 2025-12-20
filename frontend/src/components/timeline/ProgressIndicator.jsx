import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

/**
 * ProgressIndicator - Shows current position in timeline (e.g., "2 / 6")
 * 
 * Features:
 * - Fixed position at top center
 * - Glassmorphism styling
 * - Only visible when past intro slide
 */
const ProgressIndicator = ({ current, total, isVisible }) => {
  if (!isVisible || current < 1) return null;

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      sx={{
        position: 'absolute',
        top: { xs: 16, md: 24 },
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        padding: '8px 16px',
        borderRadius: 20,
        bgcolor: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <Typography
        sx={{
          color: 'white',
          fontSize: { xs: '0.8rem', md: '0.9rem' },
          fontWeight: 500,
        }}
      >
        {current} / {total}
      </Typography>
    </Box>
  );
};

export default ProgressIndicator;
