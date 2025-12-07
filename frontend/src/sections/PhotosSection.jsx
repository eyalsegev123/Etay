import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MasonryGridGallery } from '../components/MasonryGridGallery';


const PhotosSection = () => {
  const navigate = useNavigate();

  return (
    <section id="photos" style={{ padding: '4rem 0 1rem', background: '#fff' }}> {/* Increased top padding for separation */}
      <Container maxWidth="lg">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '1.5rem',
          flexDirection: 'row-reverse' // Ensure RTL layout visually
        }}>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 700, margin: 0 }}>
            רגע להיזכר בכל הרגעים היפים
          </Typography>
          <Button variant="contained" size="medium" onClick={() => navigate('/photos')}>
            לעוד תמונות
          </Button>
        </div>

        <MasonryGridGallery />
      </Container>
    </section>
  );
};

export default PhotosSection;