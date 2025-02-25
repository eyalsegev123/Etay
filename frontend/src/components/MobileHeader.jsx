import { useState } from 'react';
import { Box, IconButton, Typography, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const MobileHeader = ({ navigation, trigger }) => {
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

export default MobileHeader;
