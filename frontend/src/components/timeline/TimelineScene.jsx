import { Box, Typography, Container } from '@mui/material';
import { motion, useReducedMotion } from 'framer-motion';
import SchoolIcon from '@mui/icons-material/School';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import FlightIcon from '@mui/icons-material/Flight';
import WorkIcon from '@mui/icons-material/Work';

/**
 * TimelineScene - Full-viewport cinematic scene for a single life event
 * 
 * Layout:
 * - Large hero image taking significant viewport space
 * - Overlaid content with title, date, description
 * - Scroll-triggered entrance animations
 * - Responsive design prioritizing mobile experience
 * 
 * Animations:
 * - Image has subtle Ken Burns (zoom) effect
 * - Content fades up with staggered timing
 * - Respects user's reduced motion preferences
 */

// Icon mapping for different life chapter types
const iconMap = {
  School: SchoolIcon,
  MilitaryTech: MilitaryTechIcon,
  ChildCare: ChildCareIcon,
  Flight: FlightIcon,
  Work: WorkIcon,
};

// Animation variants for staggered content entrance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth feel
    },
  },
};

const TimelineScene = ({ event, isActive, index }) => {
  const prefersReducedMotion = useReducedMotion();
  const IconComponent = iconMap[event.icon] || SchoolIcon;
  
  // Alternate layout direction for visual variety (odd/even)
  const isReversed = index % 2 === 1;

  return (
    <Box
      id={`timeline-scene-${event.id}`}
      component="section"
      sx={{
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
        overflow: 'hidden',
      }}
    >
      {/* Background Image with Ken Burns effect */}
      <BackgroundImage 
        src={event.image} 
        alt={event.title}
        isActive={isActive}
        prefersReducedMotion={prefersReducedMotion}
      />

      {/* Dark gradient overlay for text readability */}
      <GradientOverlay />

      {/* Content */}
      <Container 
        maxWidth="lg" 
        sx={{ 
          position: 'relative', 
          zIndex: 2,
          py: { xs: 4, md: 0 },
        }}
      >
        <Box
          component={motion.div}
          variants={prefersReducedMotion ? {} : containerVariants}
          initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
          sx={{
            display: 'flex',
            flexDirection: { 
              xs: 'column', 
              md: isReversed ? 'row-reverse' : 'row' 
            },
            alignItems: { xs: 'center', md: 'center' },
            justifyContent: 'space-between',
            gap: { xs: 4, md: 8 },
            direction: 'rtl',
          }}
        >
          {/* Text Content Side */}
          <ContentBlock 
            event={event}
            IconComponent={IconComponent}
            itemVariants={prefersReducedMotion ? {} : itemVariants}
          />

          {/* Featured Image Card */}
          <ImageCard 
            event={event}
            itemVariants={prefersReducedMotion ? {} : itemVariants}
          />
        </Box>
      </Container>
    </Box>
  );
};

/**
 * BackgroundImage - Full-screen background with Ken Burns animation
 */
const BackgroundImage = ({ src, alt, isActive, prefersReducedMotion }) => (
  <Box
    component={motion.div}
    animate={
      prefersReducedMotion 
        ? {} 
        : { scale: isActive ? 1.05 : 1 }
    }
    transition={{ duration: 8, ease: 'linear' }}
    sx={{
      position: 'absolute',
      inset: 0,
      zIndex: 0,
    }}
  >
    <Box
      component="img"
      src={src}
      alt={alt}
      sx={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        filter: 'blur(2px)',
        transform: 'scale(1.1)', // Prevent blur edges from showing
      }}
    />
  </Box>
);

/**
 * GradientOverlay - Dark gradient for text readability
 */
const GradientOverlay = () => (
  <Box
    sx={{
      position: 'absolute',
      inset: 0,
      zIndex: 1,
      background: `
        linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.3) 0%,
          rgba(0, 0, 0, 0.6) 50%,
          rgba(0, 0, 0, 0.8) 100%
        )
      `,
    }}
  />
);

/**
 * ContentBlock - Text content with icon, date, title, description
 */
const ContentBlock = ({ event, IconComponent, itemVariants }) => (
  <Box
    sx={{
      flex: { xs: '1 1 auto', md: '0 1 50%' },
      textAlign: { xs: 'center', md: 'right' },
      maxWidth: { xs: '100%', md: 500 },
    }}
  >
    {/* Icon Badge */}
    <Box
      component={motion.div}
      variants={itemVariants}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 64,
        height: 64,
        borderRadius: '50%',
        bgcolor: 'rgba(59, 130, 246, 0.9)',
        mb: 3,
        boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4)',
      }}
    >
      <IconComponent sx={{ fontSize: 32, color: 'white' }} />
    </Box>

    {/* Date */}
    <Typography
      component={motion.p}
      variants={itemVariants}
      sx={{
        fontSize: { xs: '1rem', md: '1.1rem' },
        fontWeight: 600,
        color: 'rgba(255, 255, 255, 0.8)',
        mb: 1,
        letterSpacing: '0.05em',
      }}
    >
      {event.date}
    </Typography>

    {/* Title */}
    <Typography
      component={motion.h2}
      variants={itemVariants}
      variant="h2"
      sx={{
        fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
        fontWeight: 700,
        color: 'white',
        mb: 3,
        lineHeight: 1.2,
        textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      }}
    >
      {event.title}
    </Typography>

    {/* Description */}
    <Typography
      component={motion.p}
      variants={itemVariants}
      sx={{
        fontSize: { xs: '1rem', md: '1.2rem' },
        color: 'rgba(255, 255, 255, 0.9)',
        lineHeight: 1.8,
        maxWidth: 450,
        mx: { xs: 'auto', md: 0 },
        mr: { md: 0 },
      }}
    >
      {event.description}
    </Typography>
  </Box>
);

/**
 * ImageCard - Featured image in a styled card
 */
const ImageCard = ({ event, itemVariants }) => (
  <Box
    component={motion.div}
    variants={itemVariants}
    sx={{
      flex: { xs: '1 1 auto', md: '0 1 45%' },
      width: '100%',
      maxWidth: { xs: 400, md: 500 },
    }}
  >
    <Box
      sx={{
        position: 'relative',
        borderRadius: 4,
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        transform: 'rotate(-2deg)',
        transition: 'transform 0.4s ease',
        '&:hover': {
          transform: 'rotate(0deg) scale(1.02)',
        },
      }}
    >
      <Box
        component="img"
        src={event.image}
        alt={event.title}
        sx={{
          width: '100%',
          height: { xs: 250, sm: 300, md: 350 },
          objectFit: 'cover',
          display: 'block',
        }}
      />
      
      {/* Subtle frame effect */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          border: '4px solid rgba(255, 255, 255, 0.2)',
          borderRadius: 4,
          pointerEvents: 'none',
        }}
      />
    </Box>
  </Box>
);

export default TimelineScene;
