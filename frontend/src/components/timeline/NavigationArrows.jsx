import { IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

/**
 * NavigationArrows - Custom styled prev/next arrows for the timeline swiper
 * 
 * Features:
 * - Positioned at left/right edges (RTL aware)
 * - Hidden on mobile (swipe is primary)
 * - Hover effects with scale and color change
 */

const ARROW_STYLES = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 50,
  color: 'white',
  bgcolor: 'rgba(0, 0, 0, 0.3)',
  backdropFilter: 'blur(8px)',
  width: { xs: 40, md: 56 },
  height: { xs: 40, md: 56 },
  opacity: { xs: 0.9, md: 0.6 },
  transition: 'all 0.3s ease',
  '&:hover': {
    bgcolor: 'rgba(59, 130, 246, 0.8)',
    opacity: 1,
    transform: 'translateY(-50%) scale(1.1)',
  },
  display: { xs: 'none', sm: 'flex' },
};

const NavigationArrows = ({ swiperRef }) => {
  const handlePrev = () => swiperRef.current?.slidePrev();
  const handleNext = () => swiperRef.current?.slideNext();

  return (
    <>
      {/* Next Arrow (Left side in RTL) */}
      <IconButton
        onClick={handleNext}
        aria-label="Next slide"
        sx={{ ...ARROW_STYLES, left: { xs: 8, md: 24 } }}
      >
        <ArrowBackIosNewIcon sx={{ fontSize: { xs: 20, md: 28 } }} />
      </IconButton>

      {/* Prev Arrow (Right side in RTL) */}
      <IconButton
        onClick={handlePrev}
        aria-label="Previous slide"
        sx={{ ...ARROW_STYLES, right: { xs: 8, md: 24 } }}
      >
        <ArrowForwardIosIcon sx={{ fontSize: { xs: 20, md: 28 } }} />
      </IconButton>
    </>
  );
};

export default NavigationArrows;
