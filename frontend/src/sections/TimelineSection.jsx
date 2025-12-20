import { useState, useEffect, useRef, useCallback } from 'react';
import { Box, Typography, Container, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { YearNavigation, TimelineScene } from '../components/timeline';
import timelineData from '../assets/data/timeline.json';

/**
 * TimelineSection - Immersive full-screen journey through Etay's life
 * 
 * Architecture:
 * - Full-viewport scroll-snap container
 * - Each life event is a cinematic "scene"
 * - Fixed year navigation for quick access
 * - Intersection Observer tracks active section
 * 
 * Mobile Considerations:
 * - Touch-optimized scroll snapping
 * - Bottom navigation bar on mobile
 * - Responsive layouts in child components
 */

const TimelineSection = () => {
  const events = timelineData.events;
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const sceneRefs = useRef([]);

  // Initialize refs array for scenes
  useEffect(() => {
    sceneRefs.current = sceneRefs.current.slice(0, events.length);
  }, [events.length]);

  /**
   * Scroll to a specific scene by index
   * Used by YearNavigation for click-to-jump functionality
   */
  const scrollToScene = useCallback((index) => {
    const scene = document.getElementById(`timeline-scene-${events[index].id}`);
    if (scene) {
      scene.scrollIntoView({ behavior: 'smooth' });
    }
  }, [events]);

  /**
   * Intersection Observer to track which scene is currently visible
   * Updates activeIndex for navigation highlighting
   */
  useEffect(() => {
    const observerOptions = {
      root: null, // viewport
      rootMargin: '-40% 0px -40% 0px', // Trigger when scene is in center 20%
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sceneId = entry.target.id;
          const index = events.findIndex(
            (e) => `timeline-scene-${e.id}` === sceneId
          );
          if (index !== -1) {
            setActiveIndex(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all scene elements
    events.forEach((event) => {
      const scene = document.getElementById(`timeline-scene-${event.id}`);
      if (scene) {
        observer.observe(scene);
      }
    });

    return () => observer.disconnect();
  }, [events]);

  return (
    <Box
      id="timeline"
      component="section"
      ref={containerRef}
      sx={{
        position: 'relative',
        // No scroll-snap on the container itself - let natural page scroll work
        // Each scene handles its own snap alignment
      }}
    >
      {/* Hero Intro Section */}
      <IntroSection onScrollDown={() => scrollToScene(0)} />

      {/* Timeline Scenes */}
      {events.map((event, index) => (
        <TimelineScene
          key={event.id}
          event={event}
          index={index}
          isActive={activeIndex === index}
        />
      ))}

      {/* Year Navigation - Fixed position */}
      <YearNavigation
        events={events}
        activeIndex={activeIndex}
        onYearClick={scrollToScene}
      />
    </Box>
  );
};

/**
 * IntroSection - Opening hero section before the timeline begins
 * 
 * Creates anticipation and invites users to scroll into the journey
 */
const IntroSection = ({ onScrollDown }) => {
  const [showScrollHint, setShowScrollHint] = useState(true);

  // Hide scroll hint after user starts scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollHint(false);
      } else {
        setShowScrollHint(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
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
        scrollSnapAlign: 'start',
        overflow: 'hidden',
      }}
    >
      {/* Animated background particles/stars effect */}
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
            }}
          >
            גלול למטה כדי לצאת למסע דרך הרגעים המשמעותיים בחייו של איתי
          </Typography>
        </motion.div>
      </Container>

      {/* Scroll Down Indicator */}
      <AnimatePresence>
        {showScrollHint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              bottom: 40,
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            <IconButton
              onClick={onScrollDown}
              sx={{
                color: 'white',
                animation: 'bounce 2s infinite',
                '@keyframes bounce': {
                  '0%, 20%, 50%, 80%, 100%': {
                    transform: 'translateY(0)',
                  },
                  '40%': {
                    transform: 'translateY(-10px)',
                  },
                  '60%': {
                    transform: 'translateY(-5px)',
                  },
                },
              }}
            >
              <KeyboardArrowDownIcon sx={{ fontSize: 40 }} />
            </IconButton>
            <Typography
              sx={{
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: '0.85rem',
                textAlign: 'center',
                mt: 1,
              }}
            >
              גלול למטה
            </Typography>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

/**
 * BackgroundStars - Subtle animated star/particle effect for intro
 */
const BackgroundStars = () => {
  // Generate random star positions
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 3,
    duration: Math.random() * 3 + 2,
  }));

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

export default TimelineSection;
