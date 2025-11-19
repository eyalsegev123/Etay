import { Paper, Box, Typography, IconButton, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const GalleryHeader = ({ onBack, statistics }) => {
  const { totalPhotos = 0 } = statistics || {};

  return (
    <Paper
      elevation={0}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 4,
        px: { xs: 3, md: 6 },
        py: { xs: 4, md: 6 },
        mb: 4,
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(25,118,210,0.95) 0%, rgba(21,101,192,0.85) 55%, rgba(13,71,161,0.8) 100%)',
          zIndex: 0,
        }}
      />
      <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, alignItems: { md: 'center' } }}>
        <IconButton 
          onClick={onBack} 
          aria-label="back"
          sx={{
            alignSelf: { xs: 'flex-start', md: 'center' },
            bgcolor: 'rgba(255,255,255,0.15)',
            color: 'white',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.3)'
            }
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h2" component="h1" sx={{ fontWeight: 600, mb: 1 }}>
            גלריית תמונות
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
            כל הרגעים של איתי במקום אחד – חפשו, ותנו לזיכרונות לחזור לחיים.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <GalleryHeaderStat label="תמונות" value={totalPhotos} />
          <Divider 
            flexItem 
            orientation="vertical" 
            sx={{ 
              borderColor: 'rgba(255,255,255,0.4)',
              display: { xs: 'none', md: 'block' }
            }} 
          />
        </Box>
      </Box>
    </Paper>
  );
};

const GalleryHeaderStat = ({ label, value }) => (
  <Box sx={{ textAlign: { xs: 'left', md: 'right' } }}>
    <Typography variant="h3" sx={{ fontWeight: 600, lineHeight: 1 }}>
      {value}
    </Typography>
    <Typography variant="body2">{label}</Typography>
  </Box>
);

export default GalleryHeader;

