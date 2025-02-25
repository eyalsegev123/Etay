import { Box, Container, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';
import StoryCard from '../components/StoryCard';
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
    {
      id: 3,
      title: "A Day to Remember",
      preview: "It was a sunny afternoon...",
      author: "Michael Green",
      date: "2024-01-05",
      image: "https://picsum.photos/400/302",
      tags: ["Family", "Holiday"],
    },
    {
      id: 4,
      title: "Cherished Times",
      preview: "We laughed and played...",
      author: "Rachel Blue",
      date: "2024-01-02",
      image: "https://picsum.photos/400/303",
      tags: ["Friends", "Joy"],
    },
    {
      id: 5,
      title: "Memorable Adventures",
      preview: "Exploring the unknown...",
      author: "Tom White",
      date: "2024-01-01",
      image: "https://picsum.photos/400/304",
      tags: ["Adventure", "Travel"],
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
              <StoryCard story={story} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
  );
};

export default StoriesSection;
