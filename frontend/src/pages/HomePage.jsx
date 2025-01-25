import { Box } from '@mui/material';
import WelcomeSection from '../sections/WelcomeSection';
import TimelineSection from '../sections/TimelineSection';
import PhotosSection from '../sections/PhotosSection';
import StoriesSection from '../sections/StoriesSection';
import ContactSection from '../sections/ContactSection';

const HomePage = () => {
  return (
    <Box component="main">
      <WelcomeSection />
      <TimelineSection />
      <PhotosSection />
      <StoriesSection />
      <ContactSection />
    </Box>
  );
};

export default HomePage;
