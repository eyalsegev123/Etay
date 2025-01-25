import { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  IconButton,
  Modal,
} from '@mui/material';
import { Masonry } from '@mui/lab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const allPhotos = [
  { src: '/assets/itay1.jpg', title: 'Itay 1' },
  { src: '/assets/itay2.jpg', title: 'Itay 2' },
  // ...add more photos
];

const PhotosPage = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <Box sx={{ minHeight: '100vh', pt: 2, pb: 8 }}>
      <Container maxWidth="xl">
        <IconButton 
          onClick={() => navigate(-1)} 
          sx={{ mb: 2 }}
          aria-label="back"
        >
          <ArrowBackIcon />
        </IconButton>

        <Typography variant="h2" component="h1" gutterBottom textAlign="center">
          גלריית תמונות
        </Typography>

        <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2}>
          {allPhotos.map((photo, index) => (
            <Box
              key={index}
              onClick={() => setSelectedImage(photo)}
              component="img"
              src={photo.src}
              alt={photo.title}
              sx={{
                width: '100%',
                borderRadius: 2,
                cursor: 'pointer',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.02)',
                }
              }}
            />
          ))}
        </Masonry>

        <Modal
          open={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            component="img"
            src={selectedImage?.src}
            alt={selectedImage?.title}
            sx={{
              maxHeight: '90vh',
              maxWidth: '90vw',
              objectFit: 'contain',
            }}
          />
        </Modal>
      </Container>
    </Box>
  );
};

export default PhotosPage;
