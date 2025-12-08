import { createTheme } from '@mui/material/styles';

// ==========================================
// Design Tokens
// ==========================================

const palette = {
  primary: {
    main: '#E85A4F',
    light: '#FF7B6F',
    dark: '#C74840',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#2D3748',
    light: '#4A5568',
    dark: '#1A202C',
    contrastText: '#FFFFFF',
  },
  background: {
    default: '#F9F7F4',
    paper: '#FFFFFF',
    warm: '#FBF9F7',
  },
  text: {
    primary: '#2D3748',
    secondary: '#718096',
    disabled: '#A0AEC0',
  },
  divider: 'rgba(0, 0, 0, 0.08)',
  grey: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
  },
};

const typography = {
  fontFamily: '"Heebo", -apple-system, BlinkMacSystemFont, sans-serif',
  fontFamilyDisplay: '"Frank Ruhl Libre", Georgia, serif',
  
  h1: {
    fontFamily: '"Heebo", sans-serif',
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
  },
  h2: {
    fontFamily: '"Heebo", sans-serif',
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: 700,
    lineHeight: 1.25,
    letterSpacing: '-0.01em',
  },
  h3: {
    fontFamily: '"Heebo", sans-serif',
    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
    fontWeight: 600,
    lineHeight: 1.3,
  },
  h4: {
    fontFamily: '"Heebo", sans-serif',
    fontSize: '1.5rem',
    fontWeight: 600,
    lineHeight: 1.35,
  },
  h5: {
    fontFamily: '"Heebo", sans-serif',
    fontSize: '1.25rem',
    fontWeight: 600,
    lineHeight: 1.4,
  },
  h6: {
    fontFamily: '"Heebo", sans-serif',
    fontSize: '1.125rem',
    fontWeight: 600,
    lineHeight: 1.4,
  },
  body1: {
    fontSize: '1rem',
    lineHeight: 1.7,
    fontWeight: 400,
  },
  body2: {
    fontSize: '0.875rem',
    lineHeight: 1.6,
    fontWeight: 400,
  },
  button: {
    fontWeight: 600,
    letterSpacing: '0.02em',
    textTransform: 'none',
  },
};

const shadows = [
  'none',
  '0 1px 3px rgba(0,0,0,0.06)',
  '0 2px 6px rgba(0,0,0,0.06)',
  '0 4px 12px rgba(0,0,0,0.08)',
  '0 6px 16px rgba(0,0,0,0.08)',
  '0 8px 24px rgba(0,0,0,0.1)',
  '0 12px 32px rgba(0,0,0,0.12)',
  '0 16px 40px rgba(0,0,0,0.14)',
  '0 20px 48px rgba(0,0,0,0.16)',
  ...Array(16).fill('0 24px 56px rgba(0,0,0,0.18)'),
];

// ==========================================
// Component Overrides
// ==========================================

const components = {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        backgroundColor: palette.background.default,
      },
    },
  },
  
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 25,
        padding: '10px 24px',
        fontWeight: 600,
        fontSize: '0.95rem',
        transition: 'all 0.2s ease-in-out',
        boxShadow: 'none',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(232, 90, 79, 0.25)',
          transform: 'translateY(-1px)',
        },
      },
      contained: {
        '&:hover': {
          boxShadow: '0 6px 20px rgba(232, 90, 79, 0.3)',
        },
      },
      containedPrimary: {
        background: 'linear-gradient(135deg, #E85A4F 0%, #FF7B6F 100%)',
        '&:hover': {
          background: 'linear-gradient(135deg, #C74840 0%, #E85A4F 100%)',
        },
      },
      outlined: {
        borderWidth: 2,
        '&:hover': {
          borderWidth: 2,
          backgroundColor: 'rgba(232, 90, 79, 0.04)',
        },
      },
      text: {
        '&:hover': {
          backgroundColor: 'rgba(232, 90, 79, 0.08)',
        },
      },
    },
    defaultProps: {
      disableElevation: true,
    },
  },
  
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 16,
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
        transition: 'all 0.3s ease-in-out',
        overflow: 'hidden',
        '&:hover': {
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
          transform: 'translateY(-4px)',
        },
      },
    },
  },
  
  MuiCardContent: {
    styleOverrides: {
      root: {
        padding: '24px',
        '&:last-child': {
          paddingBottom: '24px',
        },
      },
    },
  },
  
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 12,
          backgroundColor: '#FFFFFF',
          transition: 'all 0.2s ease',
          '& fieldset': {
            borderColor: 'rgba(0, 0, 0, 0.1)',
            borderWidth: 1.5,
          },
          '&:hover fieldset': {
            borderColor: palette.primary.main,
          },
          '&.Mui-focused fieldset': {
            borderColor: palette.primary.main,
            borderWidth: 2,
          },
        },
        '& .MuiInputLabel-root': {
          color: palette.text.secondary,
          '&.Mui-focused': {
            color: palette.primary.main,
          },
        },
      },
    },
  },
  
  MuiAppBar: {
    styleOverrides: {
      root: {
        boxShadow: 'none',
      },
    },
  },
  
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        fontWeight: 500,
      },
      colorPrimary: {
        backgroundColor: palette.primary.main,
        color: '#FFFFFF',
      },
    },
  },
  
  MuiAlert: {
    styleOverrides: {
      root: {
        borderRadius: 12,
      },
      standardSuccess: {
        backgroundColor: 'rgba(72, 187, 120, 0.1)',
        color: '#276749',
        '& .MuiAlert-icon': {
          color: '#48BB78',
        },
      },
      standardError: {
        backgroundColor: 'rgba(232, 90, 79, 0.1)',
        color: '#C74840',
        '& .MuiAlert-icon': {
          color: palette.primary.main,
        },
      },
    },
  },
  
  MuiContainer: {
    styleOverrides: {
      root: {
        paddingTop: '2rem',
        paddingBottom: '2rem',
      },
    },
  },
  
  MuiTypography: {
    styleOverrides: {
      gutterBottom: {
        marginBottom: '1em',
      },
    },
  },
};

// ==========================================
// Theme Creation
// ==========================================

const theme = createTheme({
  palette,
  typography,
  shadows,
  components,
  shape: {
    borderRadius: 12,
  },
  direction: 'rtl',
});

export default theme;
