import { Box, Container, Typography } from '@mui/material';
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import SchoolIcon from '@mui/icons-material/School';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import FlightIcon from '@mui/icons-material/Flight';
import "react-vertical-timeline-component/style.min.css";

const timelineEvents = [
  {
    id: 1,
    year: "1990",
    title: "Birth",
    date: "January 1, 1990",
    description: "Itay was born in Beersheba, Israel, bringing joy to his family and starting his amazing journey.",
    icon: <ChildCareIcon />,
    image: "https://picsum.photos/400/300",
  },
  {
    id: 2,
    title: "School Years",
    date: "1996 - 2008",
    description: "Attended elementary and high school, where he excelled in sports and made lifelong friendships.",
    icon: <SchoolIcon />,
    image: "https://picsum.photos/400/301",
  },
  {
    id: 3,
    title: "Military Service",
    date: "2008 - 2011",
    description: "Served with distinction in the IDF, showing leadership and dedication to his country.",
    icon: <MilitaryTechIcon />,
    image: "https://picsum.photos/400/302",
  },
  {
    id: 4,
    title: "World Travel",
    date: "2012",
    description: "Embarked on a journey across South America, discovering new cultures and making memories.",
    icon: <FlightIcon />,
    image: "https://picsum.photos/400/303",
  },
];

const TimelineSection = () => {
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
          Itay's Journey
        </Typography>

        <VerticalTimeline>
          {timelineEvents.map((event) => (
            <VerticalTimelineElement
              key={event.id}
              className="vertical-timeline-element"
              contentStyle={{ background: '#fff', color: '#000' }}
              contentArrowStyle={{ borderRight: '7px solid #fff' }}
              date={event.date}
              iconStyle={{ background: '#1976d2', color: '#fff' }}
              icon={event.icon}
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
      </Container>
    </Box>
  );
};

export default TimelineSection;
