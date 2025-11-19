import { useState, useEffect } from 'react';
import { 
  AppBar, 
  Container, 
  Toolbar, 
  Box, 
  Typography, 
  Button, 
  IconButton, 
  Menu, 
  MenuItem 
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import MenuIcon from '@mui/icons-material/Menu';

// ==========================================
// Constants
// ==========================================

const NAVIGATION_ITEMS = [
  { name: 'Home', href: 'welcome' },
  { name: 'Timeline', href: 'timeline' },
  { name: 'Photos', href: 'photos' },
  { name: 'Stories', href: 'stories' },
  { name: 'Contact', href: 'contact' },
];

// ==========================================
// Sub-components
// ==========================================

const MobileNavigation = ({ navigation, trigger }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const scrollToSection = (sectionId) => {
    handleCloseMenu();
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
      {/* Hamburger Menu Icon */}
      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        <IconButton
          size="large"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenMenu}
          sx={{ color: trigger ? 'text.primary' : 'white' }}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          sx={{
            display: { xs: 'block', md: 'none' },
          }}
        >
          {navigation.map((item) => (
            <MenuItem 
              key={item.name} 
              onClick={() => scrollToSection(item.href)}
            >
              <Typography textAlign="center">{item.name}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>

      {/* Mobile Title */}
      <Typography
        variant="h6"
        noWrap
        sx={{
          mr: 2,
          display: { xs: 'flex', md: 'none' },
          flexGrow: 1,
          fontWeight: 700,
          color: trigger ? 'text.primary' : 'white',
          textDecoration: 'none',
          transition: 'color 0.3s ease-in-out',
        }}
      >
        In Memory of Itay
      </Typography>
    </>
  );
};

const DesktopNavigation = ({ navigation, activeSection, trigger }) => {
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
      {/* Navigation Links */}
      <Box
        sx={{
          flexGrow: 0,
          display: { xs: 'none', md: 'flex' },
          mr: 'auto',
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

      {/* Desktop Title */}
      <Typography
        variant="h6"
        noWrap
        sx={{
          display: { xs: 'none', md: 'flex' },
          fontWeight: 700,
          marginLeft: 'auto',
          color: trigger ? 'text.primary' : 'white',
        }}
      >
        לזכר איתי אזולאי ז״ל
      </Typography>
    </>
  );
};

// ==========================================
// Main Component
// ==========================================

const HomePageHeader = () => {
  const theme = useTheme();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });
  const [activeSection, setActiveSection] = useState('welcome');

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAVIGATION_ITEMS.map(item => document.getElementById(item.href));
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(NAVIGATION_ITEMS[index].href);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AppBar 
      position="fixed"
      sx={{
        background: trigger ? theme.palette.background.default : 'transparent',
        boxShadow: trigger ? 1 : 'none',
        transition: 'all 0.3s ease-in-out',
        backdropFilter: trigger ? 'blur(8px)' : 'none',
        backgroundColor: trigger ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <DesktopNavigation 
            navigation={NAVIGATION_ITEMS}
            activeSection={activeSection}
            trigger={trigger}
          />
          <MobileNavigation 
            navigation={NAVIGATION_ITEMS}
            trigger={trigger}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default HomePageHeader;
