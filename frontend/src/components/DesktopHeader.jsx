import { Box, Typography, Button } from '@mui/material';

const DesktopHeader = ({ navigation, activeSection, trigger }) => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 64;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = window.pageYOffset + elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      
      {/* Navigation on left */}
      <Box
        sx={{
          flexGrow: 0, // Don't grow
          display: { xs: 'none', md: 'flex' },
          mr: 'auto', // Push to left
        }}
      >
        {navigation.map((item) => (
          <Button
            key={item.name}
            onClick={() => scrollToSection(item.href)}
            sx={{
              my: 2,
              mx: 1,
              color: trigger ? 'text.primary' : 'white',
              display: 'block',
              transition: 'all 0.2s ease-in-out',
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: '0',
                left: '0',
                width: activeSection === item.href ? '100%' : '0%',
                height: '2px',
                backgroundColor: trigger ? 'primary.main' : 'white',
                transition: 'width 0.3s ease-in-out',
              },
              '&:hover': {
                backgroundColor: trigger 
                  ? 'rgba(0, 0, 0, 0.04)'
                  : 'rgba(255, 255, 255, 0.1)',
                transform: 'translateY(-2px)',
                '&:after': {
                  width: '100%',
                },
              },
            }}
          >
            {item.name}
          </Button>
        ))}
      </Box>


      {/* Typography on right */}
      <Typography
        variant="h6"
        noWrap
        sx={{
          display: { xs: 'none', md: 'flex' },
          fontWeight: 700,
          marginLeft: 'auto', // Push to right
          color: trigger ? 'text.primary' : 'white',
        }}
      >
        לזכר איתי אזולאי ז״ל
      </Typography>

    </>
  );
};

export default DesktopHeader;
