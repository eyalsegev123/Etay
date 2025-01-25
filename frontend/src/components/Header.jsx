import { useState,
     useEffect } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import useScrollTrigger from '@mui/material/useScrollTrigger';

const navigation = [
  { name: 'Home', href: 'welcome' },
  { name: 'Timeline', href: 'timeline' },
  { name: 'Photos', href: 'photos' },
  { name: 'Stories', href: 'stories' },
  { name: 'Contact', href: 'contact' },
];

const Header = ({ hide = false }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

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
      const headerHeight = 64; // AppBar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = window.pageYOffset + elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Add active section tracking
  const [activeSection, setActiveSection] = useState('welcome');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigation.map(item => document.getElementById(item.href));
      const scrollPosition = window.scrollY + 100; // Add offset for better detection

      sections.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(navigation[index].href);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (hide) return null;

  return (
    <AppBar 
      position="fixed"
      sx={{
        background: trigger 
          ? theme.palette.background.default
          : 'transparent',
        boxShadow: trigger 
          ? 1
          : 'none',
        transition: 'all 0.3s ease-in-out',
        backdropFilter: trigger ? 'blur(8px)' : 'none',
        backgroundColor: trigger 
          ? 'rgba(255, 255, 255, 0.95)' 
          : 'transparent',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Desktop Logo/Title */}
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: trigger ? 'text.primary' : 'white',
              textDecoration: 'none',
              transition: 'color 0.3s ease-in-out',
            }}
          >
            רס״ר איתי אזולאי
          </Typography>

          {/* Mobile Menu */}
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

          {/* Mobile Logo/Title */}
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

          {/* Desktop Navigation */}
          <Box 
            sx={{ 
              flexGrow: 1, 
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'flex-end'
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
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
