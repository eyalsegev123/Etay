import { useState, useEffect } from 'react';
import { Box, Container, Typography, CircularProgress } from '@mui/material';
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import SchoolIcon from '@mui/icons-material/School';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import FlightIcon from '@mui/icons-material/Flight';
import WorkIcon from '@mui/icons-material/Work';
import "react-vertical-timeline-component/style.min.css";

// Map of icon names to components
const iconMap = {
  School: <SchoolIcon />,
  MilitaryTech: <MilitaryTechIcon />,
  ChildCare: <ChildCareIcon />,
  Flight: <FlightIcon />,
  Work: <WorkIcon />
};

const TimelineSection = () => {
  const [timelineEvents, setTimelineEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Direct fetch from JSON
    const fetchTimelineEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/timeline.json');
        
        if (!response.ok) {
          throw new Error('Failed to fetch timeline events');
        }
        
        const data = await response.json();
        setTimelineEvents(data.events || []);
      } catch (error) {
        console.error('Error fetching timeline events:', error);
        setTimelineEvents([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };
    
    fetchTimelineEvents();
  }, []);

  return (
    <Box
      id="timeline"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: 'background.paper',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          sx={{ textAlign: 'center', mb: 8 }}
        >
          מסע החיים של איתי
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <VerticalTimeline>
            {timelineEvents.map((event) => (
              <VerticalTimelineElement
                key={event.id}
                className="vertical-timeline-element"
                contentStyle={{ background: '#fff', color: '#000' }}
                contentArrowStyle={{ borderRight: '7px solid #fff' }}
                date={event.date}
                iconStyle={{ background: '#1976d2', color: '#fff' }}
                icon={iconMap[event.icon] || <SchoolIcon />}
              >
                <Typography variant="h6" component="h3">
                  {event.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {event.description}
                </Typography>
                {event.image && (
                  <Box
                    component="img"
                    src={event.image}
                    alt={event.title}
                    sx={{
                      width: '100%',
                      height: 200,
                      objectFit: 'cover',
                      borderRadius: 1,
                      mt: 2
                    }}
                  />
                )}
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        )}
      </Container>
    </Box>
  );
};

export default TimelineSection;
