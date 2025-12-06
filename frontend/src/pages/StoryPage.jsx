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
import {
  ArrowBack as ArrowBackIcon,
  CalendarToday as CalendarTodayIcon,
  Person as PersonIcon,
  LocationOn as LocationOnIcon,
} from '@mui/icons-material';
import storiesData from '../assets/data/stories.json';

// ==========================================
// Sub-components
// ==========================================

const StoryHeader = ({ title, author, date, location }) => (
  <>
    <Typography variant="h2" component="h1" gutterBottom sx={{ textAlign: 'right' }}>
      {title}
    </Typography>

    <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap', justifyContent: 'flex-start', direction: 'rtl' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="subtitle1" color="text.secondary">
          {author}
        </Typography>
        <PersonIcon color="action" />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="subtitle1" color="text.secondary">
          {new Date(date).toLocaleDateString('he-IL')}
        </Typography>
        <CalendarTodayIcon color="action" />
      </Box>
      {location && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="subtitle1" color="text.secondary">
            {location}
          </Typography>
          <LocationOnIcon color="action" />
        </Box>
      )}
    </Box>
  </>
);

const StoryTags = ({ tags }) => (
  <Box sx={{ mb: 4, direction: 'rtl', textAlign: 'right' }}>
    {tags.map((tag) => (
      <Chip
        key={tag}
        label={tag}
        sx={{ ml: 1, mb: 1 }}
        size="small"
      />
    ))}
  </Box>
);

const StoryContent = ({ content }) => (
  <Typography variant="body1" paragraph sx={{ 
    lineHeight: 1.8, 
    fontSize: '1.1rem', 
    whiteSpace: 'pre-line',
    textAlign: 'right',
    direction: 'rtl'
  }}>
    {content}
  </Typography>
);

const AdditionalImages = ({ images }) => {
  if (!images || images.length === 0) return null;
  
  return (
    <Box sx={{ mt: 4, direction: 'rtl' }}>
      <Typography variant="h6" gutterBottom sx={{ textAlign: 'right' }}>
        תמונות נוספות
      </Typography>
      <Box 
        sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 2 
        }}
      >
        {images.map((img, index) => (
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
  );
};

const RelatedStories = ({ stories, onNavigate }) => {
  if (!stories || stories.length === 0) return null;

  return (
    <Box sx={{ mt: 6, direction: 'rtl' }}>
      <Divider sx={{ mb: 4 }} />
      <Typography variant="h5" gutterBottom sx={{ textAlign: 'right' }}>
        סיפורים קשורים
      </Typography>
      <Box 
        sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
          gap: 3
        }}
      >
        {stories.map((story) => (
          <Paper 
            key={story.id}
            elevation={2}
            sx={{ 
              borderRadius: 2,
              overflow: 'hidden',
              transition: 'transform 0.2s, box-shadow 0.2s',
              direction: 'rtl',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6
              },
              cursor: 'pointer'
            }}
            onClick={() => onNavigate(story.id)}
          >
            <Box
              component="img"
              src={story.image}
              alt={story.title}
              sx={{
                width: '100%',
                height: '160px',
                objectFit: 'cover'
              }}
            />
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ textAlign: 'right' }}>
                {story.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1, textAlign: 'right' }}>
                מאת {story.author}
              </Typography>
              <Typography variant="body2" noWrap sx={{ textAlign: 'right' }}>
                {story.preview}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

const LoadingSkeleton = () => (
  <Box sx={{ mt: 4 }}>
    <Skeleton variant="rectangular" height={400} />
    <Skeleton variant="text" height={80} sx={{ mt: 2 }} />
    <Skeleton variant="text" height={30} width="60%" />
    <Skeleton variant="rectangular" height={200} sx={{ mt: 4 }} />
  </Box>
);

const ErrorState = ({ error, onBack }) => (
  <Container maxWidth="md" sx={{ mt: 12, textAlign: 'center', direction: 'rtl' }}>
    <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
    <Button 
      variant="contained" 
      endIcon={<ArrowBackIcon />}
      onClick={onBack}
    >
      חזרה לסיפורים
    </Button>
  </Container>
);

// ==========================================
// Main Component
// ==========================================

const StoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedStories, setRelatedStories] = useState([]);

  useEffect(() => {
    const loadStory = () => {
      try {
        setLoading(true);
        setError(null);
        
        const stories = storiesData.stories || [];
        const storyData = stories.find(s => s.id === parseInt(id));
        
        if (!storyData) throw new Error('Story not found');
        
        setStory(storyData);
        
        const related = stories
          .filter(s => s.id !== parseInt(id))
          .filter(s => s.tags.some(tag => storyData.tags.includes(tag)))
          .slice(0, 3);
        
        setRelatedStories(related);
        setLoading(false);
      } catch (err) {
        console.error("Error loading story:", err);
        setError("לא ניתן לטעון את הסיפור הזה. ייתכן שהוא הוסר או אינו זמין באופן זמני.");
        setLoading(false);
      }
    };

    loadStory();
    window.scrollTo(0, 0);
  }, [id]);

  const handleBackToStories = () => {
    navigate('/');
    
    // Photos are now cached, so we can use a shorter delay
    setTimeout(() => {
      const element = document.getElementById('stories');
      if (element) {
        const headerHeight = 64;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = window.pageYOffset + elementPosition - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }, 200);
  };

  if (error) return <ErrorState error={error} onBack={handleBackToStories} />;

  return (
    <Box component="main" sx={{ minHeight: '100vh', py: 4, direction: 'rtl' }}>
      <Container maxWidth="md">
        <IconButton 
          onClick={handleBackToStories} 
          sx={{ mb: 2 }}
          aria-label="back"
        >
          <ArrowBackIcon />
        </IconButton>

        {loading ? (
          <LoadingSkeleton />
        ) : (
          <Fade in={!loading}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: { xs: 2, md: 4 },
                borderRadius: 2,
                overflow: 'hidden',
                direction: 'rtl'
              }}
            >
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

              <StoryHeader 
                title={story?.title}
                author={story?.author}
                date={story?.date}
                location={story?.location}
              />

              <StoryTags tags={story?.tags} />
              
              <Divider sx={{ mb: 4 }} />
              
              <StoryContent content={story?.content} />
              
              <AdditionalImages images={story?.additionalImages} />
              
              <RelatedStories 
                stories={relatedStories} 
                onNavigate={(id) => {
                  navigate(`/story/${id}`);
                  window.scrollTo(0, 0);
                }}
              />
            </Paper>
          </Fade>
        )}
      </Container>
    </Box>
  );
};

export default StoryPage;
