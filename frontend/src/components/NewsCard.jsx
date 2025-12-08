import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, keyframes } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

// Subtle floating animation
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
`;

const NewsCard = ({ news, index }) => {
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
        minHeight: '320px',
        display: 'flex',
        flexDirection: 'column',
        direction: 'rtl',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'visible',
        borderRadius: 4,
        bgcolor: 'background.paper',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        animation: `${float} ${4 + index * 0.5}s ease-in-out infinite`,
        animationDelay: `${index * 0.3}s`,
        '&:hover': {
          transform: 'translateY(-10px) scale(1.02)',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.12)',
          '& .external-icon': {
            opacity: 1,
            transform: 'translate(-4px, 4px)',
          },
          '& .card-media': {
            transform: 'scale(1.05)',
          }
        },
      }}
    >
      {/* External Link Icon */}
      <Box
        className="external-icon"
        sx={{
          position: 'absolute',
          top: 12,
          left: 12,
          zIndex: 2,
          bgcolor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '50%',
          p: 0.75,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0,
          transform: 'translate(0, 0)',
          transition: 'all 0.3s ease-in-out',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <OpenInNewIcon sx={{ fontSize: 18, color: 'primary.main' }} />
      </Box>

      {/* Channel Logo / Image Container */}
      <Box
        sx={{
          height: 120,
          overflow: 'hidden',
          bgcolor: 'background.default',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <CardMedia
          component="img"
          className="card-media"
          image={news.logoUrl}
          alt={news.channelName}
          sx={{
            height: '60%',
            width: 'auto',
            maxWidth: '70%',
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
        }}
      >
        {/* Channel Name Badge - Blue */}
        <Box
          sx={{
            alignSelf: 'flex-start',
            background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
            color: 'white',
            px: 1.5,
            py: 0.5,
            borderRadius: 2,
            mb: 1.5,
          }}
        >
          <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.75rem' }}>
            {news.channelName}
          </Typography>
        </Box>

        {/* Title */}
        <Typography 
          variant="h6" 
          component="h3" 
          sx={{ 
            textAlign: 'right',
            fontWeight: 600,
            fontSize: '1.1rem',
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
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.7,
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
            mt: 2,
            pt: 1.5,
            borderTop: '1px solid',
            borderColor: 'divider',
            gap: 0.5,
          }}
        >
          <Typography 
            variant="caption" 
            sx={{ color: 'text.secondary' }}
          >
            {formatDate(news.date)}
          </Typography>
          <CalendarTodayIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
