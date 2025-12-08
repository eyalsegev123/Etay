import { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Alert, Grid } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { sendContactMessage } from '../services/emailService';

const ContactSection = () => {
  const [status, setStatus] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    itemRequest: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await sendContactMessage(formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '', itemRequest: '' });
    } catch (error) {
      console.error('Failed to send message:', error);
      setStatus('error');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Box 
      id="contact"
      component="section" 
      sx={{ 
        py: { xs: 10, md: 14 },
        minHeight: { xs: '80vh', md: '90vh' },
        bgcolor: 'background.default', // Warm cream
        display: 'flex',
        alignItems: 'center',
        direction: 'rtl',
        position: 'relative',
      }}
    >
      <Container maxWidth="md">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: 'text.primary',
            }}
          >
            צור קשר ובקשות הנצחה
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              maxWidth: '500px',
              mx: 'auto',
            }}
          >
            נשמח לשמוע מכם ולעזור בכל בקשה להנצחת זכרו של איתי
          </Typography>
        </Box>

        {/* Form Card */}
        <Box 
          component="form" 
          onSubmit={handleSubmit} 
          noValidate
          dir="rtl"
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 4,
            p: { xs: 3, md: 5 },
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
          }}
        >
          <Grid container spacing={3} direction="row-reverse">
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="name"
                label="שם מלא"
                value={formData.name}
                onChange={handleChange}
                InputProps={{ sx: { textAlign: 'right' } }}
                InputLabelProps={{ sx: { right: 14, left: 'auto', transformOrigin: 'top right' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="email"
                label="אימייל"
                type="email"
                value={formData.email}
                onChange={handleChange}
                InputProps={{ sx: { textAlign: 'right' } }}
                InputLabelProps={{ sx: { right: 14, left: 'auto', transformOrigin: 'top right' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="itemRequest"
                label="בקשה לפריט הנצחה"
                value={formData.itemRequest}
                onChange={handleChange}
                placeholder="לדוגמה: מחברת, חולצה, מדבקה..."
                InputProps={{ sx: { textAlign: 'right' } }}
                InputLabelProps={{ sx: { right: 14, left: 'auto', transformOrigin: 'top right' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                rows={4}
                name="message"
                label="הודעה"
                value={formData.message}
                onChange={handleChange}
                InputProps={{ sx: { textAlign: 'right' } }}
                InputLabelProps={{ sx: { right: 14, left: 'auto', transformOrigin: 'top right' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={status === 'sending'}
                endIcon={<SendIcon />}
                sx={{
                  py: 1.5,
                  fontSize: '1.1rem',
                  gap: 1.5,
                }}
              >
                {status === 'sending' ? 'שולח...' : 'שלח הודעה'}
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Status Messages */}
        {status === 'success' && (
          <Alert 
            severity="success" 
            sx={{ 
              mt: 3,
              borderRadius: 3,
            }}
          >
            ההודעה נשלחה בהצלחה! נחזור אליכם בהקדם.
          </Alert>
        )}
        {status === 'error' && (
          <Alert 
            severity="error" 
            sx={{ 
              mt: 3,
              borderRadius: 3,
            }}
          >
            שגיאה בשליחת ההודעה. אנא נסו שוב.
          </Alert>
        )}
      </Container>
    </Box>
  );
};

export default ContactSection;
