import { useState, useRef, useMemo } from 'react';
import { Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, EffectFade } from 'swiper/modules';

import TimelineScene from '../components/timeline/TimelineScene';
import IntroSlide from '../components/timeline/IntroSlide';
import NavigationArrows from '../components/timeline/NavigationArrows';
import YearPagination from '../components/timeline/YearPagination';
import ProgressIndicator from '../components/timeline/ProgressIndicator';
import timelineData from '../assets/data/timeline.json';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

/**
 * TimelineSection - Horizontal swiper journey through Etay's life
 * 
 * A full-viewport horizontal slider that presents life events as cinematic scenes.
 * 
 * Features:
 * - Swipe/drag navigation on mobile
 * - Arrow keys and click navigation on desktop
 * - Year dots for quick jumping between events
 * - Progress indicator showing current position
 * 
 * Architecture:
 * - IntroSlide: Opening hero with call-to-action
 * - TimelineScene: Individual event slides (imported from components)
 * - NavigationArrows: Left/right arrow buttons
 * - YearPagination: Clickable year dots
 * - ProgressIndicator: Current/total counter
 */

// Swiper configuration for optimal UX
const SWIPER_CONFIG = {
  modules: [Navigation, Pagination, Keyboard, EffectFade],
  speed: 600,
  spaceBetween: 0,
  slidesPerView: 1,
  keyboard: { enabled: true },
  allowTouchMove: true,
  grabCursor: true,
  // Allow vertical page scrolling while enabling horizontal swipes
  touchReleaseOnEdges: true,
  threshold: 10,
  touchAngle: 45,
  dir: 'rtl',
};

const TimelineSection = () => {
  const events = timelineData.events;
  const [activeIndex, setActiveIndex] = useState(-1); // -1 means intro slide
  const swiperRef = useRef(null);

  // Extract year labels for pagination
  const yearLabels = useMemo(
    () => events.map((event) => event.date.match(/\d{4}/)?.[0] || event.date),
    [events]
  );

  // Handle slide change - account for intro slide at index 0
  const handleSlideChange = (swiper) => {
    const eventIndex = swiper.activeIndex - 1; // -1 because intro is at 0
    setActiveIndex(eventIndex);
  };

  // Navigate to specific event slide (+1 to account for intro)
  const goToSlide = (eventIndex) => {
    swiperRef.current?.slideTo(eventIndex + 1);
  };

  const isViewingEvents = activeIndex >= 0;

  return (
    <Box
      id="timeline"
      component="section"
      sx={{
        height: '100vh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        touchAction: 'pan-y pinch-zoom',
      }}
    >
      <Swiper
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        onSlideChange={handleSlideChange}
        {...SWIPER_CONFIG}
        style={{ height: '100%', width: '100%' }}
      >
        {/* Intro Slide */}
        <SwiperSlide>
          <IntroSlide onStart={() => goToSlide(0)} />
        </SwiperSlide>

        {/* Event Slides */}
        {events.map((event, index) => (
          <SwiperSlide key={event.id}>
            <TimelineScene
              event={event}
              index={index}
              isActive={activeIndex === index}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Controls */}
      <NavigationArrows swiperRef={swiperRef} />

      <YearPagination
        years={yearLabels}
        activeIndex={activeIndex}
        onYearClick={goToSlide}
        isVisible={isViewingEvents}
      />

      <ProgressIndicator
        current={activeIndex + 1}
        total={events.length}
        isVisible={isViewingEvents}
      />
    </Box>
  );
};

export default TimelineSection;
