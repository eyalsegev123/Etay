import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

/**
 * YearPagination - Clickable year dots navigation at bottom center
 * 
 * Features:
 * - Compact, centered design
 * - Click to jump to any year
 * - Active state highlighting
 * - Glassmorphism styling
 */
const YearPagination = ({ years, activeIndex, onYearClick, isVisible }) => {
  if (!isVisible) return null;

  return (
    <Box
      component={motion.nav}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      aria-label="Timeline navigation"
      sx={{
        position: 'absolute',
        bottom: { xs: 20, md: 32 },
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: { xs: 0.5, sm: 1, md: 1.5 },
          padding: { xs: '8px 16px', md: '10px 20px' },
          borderRadius: 30,
          bgcolor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(10px)',
        }}
      >
        {years.map((year, index) => (
          <YearDot
            key={index}
            year={year}
            isActive={index === activeIndex}
            onClick={() => onYearClick(index)}
          />
        ))}
      </Box>
    </Box>
  );
};

/**
 * YearDot - Individual year indicator button
 */
const YearDot = ({ year, isActive, onClick }) => (
  <Box
    component={motion.button}
    onClick={onClick}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 0.5,
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      padding: { xs: '4px 6px', md: '6px 8px' },
      minWidth: { xs: 36, md: 44 },
    }}
  >
    <Box
      component={motion.div}
      animate={{
        scale: isActive ? 1.2 : 1,
        backgroundColor: isActive ? '#3B82F6' : 'rgba(255, 255, 255, 0.4)',
      }}
      transition={{ duration: 0.3 }}
      sx={{
        width: 8,
        height: 8,
        borderRadius: '50%',
        boxShadow: isActive ? '0 0 10px rgba(59, 130, 246, 0.6)' : 'none',
      }}
    />
    
    <Typography
      component={motion.span}
      animate={{ opacity: isActive ? 1 : 0.5 }}
      transition={{ duration: 0.3 }}
      sx={{
        fontSize: { xs: '0.65rem', md: '0.75rem' },
        fontWeight: isActive ? 600 : 400,
        color: isActive ? 'white' : 'rgba(255, 255, 255, 0.6)',
      }}
    >
      {year}
    </Typography>
  </Box>
);

export default YearPagination;
