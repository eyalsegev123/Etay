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
 * Used as a Swiper slide in horizontal timeline navigation.
 * 
 * Layout:
 * - Large hero image taking significant viewport space
 * - Overlaid content with title, date, description
 * - Entrance animations when slide becomes active
 * - Responsive design prioritizing mobile experience
 * 
 * Animations:
 * - Image has subtle Ken Burns (zoom) effect when active
 * - Content fades in with staggered timing
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
      delayChildren: 0.3,
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

const TimelineScene = ({ event, isActive }) => {
  const prefersReducedMotion = useReducedMotion();
  const IconComponent = iconMap[event.icon] || SchoolIcon;

  return (
    <Box
      id={`timeline-scene-${event.id}`}
      sx={{
        height: '100%',
        width: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
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
          height: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box
          component={motion.div}
          variants={prefersReducedMotion ? {} : containerVariants}
          initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'center',
            gap: { xs: 4, md: 8 },
            direction: 'rtl',
            width: '100%',
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
        : { scale: isActive ? 1.08 : 1 }
    }
    transition={{ duration: 10, ease: 'linear' }}
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
        filter: 'blur(3px)',
        transform: 'scale(1.15)', // Prevent blur edges from showing
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
          135deg,
          rgba(0, 0, 0, 0.7) 0%,
          rgba(0, 0, 0, 0.5) 50%,
          rgba(0, 0, 0, 0.7) 100%
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
        width: { xs: 56, md: 72 },
        height: { xs: 56, md: 72 },
        borderRadius: '50%',
        bgcolor: 'rgba(59, 130, 246, 0.9)',
        mb: 3,
        boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4)',
      }}
    >
      <IconComponent sx={{ fontSize: { xs: 28, md: 36 }, color: 'white' }} />
    </Box>

    {/* Date */}
    <Typography
      component={motion.p}
      variants={itemVariants}
      sx={{
        fontSize: { xs: '1rem', md: '1.2rem' },
        fontWeight: 600,
        color: 'rgba(255, 255, 255, 0.8)',
        mb: 1.5,
        letterSpacing: '0.08em',
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
        fontSize: { xs: '2rem', sm: '2.75rem', md: '3.5rem' },
        fontWeight: 700,
        color: 'white',
        mb: 3,
        lineHeight: 1.2,
        textShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
      }}
    >
      {event.title}
    </Typography>

    {/* Description */}
    <Typography
      component={motion.p}
      variants={itemVariants}
      sx={{
        fontSize: { xs: '1rem', md: '1.25rem' },
        color: 'rgba(255, 255, 255, 0.9)',
        lineHeight: 1.8,
        maxWidth: 480,
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
      flex: { xs: '0 0 auto', md: '0 1 45%' },
      width: '100%',
      maxWidth: { xs: 320, sm: 400, md: 480 },
    }}
  >
    <Box
      sx={{
        position: 'relative',
        borderRadius: 4,
        overflow: 'hidden',
        boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.6)',
        transform: 'rotate(-1deg)',
        transition: 'transform 0.5s ease',
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
          height: { xs: 220, sm: 280, md: 360 },
          objectFit: 'cover',
          display: 'block',
        }}
      />
      
      {/* Subtle frame effect */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          border: '3px solid rgba(255, 255, 255, 0.15)',
          borderRadius: 4,
          pointerEvents: 'none',
        }}
      />
    </Box>
  </Box>
);

export default TimelineScene;
