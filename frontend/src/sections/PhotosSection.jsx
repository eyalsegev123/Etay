import { Box, Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MasonryGridGallery } from '../components/MasonryGridGallery';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PhotosSection = () => {
  const navigate = useNavigate();

  return (
    <Box
      id="photos"
      component="section"
      sx={{
        py: { xs: 8, md: 10 },
        bgcolor: 'background.paper', // White for contrast
        position: 'relative',
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 4,
            flexDirection: 'row-reverse',
          }}
        >
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              fontWeight: 700,
              color: 'text.primary',
            }}
          >
            רגע להיזכר בכל הרגעים היפים
          </Typography>
          <Button 
            variant="contained" 
            size="medium" 
            onClick={() => navigate('/photos')}
            endIcon={<ArrowBackIcon />}
            sx={{
              px: 3,
            }}
          >
            לעוד תמונות
          </Button>
        </Box>

        {/* Gallery */}
        <MasonryGridGallery />
      </Container>
    </Box>
  );
};

export default PhotosSection;
