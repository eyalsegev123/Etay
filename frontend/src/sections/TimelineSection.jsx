import { Box, Container, Typography } from "@mui/material";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import SchoolIcon from "@mui/icons-material/School";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import FlightIcon from "@mui/icons-material/Flight";
import WorkIcon from "@mui/icons-material/Work";
import "react-vertical-timeline-component/style.min.css";
import timelineData from "../assets/data/timeline.json";

// Map of icon names to components
const iconMap = {
  School: <SchoolIcon />,
  MilitaryTech: <MilitaryTechIcon />,
  ChildCare: <ChildCareIcon />,
  Flight: <FlightIcon />,
  Work: <WorkIcon />,
};

const TimelineSection = () => {
  const events = timelineData.events;

  return (
    <Box
      id="timeline"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: "background.default", // Warm cream background
        position: 'relative',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          sx={{ 
            textAlign: "center", 
            mb: 8,
            fontSize: { xs: '2.5rem', md: '3.75rem' },
            fontWeight: 700,
            color: 'text.primary',
          }}
        >
          מסע החיים של איתי
        </Typography>

        <VerticalTimeline lineColor="rgba(232, 90, 79, 0.2)">
          {events.map((event) => (
            <VerticalTimelineElement
              key={event.id}
              className="vertical-timeline-element"
              contentStyle={{ 
                background: "#FFFFFF", 
                color: "#2D3748", 
                direction: "rtl", 
                textAlign: "right",
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
                borderRadius: '16px',
                border: 'none',
              }}
              contentArrowStyle={{ borderRight: "7px solid #FFFFFF" }}
              date={event.date}
              iconStyle={{ 
                background: "linear-gradient(135deg, #E85A4F 0%, #FF7B6F 100%)", 
                color: "#fff",
                boxShadow: '0 4px 12px rgba(232, 90, 79, 0.3)',
              }}
              icon={iconMap[event.icon] || <SchoolIcon />}
            >
              <Typography 
                variant="h6" 
                component="h3"
                sx={{ 
                  fontWeight: 600,
                  color: 'text.primary',
                  mb: 1,
                }}
              >
                {event.title}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'text.secondary',
                  lineHeight: 1.7,
                }}
              >
                {event.description}
              </Typography>
              {event.image && (
                <Box
                  component="img"
                  src={event.image}
                  alt={event.title}
                  sx={{
                    width: "100%",
                    height: 200,
                    objectFit: "cover",
                    borderRadius: 2,
                    mt: 2,
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
