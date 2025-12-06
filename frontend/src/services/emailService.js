import emailjs from 'emailjs-com';

// Initialize EmailJS with your public key
const initEmailJS = () => {
  const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
  if (publicKey) {
    emailjs.init(publicKey);
  } else {
    console.error('EmailJS public key is not configured');
  }
};

// Convert file to base64 string
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

// Compress image if needed (basic compression by resizing)
const compressImage = (base64String, maxWidth = 250) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      // Resize if width exceeds maxWidth
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      // Convert to base64 with quality compression (0.5 for better compression)
      resolve(canvas.toDataURL('image/jpeg', 0.5));
    };
    img.onerror = (error) => reject(new Error('Failed to load image for compression'));
    img.src = base64String;
  });
};

/**
 * Send story submission via EmailJS
 * @param {Object} formData - Form data containing story details
 * @param {Array} photos - Array of File objects (photos)
 * @returns {Promise} - EmailJS send promise
 */
export const sendStorySubmission = async (formData, photos = []) => {
  try {
    // Initialize EmailJS
    initEmailJS();

    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;

    if (!serviceId || !templateId) {
      throw new Error('EmailJS configuration is missing');
    }

    // Process photos - convert to base64 and compress
    const photoPromises = photos.slice(0, 3).map(async (photo, index) => {
      try {
        const base64 = await fileToBase64(photo);
        const compressed = await compressImage(base64);
        return { [`photo_${index + 1}`]: compressed, [`photo_${index + 1}_name`]: photo.name };
      } catch (error) {
        console.error(`Error processing photo ${index + 1}:`, error);
        return { [`photo_${index + 1}`]: '', [`photo_${index + 1}_name`]: '' };
      }
    });

    const processedPhotos = await Promise.all(photoPromises);
    
    // Merge all photo data into a single object
    const photoData = processedPhotos.reduce((acc, curr) => ({ ...acc, ...curr }), {});

    // Prepare email template parameters
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email || 'לא סופק',
      relationship: formData.relationship || 'לא צוין',
      story_title: formData.title,
      story_content: formData.content,
      location: formData.location || 'לא צוין',
      submission_date: new Date().toLocaleString('he-IL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      recipient_email: process.env.REACT_APP_RECIPIENT_EMAIL || 'eyalsegev123@gmail.com',
      photo_count: photos.length,
      ...photoData,
    };

    // Send email via EmailJS
    const response = await emailjs.send(
      serviceId,
      templateId,
      templateParams
    );

    return response;
  } catch (error) {
    console.error('Error sending story submission:', error);
    throw error;
  }
};

/**
 * Send contact form message via EmailJS
 * @param {Object} formData - Contact form data { name, email, message, itemRequest }
 * @returns {Promise} - EmailJS send promise
 */
export const sendContactMessage = async (formData) => {
  try {
    // Initialize EmailJS
    initEmailJS();

    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    // Use specific contact template ID
    const templateId = process.env.REACT_APP_EMAILJS_CONTACT_TEMPLATE_ID;

    if (!serviceId || !templateId) {
      throw new Error('EmailJS configuration is missing');
    }

    // Template parameters for the contact form
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      item_request: formData.itemRequest || 'לא צוין',
      message: formData.message,
      submission_date: new Date().toLocaleString('he-IL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      recipient_email: process.env.REACT_APP_RECIPIENT_EMAIL || 'eyalsegev123@gmail.com',
    };

    // Send email via EmailJS
    const response = await emailjs.send(
      serviceId,
      templateId,
      templateParams
    );

    return response;
  } catch (error) {
    console.error('Error sending contact message:', error);
    throw error;
  }
};

/**
 * Validate form data before submission
 * @param {Object} formData - Form data to validate
 * @returns {Object} - { isValid: boolean, errors: object }
 */
export const validateFormData = (formData) => {
  const errors = {};

  // Required fields
  if (!formData.name || formData.name.trim().length === 0) {
    errors.name = 'שם הוא שדה חובה';
  } else if (formData.name.trim().length < 2) {
    errors.name = 'שם חייב להכיל לפחות 2 תווים';
  }

  if (!formData.title || formData.title.trim().length === 0) {
    errors.title = 'כותרת היא שדה חובה';
  } else if (formData.title.trim().length < 3) {
    errors.title = 'כותרת חייבת להכיל לפחות 3 תווים';
  }

  if (!formData.content || formData.content.trim().length === 0) {
    errors.content = 'תוכן הסיפור הוא שדה חובה';
  } else if (formData.content.trim().length < 50) {
    errors.content = 'הסיפור חייב להכיל לפחות 50 תווים';
  } else if (formData.content.trim().length > 5000) {
    errors.content = 'הסיפור לא יכול להכיל יותר מ-5000 תווים';
  }

  // Optional email validation
  if (formData.email && formData.email.trim().length > 0) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = 'כתובת אימייל לא תקינה';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate photo files
 * @param {Array} files - Array of File objects
 * @returns {Object} - { isValid: boolean, error: string }
 */
export const validatePhotos = (files) => {
  const maxFiles = 3;
  const maxSizePerFile = 5 * 1024 * 1024; // 5MB per file
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

  if (files.length > maxFiles) {
    return {
      isValid: false,
      error: `ניתן להעלות עד ${maxFiles} תמונות בלבד`,
    };
  }

  for (const file of files) {
    if (!allowedTypes.includes(file.type)) {
      return {
        isValid: false,
        error: 'סוג קובץ לא נתמך. אנא העלה תמונות בפורמט JPG, PNG או GIF',
      };
    }

    if (file.size > maxSizePerFile) {
      return {
        isValid: false,
        error: `גודל הקובץ ${file.name} חורג מהמותר (מקסימום 5MB)`,
      };
    }
  }

  return { isValid: true, error: null };
};
