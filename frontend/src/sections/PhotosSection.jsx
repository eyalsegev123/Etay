import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MasonryGridGallery } from '../components/MasonryGridGallery';


const PhotosSection = () => {
  const navigate = useNavigate();

  return (
    <section id="photos" style={{ padding: '2rem 0', background: '#fff' }}>
      <Container maxWidth="lg">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '2rem',
          flexDirection: 'row-reverse' // Ensure RTL layout visually
        }}>
          <Typography variant="h2" component="h2" gutterBottom style={{ margin: 0 }}>
            רגע להיזכר בכל הרגעים היפים
          </Typography>
          <Button variant="contained" size="large" onClick={() => navigate('/photos')}>
            לעוד תמונות
          </Button>
        </div>

        <MasonryGridGallery />
      </Container>
    </section>
  );
};

export default PhotosSection;