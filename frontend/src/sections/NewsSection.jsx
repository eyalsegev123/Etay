import { Box, Container, Typography, Grid } from '@mui/material';
import NewsCard from '../components/NewsCard';
import newsData from '../assets/data/news.json';

const NewsSection = () => {
  const news = newsData.news;

  return (
    <Box
      id="news"
      component="section"
      sx={{
        py: { xs: 10, md: 14 },
        minHeight: { xs: '70vh', md: '80vh' },
        bgcolor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        direction: 'rtl',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle background decoration */}
      <Box
        sx={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(25, 118, 210, 0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '-15%',
          left: '-10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(25, 118, 210, 0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '2.5rem' },
              mb: 2,
            }}
          >
            הסיפור שנשמע
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              maxWidth: '600px',
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.1rem' },
              lineHeight: 1.7,
            }}
          >
            הסיפור של איתי הגיע רחוק, נגע בלבבות רבים והותיר חותם בתקשורת הישראלית
          </Typography>
        </Box>

        {/* News Cards Grid */}
        {news.length > 0 ? (
          <Grid 
            container 
            spacing={4}
            sx={{
              justifyContent: 'center',
            }}
          >
            {news.map((item, index) => (
              <Grid 
                item 
                xs={12} 
                sm={6} 
                md={4} 
                key={item.id}
                sx={{
                  display: 'flex',
                }}
              >
                <NewsCard news={item} index={index} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary">
              אין כתבות להצגה כרגע
            </Typography>
          </Box>
        )}

        {/* Footer note */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            textAlign: 'center',
            mt: { xs: 5, md: 7 },
            opacity: 0.7,
            fontStyle: 'italic',
          }}
        >
          לחצו על כרטיס כדי לקרוא את הכתבה המלאה
        </Typography>
      </Container>
    </Box>
  );
};

export default NewsSection;
