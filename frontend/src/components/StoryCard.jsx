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
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s',
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
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h3">
          {story.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {story.preview}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <PersonIcon sx={{ fontSize: 20, mr: 1 }} color="action" />
          <Typography variant="subtitle2" color="text.secondary">
            {story.author}
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          onClick={() => navigate(`/story/${story.id}`)}
          fullWidth
          sx={{ mt: 'auto' }}
        >
          Read More
        </Button>
      </CardContent>
    </Card>
  );
};

export default StoryCard;