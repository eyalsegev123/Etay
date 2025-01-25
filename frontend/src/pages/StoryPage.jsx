import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Chip,
  IconButton,
  Skeleton,
  Fade,
  Divider,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';

const StoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchStory = async () => {
      try {
        setLoading(true);
        // Simulate API call
        const mockStory = {
          id: id,
          title: "A Beautiful Memory",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          author: "David Cohen",
          date: "2024-01-15",
          image: "https://picsum.photos/1200/600",
          location: "Tel Aviv, Israel",
          tags: ["Family", "Friendship", "Love"],
          additionalImages: [
            "https://picsum.photos/800/600",
            "https://picsum.photos/801/600",
          ]
        };
        
        setTimeout(() => {
          setStory(mockStory);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError("Failed to load story");
        setLoading(false);
      }
    };

    fetchStory();
  }, [id]);

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 12, textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Box 
      component="main"
      sx={{ 
        minHeight: '100vh',
        // Remove paddingTop since header is hidden
      }}
    >
      <Container maxWidth="md">
        {/* Back Button */}
        <IconButton 
          onClick={() => navigate(-1)} 
          sx={{ mt: 4, mb: 2 }}
          aria-label="back"
        >
          <ArrowBackIcon />
        </IconButton>

        {loading ? (
          // Loading skeleton
          <Box sx={{ mt: 4 }}>
            <Skeleton variant="rectangular" height={400} />
            <Skeleton variant="text" height={80} sx={{ mt: 2 }} />
            <Skeleton variant="text" height={30} width="60%" />
            <Skeleton variant="rectangular" height={200} sx={{ mt: 4 }} />
          </Box>
        ) : (
          <Fade in={!loading}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: { xs: 2, md: 4 },
                borderRadius: 2,
                overflow: 'hidden'
              }}
            >
              {/* Hero Image */}
              <Box
                component="img"
                src={story?.image}
                alt={story?.title}
                sx={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover',
                  borderRadius: 2,
                  mb: 4
                }}
              />

              {/* Title and Meta */}
              <Typography variant="h2" component="h1" gutterBottom>
                {story?.title}
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PersonIcon color="action" />
                  <Typography variant="subtitle1" color="text.secondary">
                    {story?.author}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CalendarTodayIcon color="action" />
                  <Typography variant="subtitle1" color="text.secondary">
                    {new Date(story?.date).toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>

              {/* Tags */}
              <Box sx={{ mb: 4 }}>
                {story?.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    sx={{ mr: 1, mb: 1 }}
                    size="small"
                  />
                ))}
              </Box>

              <Divider sx={{ mb: 4 }} />

              {/* Content */}
              <Typography variant="body1" paragraph>
                {story?.content}
              </Typography>

              {/* Additional Images */}
              {story?.additionalImages && (
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    More Photos
                  </Typography>
                  <Box 
                    sx={{ 
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                      gap: 2 
                    }}
                  >
                    {story.additionalImages.map((img, index) => (
                      <Box
                        key={index}
                        component="img"
                        src={img}
                        alt={`Additional photo ${index + 1}`}
                        sx={{
                          width: '100%',
                          height: '300px',
                          objectFit: 'cover',
                          borderRadius: 1,
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </Paper>
          </Fade>
        )}
      </Container>
    </Box>
  );
};

export default StoryPage;
