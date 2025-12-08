import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const StoryCard = ({ story }) => {
  const navigate = useNavigate();
  
  return (
    <Card 
      sx={{ 
        height: '100%',
        minHeight: '450px',
        display: 'flex',
        flexDirection: 'column',
        direction: 'rtl',
        bgcolor: 'background.paper',
        borderRadius: 4,
        overflow: 'hidden',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <CardMedia
          component="img"
          height="200"
          image={story.image}
          alt={story.title}
          sx={{
            transition: 'transform 0.4s ease',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        />
        {/* Subtle gradient overlay */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '50%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.3), transparent)',
            pointerEvents: 'none',
          }}
        />
      </Box>
      
      <CardContent 
        sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column',
          p: 3,
        }}
      >
        <Typography 
          gutterBottom 
          variant="h5" 
          component="h3" 
          sx={{ 
            textAlign: 'right',
            fontWeight: 600,
            color: 'text.primary',
            mb: 1.5,
          }}
        >
          {story.title}
        </Typography>
        
        <Typography 
          variant="body2" 
          paragraph 
          sx={{ 
            textAlign: 'right',
            color: 'text.secondary',
            lineHeight: 1.7,
            mb: 2,
          }}
        >
          {story.preview}
        </Typography>
        
        {/* Author */}
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 3, 
            justifyContent: 'flex-end',
            gap: 1,
          }}
        >
          <Typography 
            variant="subtitle2" 
            sx={{ 
              color: 'text.secondary',
              fontWeight: 500,
            }}
          >
            {story.author}
          </Typography>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              bgcolor: 'rgba(232, 90, 79, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <PersonIcon sx={{ fontSize: 18, color: 'primary.main' }} />
          </Box>
        </Box>
        
        {/* Read More Button */}
        <Button 
          variant="contained" 
          onClick={() => navigate(`/story/${story.id}`)}
          fullWidth
          endIcon={<ArrowBackIcon />}
          sx={{ 
            mt: 'auto',
            py: 1.25,
          }}
        >
          קרא עוד
        </Button>
      </CardContent>
    </Card>
  );
};

export default StoryCard;
