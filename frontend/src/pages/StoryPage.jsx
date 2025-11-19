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
  Button,
  Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const StoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedStories, setRelatedStories] = useState([]);

  useEffect(() => {
    // Fetch directly from JSON
    const fetchStoryData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get all stories from JSON file
        const response = await fetch('/data/stories.json');
        
        if (!response.ok) {
          throw new Error('Failed to fetch stories');
        }
        
        const data = await response.json();
        const stories = data.stories || [];
        
        // Find the story with matching ID
        const storyData = stories.find(s => s.id === parseInt(id));
        
        if (!storyData) {
          throw new Error('Story not found');
        }
        
        setStory(storyData);
        
        // Find related stories (those that share tags with the current story)
        const related = stories
          .filter(s => s.id !== parseInt(id)) // Exclude current story
          .filter(s => s.tags.some(tag => storyData.tags.includes(tag))) // Must share at least one tag
          .slice(0, 3); // Limit to 3 stories
        
        setRelatedStories(related);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching story:", err);
        setError("לא ניתן לטעון את הסיפור הזה. ייתכן שהוא הוסר או אינו זמין באופן זמני.");
        setLoading(false);
      }
    };

    fetchStoryData();
    // Scroll to top when component mounts or ID changes
    window.scrollTo(0, 0);
  }, [id]);

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 12, textAlign: 'center' }}>
        <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
        <Button 
          variant="contained" 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate(-1)}
        >
          חזרה
        </Button>
      </Container>
    );
  }

  return (
    <Box 
      component="main"
      sx={{ 
        minHeight: '100vh',
        py: 4,
      }}
    >
      <Container maxWidth="md">
        {/* Back Button */}
        <IconButton 
          onClick={() => navigate(-1)} 
          sx={{ mb: 2 }}
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
                    {new Date(story?.date).toLocaleDateString('he-IL')}
                  </Typography>
                </Box>
                {story?.location && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationOnIcon color="action" />
                    <Typography variant="subtitle1" color="text.secondary">
                      {story?.location}
                    </Typography>
                  </Box>
                )}
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

              {/* Content - preserve line breaks */}
              <Typography variant="body1" paragraph sx={{ 
                lineHeight: 1.8, 
                fontSize: '1.1rem', 
                whiteSpace: 'pre-line'  // This preserves line breaks in the content
              }}>
                {story?.content}
              </Typography>

              {/* Additional Images */}
              {story?.additionalImages && story.additionalImages.length > 0 && (
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    תמונות נוספות
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
                        alt={`תמונה נוספת ${index + 1}`}
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

              {/* Related Stories */}
              {relatedStories.length > 0 && (
                <Box sx={{ mt: 6 }}>
                  <Divider sx={{ mb: 4 }} />
                  <Typography variant="h5" gutterBottom>
                    סיפורים קשורים
                  </Typography>
                  <Box 
                    sx={{ 
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
                      gap: 3
                    }}
                  >
                    {relatedStories.map((relatedStory) => (
                      <Paper 
                        key={relatedStory.id}
                        elevation={2}
                        sx={{ 
                          borderRadius: 2,
                          overflow: 'hidden',
                          transition: 'transform 0.2s, box-shadow 0.2s',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: 6
                          },
                          cursor: 'pointer'
                        }}
                        onClick={() => {
                          navigate(`/story/${relatedStory.id}`);
                          // Scroll to top when navigating to a new story
                          window.scrollTo(0, 0);
                        }}
                      >
                        <Box
                          component="img"
                          src={relatedStory.image}
                          alt={relatedStory.title}
                          sx={{
                            width: '100%',
                            height: '160px',
                            objectFit: 'cover'
                          }}
                        />
                        <Box sx={{ p: 2 }}>
                          <Typography variant="h6" gutterBottom>
                            {relatedStory.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            מאת {relatedStory.author}
                          </Typography>
                          <Typography variant="body2" noWrap>
                            {relatedStory.preview}
                          </Typography>
                        </Box>
                      </Paper>
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
