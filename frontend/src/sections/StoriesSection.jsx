import { Box, Container, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
// Import Swiper modules correctly
import { Navigation as SwiperNavigation, Pagination as SwiperPagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const StoriesSection = () => {
  const navigate = useNavigate();
  
  // Enhanced stories data
  const stories = [
    {
      id: 1,
      title: "A Beautiful Memory",
      preview: "I remember when Itay...",
      author: "David Cohen",
      date: "2024-01-15",
      image: "https://picsum.photos/400/300",
      tags: ["Family", "Friendship"],
    },
    {
      id: 2,
      title: "Unforgettable Moments",
      preview: "One summer day...",
      author: "Sarah Levy",
      date: "2024-01-10",
      image: "https://picsum.photos/400/301",
      tags: ["Friends", "Adventure"],
    },
    // Add more stories as needed
  ];

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
          Stories & Memories
        </Typography>
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
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={story.image}
                  alt={story.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h3">
                    {story.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {story.preview}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <PersonIcon sx={{ fontSize: 20, mr: 1 }} color="action" />
                    <Typography variant="subtitle2" color="text.secondary">
                      {story.author}
                    </Typography>
                  </Box>
                  <Button 
                    variant="contained" 
                    onClick={() => navigate(`/story/${story.id}`)}
                    fullWidth
                    sx={{ mt: 'auto' }}
                  >
                    Read More
                  </Button>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
  );
};

export default StoriesSection;
