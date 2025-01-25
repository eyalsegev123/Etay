import { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Alert, Grid } from '@mui/material';
import emailjs from 'emailjs-com';

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
    try {
      // TODO: Replace with your EmailJS service details
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        formData,
        'YOUR_USER_ID'
      );
      setStatus('success');
      setFormData({ name: '', email: '', message: '', itemRequest: '' });
    } catch (error) {
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
        py: { xs: 12, md: 16 }, // Increased padding
        minHeight: { xs: '80vh', md: '90vh' }, // Added minimum height
        bgcolor: 'background.paper',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          sx={{ textAlign: 'center', mb: 4 }}
        >
          Contact & Memorial Requests
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="name"
                label="Name"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="itemRequest"
                label="Memorial Item Request"
                value={formData.itemRequest}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                rows={4}
                name="message"
                label="Message"
                value={formData.message}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
              >
                Send Message
              </Button>
            </Grid>
          </Grid>
        </Box>
        {status === 'success' && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Message sent successfully!
          </Alert>
        )}
        {status === 'error' && (
          <Alert severity="error" sx={{ mt: 2 }}>
            Failed to send message. Please try again.
          </Alert>
        )}
      </Container>
    </Box>
  );
};

export default ContactSection;
