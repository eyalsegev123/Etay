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

const HEADER_HEIGHT = {
  mobile: 56,
  desktop: 64,
};

// MUI 'md' breakpoint is 900px
const MD_BREAKPOINT = 900;

const getHeaderHeight = () => {
  return window.innerWidth >= MD_BREAKPOINT ? HEADER_HEIGHT.desktop : HEADER_HEIGHT.mobile;
};

const NAVIGATION_ITEMS = [
  { name: 'בית', href: 'welcome' },
  { name: 'ציר זמן', href: 'timeline' },
  { name: 'תמונות', href: 'photos' },
  { name: 'סיפורים', href: 'stories' },
  { name: 'בתקשורת', href: 'news' },
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
      const headerHeight = getHeaderHeight();
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
            direction: 'rtl',
            '& .MuiPaper-root': {
              borderRadius: 3,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              mt: 1,
            },
          }}
        >
          {navigation.map((item) => (
            <MenuItem 
              key={item.name} 
              onClick={() => scrollToSection(item.href)}
              sx={{ 
                justifyContent: 'flex-start',
                py: 1.5,
                px: 3,
              }}
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
              py: 1.5,
              px: 3,
              justifyContent: 'flex-start',
              color: 'primary.main',
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

      {/* Mobile Title */}
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
          justifyContent: 'flex-end',
          cursor: 'pointer',
          textShadow: trigger ? 'none' : '0 2px 4px rgba(0,0,0,0.6)',
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
      const headerHeight = getHeaderHeight();
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
            size="small"
            sx={{
              my: 0,
              mx: 1,
              py: 0.5,
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
                bottom: '2px',
                left: '0',
                width: activeSection === item.href ? '100%' : '0%',
                height: '2px',
                backgroundColor: trigger ? 'primary.main' : 'white',
                transition: 'width 0.3s ease-in-out',
                borderRadius: '2px',
              },
              '&:hover': {
                backgroundColor: trigger 
                  ? 'rgba(232, 90, 79, 0.08)'
                  : 'rgba(255, 255, 255, 0.1)',
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
        size="small"
        onClick={onShareClick}
        startIcon={<ShareIcon />}
        sx={{
          display: { xs: 'none', md: 'flex' },
          mx: 2,
          py: 0.75,
          px: 2.5,
          // Use 'background' to override the theme's gradient
          background: trigger 
            ? 'linear-gradient(135deg, #E85A4F 0%, #FF7B6F 100%)' 
            : 'rgba(255, 255, 255, 0.95)',
          color: trigger ? 'white' : '#E85A4F',
          fontWeight: 600,
          fontSize: '0.9rem',
          borderRadius: 25,
          '&:hover': {
            background: trigger 
              ? 'linear-gradient(135deg, #C74840 0%, #E85A4F 100%)' 
              : 'rgba(255, 255, 255, 1)',
            transform: 'translateY(-2px)',
            boxShadow: trigger 
              ? '0 4px 12px rgba(232, 90, 79, 0.3)' 
              : '0 4px 12px rgba(0,0,0,0.15)',
          },
          transition: 'all 0.2s ease-in-out',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        שתף את הסיפור שלך
      </Button>

      {/* Desktop Title */}
      <Typography
        variant="h6"
        noWrap
        component="a"
        onClick={() => scrollToSection('welcome')}
        sx={{
          display: { xs: 'none', md: 'flex' },
          fontWeight: 700,
          marginRight: 'auto',
          color: trigger ? 'text.primary' : 'white',
          textDecoration: 'none',
          cursor: 'pointer',
          textShadow: trigger ? 'none' : '0 2px 4px rgba(0,0,0,0.6)',
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
          background: trigger 
            ? 'rgba(249, 247, 244, 0.95)' 
            : 'transparent',
          boxShadow: trigger ? '0 2px 12px rgba(0,0,0,0.06)' : 'none',
          transition: 'all 0.3s ease-in-out',
          backdropFilter: trigger ? 'blur(12px)' : 'none',
        }}
      >
        <Container maxWidth={false}>
          <Toolbar 
            disableGutters 
            variant="dense" 
            sx={{ 
              direction: 'rtl', 
              minHeight: { xs: HEADER_HEIGHT.mobile, md: HEADER_HEIGHT.desktop }, 
              px: { xs: 2, md: 4 } 
            }}
          >
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
