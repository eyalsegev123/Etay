import { Box, Container, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import StoryCard from '../components/StoryCard';
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
        py: { xs: 10, md: 14 },
        minHeight: { xs: '80vh', md: '90vh' },
        bgcolor: 'background.default', // Warm cream
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        direction: 'rtl',
        position: 'relative',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          sx={{ 
            textAlign: 'center', 
            mb: 2,
            fontWeight: 700,
            color: 'text.primary',
          }}
        >
          סיפורים וזכרונות
        </Typography>
        
        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            mb: 6,
            color: 'text.secondary',
            maxWidth: '600px',
            mx: 'auto',
          }}
        >
          הסיפורים שמספרים את מי שהיה איתי, דרך עיניהם של אלו שהכירו אותו
        </Typography>
        
        {stories.length > 0 ? (
          <Swiper
            modules={[SwiperNavigation, SwiperPagination]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            dir="rtl"
            style={{ paddingBottom: '60px', paddingTop: '8px' }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 24 },
              960: { slidesPerView: 3, spaceBetween: 32 },
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
            <Typography variant="h6" color="text.secondary">
              אין סיפורים להצגה כרגע
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default StoriesSection;
