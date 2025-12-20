import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

/**
 * YearNavigation - Fixed navigation component for the immersive timeline
 * 
 * Desktop: Vertical sidebar on the left with year markers
 * Mobile: Horizontal dots at the bottom of the screen
 * 
 * Features:
 * - Clickable year markers that scroll to corresponding section
 * - Active state highlighting based on current visible section
 * - Smooth hover animations
 * - RTL-friendly positioning
 */

const YearNavigation = ({ events, activeIndex, onYearClick }) => {
  return (
    <>
      {/* Desktop Navigation - Vertical sidebar */}
      <Box
        component="nav"
        aria-label="Timeline navigation"
        sx={{
          display: { xs: 'none', md: 'flex' },
          position: 'fixed',
          left: 32,
          top: '50%',
          transform: 'translateY(-50%)',
          flexDirection: 'column',
          gap: 2,
          zIndex: 100,
          padding: 2,
          borderRadius: 4,
          bgcolor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
        }}
      >
        {events.map((event, index) => (
          <YearMarker
            key={event.id}
            date={event.date}
            isActive={index === activeIndex}
            onClick={() => onYearClick(index)}
            layout="vertical"
          />
        ))}
      </Box>

      {/* Mobile Navigation - Horizontal bottom bar */}
      <Box
        component="nav"
        aria-label="Timeline navigation"
        sx={{
          display: { xs: 'flex', md: 'none' },
          position: 'fixed',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          flexDirection: 'row',
          gap: 1.5,
          zIndex: 100,
          padding: 1.5,
          borderRadius: 25,
          bgcolor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(10px)',
        }}
      >
        {events.map((event, index) => (
          <YearMarker
            key={event.id}
            date={event.date}
            isActive={index === activeIndex}
            onClick={() => onYearClick(index)}
            layout="horizontal"
          />
        ))}
      </Box>
    </>
  );
};

/**
 * YearMarker - Individual clickable year indicator
 * 
 * Shows as a dot with year label on hover (desktop) or just dot (mobile)
 */
const YearMarker = ({ date, isActive, onClick, layout }) => {
  // Extract year from date string (e.g., "2008 - 2011" -> "2008")
  const year = date.match(/\d{4}/)?.[0] || date;
  
  const isVertical = layout === 'vertical';
  
  return (
    <Box
      component={motion.button}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        cursor: 'pointer',
        background: 'none',
        border: 'none',
        padding: isVertical ? 1 : 0.5,
        borderRadius: 2,
        transition: 'all 0.3s ease',
        flexDirection: isVertical ? 'row' : 'column',
        '&:hover': {
          bgcolor: isVertical ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
        },
      }}
    >
      {/* Dot indicator */}
      <Box
        component={motion.div}
        animate={{
          scale: isActive ? 1 : 0.7,
          backgroundColor: isActive ? '#3B82F6' : 'rgba(255, 255, 255, 0.5)',
        }}
        transition={{ duration: 0.3 }}
        sx={{
          width: isVertical ? 12 : 10,
          height: isVertical ? 12 : 10,
          borderRadius: '50%',
          boxShadow: isActive ? '0 0 12px rgba(59, 130, 246, 0.6)' : 'none',
        }}
      />
      
      {/* Year label - only on desktop */}
      {isVertical && (
        <Typography
          component={motion.span}
          animate={{
            opacity: isActive ? 1 : 0.6,
            x: isActive ? 0 : -4,
          }}
          transition={{ duration: 0.3 }}
          sx={{
            fontSize: '0.85rem',
            fontWeight: isActive ? 700 : 500,
            color: isActive ? 'white' : 'rgba(255, 255, 255, 0.7)',
            minWidth: 50,
            textAlign: 'left',
          }}
        >
          {year}
        </Typography>
      )}
    </Box>
  );
};

export default YearNavigation;
