import { useState, useEffect } from 'react';
import { AppBar, Container, Toolbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';

const navigation = [
  { name: 'Home', href: 'welcome' },
  { name: 'Timeline', href: 'timeline' },
  { name: 'Photos', href: 'photos' },
  { name: 'Stories', href: 'stories' },
  { name: 'Contact', href: 'contact' },
];

const Header = ({ hide = false }) => {
  const theme = useTheme();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });
  const [activeSection, setActiveSection] = useState('welcome');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigation.map(item => document.getElementById(item.href));
      const scrollPosition = window.scrollY + 100;

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
        background: trigger ? theme.palette.background.default : 'transparent',
        boxShadow: trigger ? 1 : 'none',
        transition: 'all 0.3s ease-in-out',
        backdropFilter: trigger ? 'blur(8px)' : 'none',
        backgroundColor: trigger ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <DesktopHeader 
            navigation={navigation}
            activeSection={activeSection}
            trigger={trigger}
          />
          <MobileHeader 
            navigation={navigation}
            trigger={trigger}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
