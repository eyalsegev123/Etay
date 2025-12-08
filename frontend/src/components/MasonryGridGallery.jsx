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

// Cache for photos to avoid refetching on remount
let photosCache = null;
let isLoading = false;
const loadingPromise = { current: null };

// Reusable image component with hover effect
const GalleryImage = ({ src, alt }) => (
  <div className="relative overflow-hidden rounded-xl group cursor-pointer">
    <img
      className="w-full aspect-[3/4] object-cover transition-transform duration-500 ease-out group-hover:scale-110"
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
    />
    {/* Hover overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </div>
);

export function MasonryGridGallery() {
  const [photos, setPhotos] = useState(photosCache || []);
  const [loading, setLoading] = useState(!photosCache);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // If we already have cached photos, use them immediately
    if (photosCache) {
      setPhotos(photosCache);
      setLoading(false);
      return;
    }
    
    // If already loading, wait for that promise
    if (isLoading && loadingPromise.current) {
      loadingPromise.current.then(() => {
        if (photosCache) {
          setPhotos(photosCache);
          setLoading(false);
        }
      });
      return;
    }
    
    isLoading = true;
    
    const fetchPhotos = async () => {
      try {
        const { photos: photoData } = await googleDriveService.getPhotos(12);
        
        // Take only the first 12 photos for the grid
        const limitedPhotos = photoData.slice(0, 12);
        
        // Organize photos into 4 columns
        const columns = [[], [], [], []];
        limitedPhotos.forEach((photo, index) => {
          columns[index % 4].push(photo);
        });
        
        photosCache = columns;
        setPhotos(columns);
      } catch (err) {
        console.error('Error fetching photos for home grid:', err);
        setError('Could not load photos');
      } finally {
        setLoading(false);
        isLoading = false;
      }
    };
    
    loadingPromise.current = fetchPhotos();
  }, []);
  
  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          p: 8,
        }}
      >
        <CircularProgress 
          sx={{ 
            color: 'primary.main',
          }} 
        />
      </Box>
    );
  }
  
  if (error) {
    return (
      <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
        {error}
      </Typography>
    );
  }
  
  // Fallback to static images if no photos from Google Drive
  if (photos.flat().length === 0) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {staticImages.map((column, index) => (
          <div key={index} className="grid gap-3 md:gap-4">
            {column.map((image, imgIndex) => (
              <GalleryImage
                key={imgIndex}
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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      {photos.map((column, index) => (
        <div key={index} className="grid gap-3 md:gap-4">
          {column.map((photo, imgIndex) => (
            <GalleryImage
              key={photo.id || imgIndex}
              src={photo.thumbnailSrc || photo.src}
              alt={photo.title || `gallery-photo-${imgIndex}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
