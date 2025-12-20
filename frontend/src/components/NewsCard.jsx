import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, keyframes } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

// Import news logos
import ynetLogo from '../assets/news_photos/ynet_logo.png';
import wallaLogo from '../assets/news_photos/walla_news.png';
import makoLogo from '../assets/news_photos/mako_logo.png';
import kanLogo from '../assets/news_photos/kan_hadashot.png';
import memorialLogo from '../assets/news_photos/memorial_website_logo.jpeg';
import podcastLogo from '../assets/news_photos/podcast_giborim_news_logo.jpeg';

// Subtle floating animation
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
`;

// Map channel names to logos and brand colors
const channelConfig = {
  'ynet': { logo: ynetLogo, color: '#FF0000', bgGradient: 'linear-gradient(135deg, #fff5f5 0%, #ffe3e3 100%)' },
  'וואלה! חדשות': { logo: wallaLogo, color: '#00A0DC', bgGradient: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' },
  'mako': { logo: makoLogo, color: '#E31E24', bgGradient: 'linear-gradient(135deg, #fef2f2 0%, #fecaca 100%)' },
  'כאן חדשות': { logo: kanLogo, color: '#1E3A8A', bgGradient: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)' },
  'אתר הנופלים': { logo: memorialLogo, color: '#1E40AF', bgGradient: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' },
  'פודקאסט גיבורים': { logo: podcastLogo, color: '#7C3AED', bgGradient: 'linear-gradient(135deg, #faf5ff 0%, #ede9fe 100%)' },
};

const NewsCard = ({ news, index, isMobile = false }) => {
  const config = channelConfig[news.channelName] || { logo: null, color: '#3B82F6', bgGradient: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)' };
  const handleClick = () => {
    if (news.articleUrl && news.articleUrl !== '#') {
      window.open(news.articleUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // Format date to Hebrew format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        height: '100%',
        minHeight: isMobile ? '320px' : '360px',
        display: 'flex',
        flexDirection: 'column',
        direction: 'rtl',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 4,
        bgcolor: 'background.paper',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        border: '1px solid',
        borderColor: 'rgba(0,0,0,0.04)',
        // Disable floating animation on mobile to prevent swiper conflicts
        ...(!isMobile && {
          animation: `${float} ${4 + index * 0.5}s ease-in-out infinite`,
          animationDelay: `${index * 0.3}s`,
        }),
        '&:hover': {
          transform: isMobile ? 'none' : 'translateY(-10px) scale(1.02)',
          boxShadow: isMobile ? '0 4px 20px rgba(0, 0, 0, 0.08)' : `0 20px 50px rgba(0, 0, 0, 0.15)`,
          borderColor: config.color,
          '& .external-icon': {
            opacity: isMobile ? 0 : 1,
            transform: isMobile ? 'translate(0, 0)' : 'translate(-4px, 4px)',
          },
          '& .card-media': {
            transform: isMobile ? 'none' : 'scale(1.08)',
          },
          '& .logo-container': {
            boxShadow: `0 8px 25px ${config.color}20`,
          }
        },
      }}
    >
      {/* External Link Icon */}
      <Box
        className="external-icon"
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          zIndex: 2,
          bgcolor: config.color,
          borderRadius: '50%',
          p: 0.75,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0,
          transform: 'translate(0, 0)',
          transition: 'all 0.3s ease-in-out',
          boxShadow: `0 4px 12px ${config.color}40`,
        }}
      >
        <OpenInNewIcon sx={{ fontSize: 16, color: 'white' }} />
      </Box>

      {/* Colored accent bar */}
      <Box
        sx={{
          height: 4,
          background: `linear-gradient(90deg, ${config.color} 0%, ${config.color}80 100%)`,
        }}
      />

      {/* Channel Logo */}
      <Box
        className="logo-container"
        sx={{
          height: 120,
          m: 2,
          mb: 1,
          borderRadius: 3,
          overflow: 'hidden',
          background: config.bgGradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          transition: 'all 0.4s ease-in-out',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
          border: '1px solid rgba(0,0,0,0.04)',
        }}
      >
        <CardMedia
          component="img"
          className="card-media"
          image={config.logo}
          alt={news.channelName}
          sx={{
            height: '75%',
            width: 'auto',
            maxWidth: '85%',
            objectFit: 'contain',
            transition: 'transform 0.4s ease-in-out',
          }}
        />
      </Box>

      {/* Content */}
      <CardContent 
        sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column',
          p: 2.5,
          pt: 1.5,
        }}
      >
        {/* Channel Badge */}
        <Box
          sx={{
            alignSelf: 'flex-start',
            bgcolor: `${config.color}15`,
            color: config.color,
            px: 1.5,
            py: 0.5,
            borderRadius: 2,
            mb: 1.5,
          }}
        >
          <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.7rem' }}>
            {news.channelName}
          </Typography>
        </Box>

        {/* Title */}
        <Typography 
          variant="h6" 
          component="h3" 
          sx={{ 
            textAlign: 'right',
            fontWeight: 700,
            fontSize: '1.05rem',
            lineHeight: 1.4,
            mb: 1,
            color: 'text.primary',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {news.title}
        </Typography>

        {/* Description */}
        <Typography 
          variant="body2" 
          sx={{ 
            textAlign: 'right',
            flexGrow: 1,
            color: 'text.secondary',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.6,
            fontSize: '0.85rem',
          }}
        >
          {news.description}
        </Typography>

        {/* Date */}
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'flex-end',
            mt: 'auto',
            pt: 1.5,
            gap: 0.5,
          }}
        >
          <Typography 
            variant="caption" 
            sx={{ color: config.color, fontWeight: 500 }}
          >
            {formatDate(news.date)}
          </Typography>
          <CalendarTodayIcon sx={{ fontSize: 14, color: config.color }} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
