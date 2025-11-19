import { useState, useEffect } from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';
import googleDriveService from '../services/googleDriveService';
// Import static images at the top level
import pic1 from '../assets/PhotosSectionPictures/etaypic-photosection1.PNG';
import pic2 from '../assets/PhotosSectionPictures/etaypic-photosection2.PNG';
import pic3 from '../assets/PhotosSectionPictures/etaypic-photosection3.PNG';
import pic4 from '../assets/PhotosSectionPictures/etaypic-photosection4.PNG';
import pic5 from '../assets/PhotosSectionPictures/etaypic-photosection5.JPG';
import pic6 from '../assets/PhotosSectionPictures/etaypic-photosection6.JPG';
import pic7 from '../assets/PhotosSectionPictures/etaypic-photosection7.jpg';
import pic8 from '../assets/PhotosSectionPictures/etaypic-photosection8.jpg';
import pic9 from '../assets/PhotosSectionPictures/etaypic-photosection9.PNG';
import pic10 from '../assets/PhotosSectionPictures/etaypic-photosection10.PNG';
import pic11 from '../assets/PhotosSectionPictures/etaypic-photosection11.PNG';
import pic12 from '../assets/PhotosSectionPictures/etaypic-photosection12.jpg';

// Define static images array at the top level
const staticImages = [
  [pic1, pic2, pic3],
  [pic4, pic5, pic6],
  [pic7, pic8, pic9],
  [pic10, pic11, pic12],
];

export function MasonryGridGallery() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        // No need to check for sign-in or initialize - App.jsx handles initialization
        // Just fetch photos directly
        const photoData = await googleDriveService.getPhotos();
        
        // Take only the first 12 photos for the grid
        const limitedPhotos = photoData.slice(0, 12);
        
        // Organize photos into 4 columns
        const columns = [[], [], [], []];
        limitedPhotos.forEach((photo, index) => {
          columns[index % 4].push(photo);
        });
        
        setPhotos(columns);
      } catch (err) {
        console.error('Error fetching photos for home grid:', err);
        setError('Could not load photos');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPhotos();
  }, []);
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (error) {
    return (
      <Typography color="error" align="center">
        {error}
      </Typography>
    );
  }
  
  // Fallback to static images if no photos from Google Drive
  if (photos.flat().length === 0) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {staticImages.map((column, index) => (
          <div key={index} className="grid gap-4">
            {column.map((image, imgIndex) => (
              <img
                key={imgIndex}
                className="w-full aspect-[3/4] rounded-lg object-cover"
                src={image}
                alt={`gallery-photo-${imgIndex}`}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {photos.map((column, index) => (
        <div key={index} className="grid gap-4">
          {column.map((photo, imgIndex) => (
            <img
              key={photo.id || imgIndex}
              className="w-full aspect-[3/4] rounded-lg object-cover"
              src={photo.thumbnailSrc || photo.src}
              alt={photo.title || `gallery-photo-${imgIndex}`}
              referrerPolicy="no-referrer"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
