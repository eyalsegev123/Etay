/**
 * Newsletter Floating Button Component
 * 
 * A floating action button (FAB) that appears in the bottom-right corner.
 * Clicking it opens the newsletter subscription modal.
 */

import PropTypes from 'prop-types';
import { Fab, Zoom, Tooltip } from '@mui/material';
import { MailOutline as MailIcon } from '@mui/icons-material';

// Styles
import '../styles/Newsletter.css';

// =============================================================================
// CONSTANTS
// =============================================================================

const TOOLTIP_TEXT = 'הרשמה לעדכונים';
const ARIA_LABEL = 'פתח חלון הרשמה לעדכונים';

// =============================================================================
// STYLES
// =============================================================================

const styles = {
  fab: {
    position: 'fixed',
    bottom: { xs: 16, sm: 24 },
    right: { xs: 16, sm: 24 },
    zIndex: 1000,
    width: 56,
    height: 56,
    background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
    boxShadow: '0 4px 20px rgba(59, 130, 246, 0.4)',
    transition: 'all 0.3s ease',
    
    '&:hover': {
      background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
      transform: 'scale(1.1)',
      boxShadow: '0 6px 25px rgba(59, 130, 246, 0.5)',
    },
    
    '&:active': {
      transform: 'scale(0.95)',
    },
    
    // Subtle pulse animation
    animation: 'newsletter-pulse 2s ease-in-out infinite',
  },
  
  icon: {
    fontSize: 26,
  },
};

// =============================================================================
// COMPONENT
// =============================================================================

export default function NewsletterFloatingButton({ onClick, visible }) {
  return (
    <Zoom in={visible} unmountOnExit>
      <Tooltip 
        title={TOOLTIP_TEXT} 
        placement="left" 
        arrow
      >
        <Fab
          onClick={onClick}
          color="primary"
          aria-label={ARIA_LABEL}
          sx={styles.fab}
          className="newsletter-fab"
        >
          <MailIcon sx={styles.icon} />
        </Fab>
      </Tooltip>
    </Zoom>
  );
}

NewsletterFloatingButton.propTypes = {
  /** Callback when button is clicked */
  onClick: PropTypes.func.isRequired,
  /** Whether the button is visible */
  visible: PropTypes.bool.isRequired,
};
