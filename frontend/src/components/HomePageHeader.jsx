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
import ShareIcon from '@mui/icons-material/Share';
import ShareStoryModal from './ShareStoryModal';

// ==========================================
// Constants
// ==========================================

const NAVIGATION_ITEMS = [
  { name: 'בית', href: 'welcome' },
  { name: 'ציר זמן', href: 'timeline' },
  { name: 'תמונות', href: 'photos' },
  { name: 'סיפורים', href: 'stories' },
  { name: 'צור קשר', href: 'contact' },
];

// ==========================================
// Sub-components
// ==========================================

const MobileNavigation = ({ navigation, trigger, onShareClick }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleShareClick = () => {
    handleCloseMenu();
    onShareClick();
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
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          sx={{
            display: { xs: 'block', md: 'none' },
            direction: 'rtl'
          }}
        >
          {navigation.map((item) => (
            <MenuItem 
              key={item.name} 
              onClick={() => scrollToSection(item.href)}
              sx={{ justifyContent: 'flex-start' }}
            >
              <Typography textAlign="right">{item.name}</Typography>
            </MenuItem>
          ))}
          <MenuItem 
            onClick={handleShareClick}
            sx={{
              borderTop: 1,
              borderColor: 'divider',
              mt: 1,
              justifyContent: 'flex-start'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
              <ShareIcon fontSize="small" />
              <Typography textAlign="right" sx={{ fontWeight: 600 }}>
                שתף את הסיפור שלך
              </Typography>
            </Box>
          </MenuItem>
        </Menu>
      </Box>

      {/* Mobile Title - Clickable */}
      <Typography
        variant="h6"
        noWrap
        component="div"
        onClick={() => scrollToSection('welcome')}
        sx={{
          mr: 2,
          display: { xs: 'flex', md: 'none' },
          flexGrow: 1,
          fontWeight: 700,
          color: trigger ? 'text.primary' : 'white',
          textDecoration: 'none',
          transition: 'color 0.3s ease-in-out',
          justifyContent: 'flex-end', // Align text to right for RTL
          cursor: 'pointer', // Pointer cursor
          textShadow: trigger ? 'none' : '0 2px 4px rgba(0,0,0,0.6)', // Added shadow
        }}
      >
        לזכר איתי אזולאי ז״ל
      </Typography>
    </>
  );
};

const DesktopNavigation = ({ navigation, activeSection, trigger, onShareClick }) => {
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
          ml: 'auto',
        }}
      >
        {navigation.map((item) => (
          <Button
            key={item.name}
            onClick={() => scrollToSection(item.href)}
            size="small" // Smaller button size
            sx={{
              my: 0, // Removed vertical margin entirely
              mx: 1,
              py: 0.5, // Reduced internal padding
              color: trigger ? 'text.primary' : 'white',
              display: 'block',
              transition: 'all 0.2s ease-in-out',
              position: 'relative',
              fontWeight: 600,
              fontSize: '0.95rem',
              textShadow: trigger ? 'none' : '0 2px 4px rgba(0,0,0,0.6)',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: '2px', // Adjusted underline position
                left: '0',
                width: activeSection === item.href ? '100%' : '0%',
                height: '2px',
                backgroundColor: trigger ? 'primary.main' : 'white',
                transition: 'width 0.3s ease-in-out',
                boxShadow: trigger ? 'none' : '0 2px 4px rgba(0,0,0,0.6)',
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

      {/* Share Story Button */}
      <Button
        variant="contained"
        size="small" // Reduced size
        onClick={onShareClick}
        startIcon={<ShareIcon />}
        sx={{
          display: { xs: 'none', md: 'flex' },
          mx: 2,
          py: 0.5, // Reduced padding
          bgcolor: trigger ? 'primary.main' : 'rgba(255, 255, 255, 0.9)',
          color: trigger ? 'white' : 'primary.main',
          fontWeight: 600,
          fontSize: '0.9rem', // Slightly smaller text
          '&:hover': {
            bgcolor: trigger ? 'primary.dark' : 'rgba(255, 255, 255, 1)',
            transform: 'translateY(-2px)',
          },
          transition: 'all 0.2s ease-in-out',
          boxShadow: 2,
        }}
      >
        שתף את הסיפור שלך
      </Button>

      {/* Desktop Title - Clickable to scroll home */}
      <Typography
        variant="h6"
        noWrap
        component="a" // Changed to 'a' to be semantic
        onClick={() => scrollToSection('welcome')} // Scroll to top
        sx={{
          display: { xs: 'none', md: 'flex' },
          fontWeight: 700,
          marginRight: 'auto',
          color: trigger ? 'text.primary' : 'white',
          textDecoration: 'none',
          cursor: 'pointer', // Pointer cursor
          textShadow: trigger ? 'none' : '0 2px 4px rgba(0,0,0,0.6)', // Added shadow
          transition: 'opacity 0.2s',
          '&:hover': {
            opacity: 0.8,
          }
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
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const handleOpenShareModal = () => {
    setShareModalOpen(true);
  };

  const handleCloseShareModal = () => {
    setShareModalOpen(false);
  };

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
    <>
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
        <Container maxWidth={false}> {/* Full width container */}
          <Toolbar disableGutters variant="dense" sx={{ direction: 'rtl', minHeight: { xs: 48, md: 50 }, px: { xs: 2, md: 4 } }}>
            <DesktopNavigation 
              navigation={NAVIGATION_ITEMS}
              activeSection={activeSection}
              trigger={trigger}
              onShareClick={handleOpenShareModal}
            />
            <MobileNavigation 
              navigation={NAVIGATION_ITEMS}
              trigger={trigger}
              onShareClick={handleOpenShareModal}
            />
          </Toolbar>
        </Container>
      </AppBar>

      {/* Share Story Modal */}
      <ShareStoryModal 
        open={shareModalOpen}
        onClose={handleCloseShareModal}
      />
    </>
  );
};

export default HomePageHeader;
