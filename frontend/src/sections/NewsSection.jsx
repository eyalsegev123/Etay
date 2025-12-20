import { Box, Container, Typography, Grid, useMediaQuery, useTheme } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import NewsCard from '../components/NewsCard';
import newsData from '../assets/data/news.json';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const NewsSection = () => {
  const news = newsData.news;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      id="news"
      component="section"
      sx={{
        py: { xs: 10, md: 14 },
        minHeight: { xs: '70vh', md: '80vh' },
        bgcolor: 'background.paper', // White
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        direction: 'rtl',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle background decoration - blue tinted */}
      <Box
        sx={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.04) 0%, transparent 70%)',
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
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.04) 0%, transparent 70%)',
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
              color: 'text.primary',
            }}
          >
            הסיפור שנשמע
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxWidth: '600px',
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.1rem' },
              lineHeight: 1.7,
              color: 'text.secondary',
            }}
          >
            הסיפור של איתי הגיע רחוק, נגע בלבבות רבים והותיר חותם בתקשורת הישראלית
          </Typography>
        </Box>

        {/* News Cards - Swiper for mobile, Grid for desktop */}
        {news.length > 0 ? (
          isMobile ? (
            <Box
              sx={{
                '& .swiper': {
                  pb: 5,
                },
                '& .swiper-pagination': {
                  bottom: 0,
                },
                '& .swiper-pagination-bullet': {
                  width: 10,
                  height: 10,
                  bgcolor: 'grey.300',
                  opacity: 1,
                  transition: 'all 0.3s ease',
                },
                '& .swiper-pagination-bullet-active': {
                  bgcolor: 'primary.main',
                  width: 24,
                  borderRadius: 5,
                },
              }}
            >
              <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                spaceBetween={16}
                slidesPerView={1}
                dir="rtl"
              >
                {news.map((item, index) => (
                  <SwiperSlide key={item.id}>
                    <NewsCard news={item} index={index} isMobile />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
          ) : (
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
          )
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
          sx={{
            textAlign: 'center',
            mt: { xs: 5, md: 7 },
            color: 'text.secondary',
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
