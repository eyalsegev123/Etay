import { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  CircularProgress,
  Alert,
  Fade,
  Backdrop,
  Grid,
  Chip,
} from '@mui/material';
import {
  Close as CloseIcon,
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { sendStorySubmission, validateFormData, validatePhotos } from '../services/emailService';

// ==========================================
// Sub-components
// ==========================================

const CloseButton = ({ onClick }) => (
  <Box
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 10,
      p: 2,
    }}
  >
    <IconButton
      onClick={onClick}
      sx={{
        color: 'text.primary',
        bgcolor: 'rgba(0, 0, 0, 0.05)',
        '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.1)' },
      }}
    >
      <CloseIcon />
    </IconButton>
  </Box>
);

const PhotoPreview = ({ file, onRemove, index }) => {
  const [preview, setPreview] = useState(null);

  // Generate preview URL
  useEffect(() => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  }, [file]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: 100,
        height: 100,
        borderRadius: 1,
        overflow: 'hidden',
        border: '2px solid',
        borderColor: 'divider',
      }}
    >
      {preview && (
        <Box
          component="img"
          src={preview}
          alt={`Preview ${index + 1}`}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      )}
      <IconButton
        onClick={() => onRemove(index)}
        sx={{
          position: 'absolute',
          top: 2,
          right: 2,
          bgcolor: 'rgba(255, 255, 255, 0.9)',
          '&:hover': { bgcolor: 'rgba(255, 255, 255, 1)' },
          padding: '4px',
        }}
        size="small"
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

// ==========================================
// Main Component
// ==========================================

export default function ShareStoryModal({ open, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    relationship: '',
    title: '',
    content: '',
    location: '',
  });

  const [photos, setPhotos] = useState([]);
  const [errors, setErrors] = useState({});
  const [photoError, setPhotoError] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState('idle'); // idle, submitting, success, error
  const [submitError, setSubmitError] = useState('');

  // Handle form field changes
  const handleChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Handle photo selection
  const handlePhotoSelect = (event) => {
    const files = Array.from(event.target.files);
    const remainingSlots = 3 - photos.length;

    if (files.length > remainingSlots) {
      setPhotoError(`ניתן להעלות עד ${3 - photos.length} תמונות נוספות`);
      return;
    }

    const validation = validatePhotos([...photos, ...files]);
    if (!validation.isValid) {
      setPhotoError(validation.error);
      return;
    }

    setPhotos((prev) => [...prev, ...files]);
    setPhotoError('');
    event.target.value = ''; // Reset input
  };

  // Remove photo from selection
  const handleRemovePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    setPhotoError('');
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Validate form data
    const validation = validateFormData(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setSubmissionStatus('submitting');
    setSubmitError('');

    try {
      await sendStorySubmission(formData, photos);
      setSubmissionStatus('success');

      // Auto-close after 3 seconds
      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (error) {
      console.error('Submission error:', error);
      setSubmissionStatus('error');
      setSubmitError('שגיאה בשליחת הסיפור. אנא נסה שוב.');
    }
  };

  // Handle modal close
  const handleClose = () => {
    if (submissionStatus === 'submitting') return; // Prevent closing during submission
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      relationship: '',
      title: '',
      content: '',
      location: '',
    });
    setPhotos([]);
    setErrors({});
    setPhotoError('');
    setSubmissionStatus('idle');
    setSubmitError('');
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
          style: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
        },
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '95%', sm: '90%', md: 700 },
            maxHeight: '90vh',
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            overflow: 'auto',
            outline: 'none',
            direction: 'rtl',
          }}
        >
          <CloseButton onClick={handleClose} />

          <Box sx={{ p: 4, pt: 6 }}>
            {/* Header */}
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{ textAlign: 'center', fontWeight: 600, mb: 2 }}
            >
              שתף את הסיפור שלך על איתי
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: 'center', mb: 4 }}
            >
              שתף אותנו בזכרון, סיפור או רגע מיוחד שחווית עם איתי
            </Typography>

            {/* Success Message */}
            {submissionStatus === 'success' && (
              <Alert severity="success" sx={{ mb: 3 }}>
                <Typography variant="body2" component="div">
                  תודה רבה! הסיפור שלך נשלח בהצלחה. נעריך את שיתוף הזיכרון שלך.
                  <br />
                  <br />
                  לתמונות באיכות גבוהה, אנא שלחו אותן ישירות לכתובת המייל:
                  <br />
                  <strong>eyalsegev123@gmail.com</strong>
                </Typography>
              </Alert>
            )}

            {/* Error Message */}
            {submissionStatus === 'error' && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {submitError}
              </Alert>
            )}

            {/* Form */}
            {submissionStatus !== 'success' && (
              <Box component="form" noValidate>
                <Grid container spacing={2}>
                  {/* Name - Required */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="השם שלך"
                      value={formData.name}
                      onChange={handleChange('name')}
                      error={!!errors.name}
                      helperText={errors.name}
                      disabled={submissionStatus === 'submitting'}
                      sx={{ '& .MuiInputBase-input': { textAlign: 'right' }, '& .MuiInputLabel-root': { right: 25, left: 'auto', transformOrigin: 'top right' } }}
                    />
                  </Grid>

                  {/* Email - Optional */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="אימייל לחזרה אליך"
                      type="email"
                      value={formData.email}
                      onChange={handleChange('email')}
                      error={!!errors.email}
                      helperText={errors.email || 'אופציונלי'}
                      disabled={submissionStatus === 'submitting'}
                      sx={{ '& .MuiInputBase-input': { textAlign: 'right' }, '& .MuiInputLabel-root': { right: 25, left: 'auto', transformOrigin: 'top right' } }}
                    />
                  </Grid>

                  {/* Relationship - Optional */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="הקשר שלך לאיתי"
                      placeholder=""
                      value={formData.relationship}
                      onChange={handleChange('relationship')}
                      helperText="אופציונלי"
                      disabled={submissionStatus === 'submitting'}
                      sx={{ '& .MuiInputBase-input': { textAlign: 'right' }, '& .MuiInputLabel-root': { right: 25, left: 'auto', transformOrigin: 'top right' } }}
                    />
                  </Grid>

                  {/* Location - Optional */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="מיקום"
                      placeholder=""
                      value={formData.location}
                      onChange={handleChange('location')}
                      helperText="אופציונלי"
                      disabled={submissionStatus === 'submitting'}
                      sx={{ '& .MuiInputBase-input': { textAlign: 'right' }, '& .MuiInputLabel-root': { right: 25, left: 'auto', transformOrigin: 'top right' } }}
                    />
                  </Grid>

                  {/* Story Title - Required */}
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="כותרת הסיפור"
                      value={formData.title}
                      onChange={handleChange('title')}
                      error={!!errors.title}
                      helperText={errors.title}
                      disabled={submissionStatus === 'submitting'}
                      sx={{ '& .MuiInputBase-input': { textAlign: 'right' }, '& .MuiInputLabel-root': { right: 25, left: 'auto', transformOrigin: 'top right' } }}
                    />
                  </Grid>

                  {/* Story Content - Required */}
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      multiline
                      rows={6}
                      label="הסיפור שלך"
                      placeholder=""
                      value={formData.content}
                      onChange={handleChange('content')}
                      error={!!errors.content}
                      helperText={
                        errors.content ||
                        `${formData.content.length}/5000 תווים (מינימום 50)`
                      }
                      disabled={submissionStatus === 'submitting'}
                      sx={{ '& .MuiInputBase-input': { textAlign: 'right' }, '& .MuiInputLabel-root': { right: 25, left: 'auto', transformOrigin: 'top right' } }}
                    />
                  </Grid>

                  {/* Photo Upload */}
                  <Grid item xs={12}>
                    <Box>
                      <Typography variant="subtitle2" gutterBottom>
                        הוסף תמונות (עד 3, אופציונלי)
                      </Typography>

                      {/* Photo Previews */}
                      {photos.length > 0 && (
                        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                          {photos.map((photo, index) => (
                            <PhotoPreview
                              key={index}
                              file={photo}
                              index={index}
                              onRemove={handleRemovePhoto}
                            />
                          ))}
                        </Box>
                      )}

                      {/* Upload Button */}
                      {photos.length < 3 && (
                        <Button
                          variant="outlined"
                          component="label"
                          startIcon={<CloudUploadIcon />}
                          disabled={submissionStatus === 'submitting'}
                          fullWidth
                          sx={{ '& .MuiButton-startIcon': { marginLeft: 2 } }}
                        >
                          בחר תמונות
                          <input
                            type="file"
                            hidden
                            multiple
                            accept="image/jpeg,image/jpg,image/png,image/gif"
                            onChange={handlePhotoSelect}
                          />
                        </Button>
                      )}

                      {photoError && (
                        <Alert severity="error" sx={{ mt: 1 }}>
                          {photoError}
                        </Alert>
                      )}

                      {photos.length > 0 && (
                        <Box sx={{ mt: 1 }}>
                          <Chip
                            label={`${photos.length} תמונות נבחרו`}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        </Box>
                      )}
                    </Box>
                  </Grid>

                  {/* Action Buttons */}
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
                      <Button
                        variant="outlined"
                        onClick={handleClose}
                        disabled={submissionStatus === 'submitting'}
                      >
                        ביטול
                      </Button>
                      <Button
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={submissionStatus === 'submitting'}
                        startIcon={
                          submissionStatus === 'submitting' ? (
                            <CircularProgress size={20} color="inherit" />
                          ) : null
                        }
                      >
                        {submissionStatus === 'submitting' ? 'שולח...' : 'שלח סיפור'}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

