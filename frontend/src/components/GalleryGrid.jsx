import { Paper, Box, Typography, CircularProgress } from '@mui/material';
import { Masonry } from '@mui/lab';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';

const GalleryGrid = ({ photos, onSelectPhoto }) => (
  <Paper elevation={0} sx={{ p: { xs: 1, md: 2 }, borderRadius: 3, background: 'transparent' }}>
    <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2}>
      {photos.map((photo) => (
        <Box
          key={photo.id}
          onClick={() => onSelectPhoto(photo)}
          sx={{
            position: 'relative',
            borderRadius: 3,
            overflow: 'hidden',
            cursor: 'pointer',
            boxShadow: '0 20px 45px rgba(15, 30, 50, 0.12)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'translateY(-6px)',
              boxShadow: '0 30px 60px rgba(15, 30, 50, 0.2)',
              '& .photo-info': {
                opacity: 1,
              }
            }
          }}
        >
          <Box
            component="img"
            src={photo.thumbnailSrc || photo.src}
            alt={photo.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            sx={{
              width: '100%',
              height: 'auto',
              display: 'block',
              objectFit: 'cover'
            }}
          />
          <Box 
            className="photo-info"
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              bgcolor: 'rgba(0, 0, 0, 0.65)',
              color: 'white',
              p: 2,
              opacity: 0,
              transition: 'opacity 0.3s ease',
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{photo.title}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
              <Typography variant="body2">{photo.category || 'ללא קטגוריה'}</Typography>
              <Typography variant="body2">{photo.year}</Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </Masonry>
  </Paper>
);

export const GalleryLoading = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', p: 8 }}>
    <CircularProgress sx={{ mb: 2 }} />
    <Typography variant="subtitle1">טוען תמונות מ-Google Drive...</Typography>
  </Box>
);

export const GalleryEmptyState = () => (
  <Paper
    variant="outlined"
    sx={{
      textAlign: 'center',
      py: 8,
      borderRadius: 3,
      backgroundColor: 'rgba(255,255,255,0.8)'
    }}
  >
    <ImageSearchIcon sx={{ fontSize: 56, color: 'text.secondary', mb: 2 }} />
    <Typography variant="h5" sx={{ mb: 1 }}>לא נמצאו תמונות מתאימות</Typography>
    <Typography variant="body1" color="text.secondary">
      הוסף תמונות חדשות בגוגל דרייב כדי לראות אותן כאן.
    </Typography>
  </Paper>
);

export default GalleryGrid;

