import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MasonryGridGallery } from '../components/MasonryGridGallery';


const PhotosSection = () => {
  const navigate = useNavigate();

  return (
    <section id="photos" style={{ padding: '2rem 0', background: '#fff' }}>
      <Container maxWidth="lg">
        <Typography variant="h2" component="h2" textAlign="center" gutterBottom>
          רגע להיזכר בכל הרגעים היפים
        </Typography>

        <MasonryGridGallery />

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Button variant="contained" size="large" onClick={() => navigate('/photos')}>
            לעוד תמונות
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default PhotosSection;