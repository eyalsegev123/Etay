import { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Alert, Grid } from '@mui/material';
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
        py: { xs: 12, md: 16 },
        minHeight: { xs: '80vh', md: '90vh' },
        bgcolor: 'background.paper',
        display: 'flex',
        alignItems: 'center',
        direction: 'rtl'
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          sx={{ textAlign: 'center', mb: 4 }}
        >
          צור קשר ובקשות הנצחה
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="name"
                label="שם מלא"
                value={formData.name}
                onChange={handleChange}
                sx={{ textAlign: 'right' }}
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
                sx={{ textAlign: 'right' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="itemRequest"
                label="בקשה לפריט הנצחה"
                value={formData.itemRequest}
                onChange={handleChange}
                sx={{ textAlign: 'right' }}
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
                sx={{ textAlign: 'right' }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'שולח...' : 'שלח הודעה'}
              </Button>
            </Grid>
          </Grid>
        </Box>
        {status === 'success' && (
          <Alert severity="success" sx={{ mt: 2 }}>
            ההודעה נשלחה בהצלחה!
          </Alert>
        )}
        {status === 'error' && (
          <Alert severity="error" sx={{ mt: 2 }}>
            שגיאה בשליחת ההודעה. אנא נסה שוב.
          </Alert>
        )}
      </Container>
    </Box>
  );
};

export default ContactSection;
