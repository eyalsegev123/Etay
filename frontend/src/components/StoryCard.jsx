import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
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
        transition: 'transform 0.2s',
        direction: 'rtl',
        '&:hover': {
          transform: 'translateY(-4px)',
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={story.image}
        alt={story.title}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography gutterBottom variant="h5" component="h3" sx={{ textAlign: 'right' }}>
          {story.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph sx={{ textAlign: 'right' }}>
          {story.preview}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'flex-end' }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mr: 1 }}>
            {story.author}
          </Typography>
          <PersonIcon sx={{ fontSize: 20 }} color="action" />
        </Box>
        <Button 
          variant="contained" 
          onClick={() => navigate(`/story/${story.id}`)}
          fullWidth
          sx={{ mt: 'auto' }}
        >
          קרא עוד
        </Button>
      </CardContent>
    </Card>
  );
};

export default StoryCard;