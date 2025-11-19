import { useState, useEffect } from 'react';
import { Box, Container, Typography, CircularProgress, Alert } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import StoryCard from '../components/StoryCard';
// Import Swiper modules correctly
import { Navigation as SwiperNavigation, Pagination as SwiperPagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const StoriesSection = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Simple direct fetch from JSON file
    const fetchStories = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/stories.json');
        
        if (!response.ok) {
          throw new Error('Failed to fetch stories');
        }
        
        const data = await response.json();
        setStories(data.stories || []);
        setLoading(false);
      } catch (err) {
        console.error("Error loading stories:", err);
        setError("לא ניתן לטעון את הסיפורים. אנא נסה שוב מאוחר יותר.");
        setLoading(false);
      }
    };
    
    fetchStories();
  }, []);

  return (
    <Box 
      id="stories"
      component="section" 
      sx={{ 
        py: { xs: 12, md: 16 }, // Increased padding
        minHeight: { xs: '80vh', md: '90vh' }, // Added minimum height
        bgcolor: 'grey.100',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
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
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>
        ) : stories.length > 0 ? (
          <Swiper
            modules={[SwiperNavigation, SwiperPagination]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              960: { slidesPerView: 3 },
            }}
          >
            {stories.map((story) => (
              <SwiperSlide key={story.id}>
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
