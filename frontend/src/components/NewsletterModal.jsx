/**
 * Newsletter Modal Component
 * 
 * A popup modal for newsletter subscription with Mailchimp integration.
 * Features:
 * - Auto-show on first visit (after delay)
 * - Smart persistence (subscribed = never show, dismissed = show next session)
 * - Hebrew RTL support
 * - Loading, success, and error states
 */

import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Fade,
  Backdrop,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Close as CloseIcon, MailOutline as MailIcon } from '@mui/icons-material';

// Services
import {
  subscribeToNewsletter,
  getErrorMessage,
  markAsDismissed,
} from '../services/newsletterService';

// Styles
import '../styles/Newsletter.css';

// =============================================================================
// RE-EXPORT UTILITY FUNCTIONS
// =============================================================================

// Re-export for use in App.jsx
export { 
  shouldAutoShowModal, 
  isUserSubscribed 
} from '../services/newsletterService';

// =============================================================================
// CONSTANTS
// =============================================================================

const FORM_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

const AUTO_CLOSE_DELAY_MS = 3000;

const INITIAL_FORM_STATE = {
  email: '',
  firstName: '',
};

// =============================================================================
// STYLES (MUI sx props)
// =============================================================================

const styles = {
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: 450 },
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    overflow: 'hidden',
    outline: 'none',
    direction: 'rtl',
  },
  
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(4px)',
  },
  
  closeButton: {
    position: 'absolute',
    top: 12,
    left: 12,
    zIndex: 10,
    color: 'white',
    bgcolor: 'rgba(255, 255, 255, 0.2)',
    '&:hover': {
      bgcolor: 'rgba(255, 255, 255, 0.3)',
    },
  },
  
  header: {
    background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
    pt: 4,
    pb: 3,
    px: 4,
    textAlign: 'center',
  },
  
  iconWrapper: {
    width: 64,
    height: 64,
    borderRadius: '50%',
    bgcolor: 'rgba(255, 255, 255, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    mx: 'auto',
    mb: 2,
  },
  
  title: {
    color: 'white',
    fontWeight: 700,
    mb: 1,
  },
  
  subtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 1.6,
  },
  
  content: {
    p: 4,
  },
  
  textField: {
    '& .MuiInputBase-input': { textAlign: 'right' },
    '& .MuiInputLabel-root': {
      right: 25,
      left: 'auto',
      transformOrigin: 'top right',
    },
  },
  
  submitButton: {
    py: 1.5,
    fontSize: '1.1rem',
    borderRadius: '25px',
  },
  
  successAlert: {
    borderRadius: 2,
    '& .MuiAlert-message': {
      width: '100%',
      textAlign: 'center',
    },
  },
  
  errorAlert: {
    mb: 2,
    borderRadius: 2,
  },
  
  privacyNote: {
    display: 'block',
    textAlign: 'center',
    color: 'text.secondary',
    mt: 2,
  },
};

// =============================================================================
// COMPONENT
// =============================================================================

export default function NewsletterModal({ open, onClose, onSubscribe }) {
  // ---------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------
  
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [status, setStatus] = useState(FORM_STATUS.IDLE);
  const [errorMessage, setErrorMessage] = useState('');

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------
  
  /**
   * Handle form field changes
   */
  const handleFieldChange = useCallback((field) => (event) => {
    const { value } = event.target;
    
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (status === FORM_STATUS.ERROR) {
      setStatus(FORM_STATUS.IDLE);
      setErrorMessage('');
    }
  }, [status]);

  /**
   * Reset form to initial state
   */
  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_STATE);
    setStatus(FORM_STATUS.IDLE);
    setErrorMessage('');
  }, []);

  /**
   * Handle modal close
   */
  const handleClose = useCallback((wasSubscribed = false) => {
    // Mark as dismissed only if user didn't subscribe
    if (!wasSubscribed && status !== FORM_STATUS.SUCCESS) {
      markAsDismissed();
    }
    
    resetForm();
    onClose();
  }, [status, resetForm, onClose]);

  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    
    const { email, firstName } = formData;
    
    // Basic validation
    if (!email.trim()) {
      setStatus(FORM_STATUS.ERROR);
      setErrorMessage(getErrorMessage('INVALID_EMAIL'));
      return;
    }
    
    setStatus(FORM_STATUS.LOADING);
    
    try {
      await subscribeToNewsletter({ email, firstName });
      
      // Success
      setStatus(FORM_STATUS.SUCCESS);
      onSubscribe?.();
      
      // Auto-close after success message
      setTimeout(() => {
        handleClose(true);
      }, AUTO_CLOSE_DELAY_MS);
      
    } catch (error) {
      setStatus(FORM_STATUS.ERROR);
      setErrorMessage(getErrorMessage(error.message));
    }
  }, [formData, handleClose, onSubscribe]);

  /**
   * Handle backdrop click (dismiss)
   */
  const handleBackdropClick = useCallback(() => {
    if (status !== FORM_STATUS.LOADING) {
      handleClose(false);
    }
  }, [status, handleClose]);

  // ---------------------------------------------------------------------------
  // Computed values
  // ---------------------------------------------------------------------------
  
  const isLoading = status === FORM_STATUS.LOADING;
  const isSuccess = status === FORM_STATUS.SUCCESS;
  const isError = status === FORM_STATUS.ERROR;

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <Modal
      open={open}
      onClose={handleBackdropClick}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
          sx: styles.backdrop,
        },
      }}
      aria-labelledby="newsletter-modal-title"
      aria-describedby="newsletter-modal-description"
    >
      <Fade in={open}>
        <Box sx={styles.modal} className="newsletter-modal">
          {/* Close Button */}
          <IconButton
            onClick={() => handleClose(false)}
            disabled={isLoading}
            sx={styles.closeButton}
            aria-label="סגור"
          >
            <CloseIcon />
          </IconButton>

          {/* Header */}
          <Box sx={styles.header} className="newsletter-modal__header">
            <Box sx={styles.iconWrapper}>
              <MailIcon sx={{ fontSize: 32, color: 'white' }} />
            </Box>
            
            <Typography
              id="newsletter-modal-title"
              variant="h5"
              component="h2"
              sx={styles.title}
            >
              הצטרפו לעדכונים שלנו
            </Typography>
            
            <Typography
              id="newsletter-modal-description"
              variant="body2"
              sx={styles.subtitle}
            >
              קבלו עדכונים חשובים על אירועי הנצחה ותאריכים משמעותיים לזכרו של איתי
            </Typography>
          </Box>

          {/* Content */}
          <Box sx={styles.content}>
            {isSuccess ? (
              <SuccessMessage />
            ) : (
              <SubscriptionForm
                formData={formData}
                isLoading={isLoading}
                isError={isError}
                errorMessage={errorMessage}
                onFieldChange={handleFieldChange}
                onSubmit={handleSubmit}
              />
            )}
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

NewsletterModal.propTypes = {
  /** Whether the modal is open */
  open: PropTypes.bool.isRequired,
  /** Callback when modal is closed */
  onClose: PropTypes.func.isRequired,
  /** Callback when subscription is successful */
  onSubscribe: PropTypes.func,
};

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

/**
 * Success message shown after successful subscription
 */
function SuccessMessage() {
  return (
    <Alert
      severity="success"
      sx={styles.successAlert}
      className="newsletter-success"
    >
      <Typography variant="body1" fontWeight={600}>
        תודה שנרשמתם! 🎉
      </Typography>
      <Typography variant="body2" sx={{ mt: 0.5 }}>
        נשלח לכם עדכונים על אירועים חשובים
      </Typography>
    </Alert>
  );
}

/**
 * Subscription form with email and name fields
 */
function SubscriptionForm({
  formData,
  isLoading,
  isError,
  errorMessage,
  onFieldChange,
  onSubmit,
}) {
  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      noValidate
      className="newsletter-form"
    >
      {/* Error Alert */}
      {isError && (
        <Alert severity="error" sx={styles.errorAlert}>
          {errorMessage}
        </Alert>
      )}

      {/* First Name Field */}
      <TextField
        fullWidth
        name="firstName"
        label="שם פרטי"
        placeholder="השם שלך"
        value={formData.firstName}
        onChange={onFieldChange('firstName')}
        disabled={isLoading}
        autoComplete="given-name"
        sx={{ ...styles.textField, mb: 2 }}
      />

      {/* Email Field */}
      <TextField
        fullWidth
        required
        name="email"
        type="email"
        label="כתובת אימייל"
        placeholder="example@email.com"
        value={formData.email}
        onChange={onFieldChange('email')}
        disabled={isLoading}
        error={isError && !formData.email}
        autoComplete="email"
        sx={{ ...styles.textField, mb: 3 }}
      />

      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        fullWidth
        size="large"
        disabled={isLoading}
        sx={styles.submitButton}
      >
        {isLoading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          'הרשמה לעדכונים'
        )}
      </Button>

      {/* Privacy Note */}
      <Typography variant="caption" sx={styles.privacyNote}>
        לא נשלח ספאם. ניתן לבטל את המנוי בכל עת.
      </Typography>
    </Box>
  );
}

SubscriptionForm.propTypes = {
  formData: PropTypes.shape({
    email: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  onFieldChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
