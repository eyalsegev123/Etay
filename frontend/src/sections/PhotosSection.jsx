import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Import all images
import pic1 from '../assets/PhotosSectionPictures/etaypic-photosection1.PNG';
import pic2 from '../assets/PhotosSectionPictures/etaypic-photosection2.PNG';
import pic3 from '../assets/PhotosSectionPictures/etaypic-photosection3.PNG';
import pic4 from '../assets/PhotosSectionPictures/etaypic-photosection4.PNG';
import pic5 from '../assets/PhotosSectionPictures/etaypic-photosection5.JPG';
import pic6 from '../assets/PhotosSectionPictures/etaypic-photosection6.JPG';
import pic7 from '../assets/PhotosSectionPictures/etaypic-photosection7.jpg';
import pic8 from '../assets/PhotosSectionPictures/etaypic-photosection8.jpg';
import pic9 from '../assets/PhotosSectionPictures/etaypic-photosection9.PNG';
import pic10 from '../assets/PhotosSectionPictures/etaypic-photosection10.PNG';
import pic11 from '../assets/PhotosSectionPictures/etaypic-photosection11.PNG';

const photos = [
    [
        { src: pic1, alt: 'Itay 1' },
        { src: pic2, alt: 'Itay 2' },
        { src: pic3, alt: 'Itay 3' },
    ],
    [
        { src: pic4, alt: 'Itay 4' },
        { src: pic5, alt: 'Itay 5' },
        { src: pic6, alt: 'Itay 6' },
    ],
    [
        { src: pic7, alt: 'Itay 7' },
        { src: pic8, alt: 'Itay 8' },
        { src: pic9, alt: 'Itay 9' },
    ],
    [
        { src: pic10, alt: 'Itay 10' },
        { src: pic11, alt: 'Itay 11' },
    ],
];

const PhotosSection = () => {
  const navigate = useNavigate();

  return (
    <Box 
      id="photos" 
      component="section" 
      sx={{ 
        py: 8,
        backgroundColor: 'background.default' 
      }}
    >
      <Container maxWidth="lg">
        <Typography 
          variant="h2" 
          component="h2" 
          textAlign="center" 
          gutterBottom
        >
          תמונות
        </Typography>
        
        <Grid container spacing={2}>
          {photos.map((column, columnIndex) => (
            <Grid item xs={6} md={3} key={columnIndex}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {column.map((photo, photoIndex) => (
                  <Box
                    key={photoIndex}
                    sx={{
                      width: '100%',
                      paddingTop: '100%', // This creates a 1:1 aspect ratio
                      position: 'relative',
                      borderRadius: 2,
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      component="img"
                      src={photo.src}
                      alt={photo.alt}
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.02)',
                        },
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button 
            variant="contained" 
            size="large"
            onClick={() => navigate('/photos')}
          >
            לעוד תמונות
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default PhotosSection;