import { Box, Container, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import StoryCard from '../components/StoryCard';
// Import Swiper modules correctly
import { Navigation as SwiperNavigation, Pagination as SwiperPagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import storiesData from '../assets/data/stories.json';

const StoriesSection = () => {
  const stories = storiesData.stories;

  return (
    <Box 
      id="stories"
      component="section" 
      sx={{ 
        py: { xs: 12, md: 16 },
        minHeight: { xs: '80vh', md: '90vh' },
        bgcolor: 'grey.100',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        direction: 'rtl'
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          sx={{ textAlign: 'center', mb: 4 }}
        >
          סיפורים וזכרונות
        </Typography>
        
        {stories.length > 0 ? (
          <Swiper
            modules={[SwiperNavigation, SwiperPagination]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            dir="rtl"
            style={{ paddingBottom: '50px' }}
            breakpoints={{
              640: { slidesPerView: 2 },
              960: { slidesPerView: 3 },
            }}
          >
            {stories.map((story) => (
              <SwiperSlide key={story.id} style={{ height: 'auto', display: 'flex' }}>
                <StoryCard story={story} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6">אין סיפורים להצגה כרגע</Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default StoriesSection;
