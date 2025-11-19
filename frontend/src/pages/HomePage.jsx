import { Box } from '@mui/material';
import WelcomeSection from '../sections/WelcomeSection';
import TimelineSection from '../sections/TimelineSection';
import PhotosSection from '../sections/PhotosSection';
import StoriesSection from '../sections/StoriesSection';
import ContactSection from '../sections/ContactSection';
import HomePageHeader from '../components/HomePageHeader';

const HomePage = () => {
  return (
    <Box component="main">
      <HomePageHeader />
      <WelcomeSection />
      <TimelineSection />
      <PhotosSection />
      <StoriesSection />
      <ContactSection />
    </Box>
  );
};

export default HomePage;
