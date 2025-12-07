import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// MUI components
import {
  Box,
  Container,
  Button,
  Alert,
} from "@mui/material";

// MUI icons
import {
  Google as GoogleIcon,
} from "@mui/icons-material";

// Project services
import googleDriveService from "../services/googleDriveService";

// Project components
import GalleryHeader from "../components/GalleryHeader";
import GalleryModal from "../components/GalleryModal";
import GalleryGrid, { GalleryLoading, GalleryEmptyState } from "../components/GalleryGrid";


const PhotosPage = () => {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false); // State for pagination loading
  const [error, setError] = useState(null);
  const [nextPageToken, setNextPageToken] = useState(null); // Token for next page
  const [totalPhotosCount, setTotalPhotosCount] = useState(0); // Total count from drive

  // Initialize and fetch photos
  useEffect(() => {
    const bootstrapGallery = async () => {
      try {
        setLoading(true);
        // Reset state on initial load
        setPhotos([]);
        setNextPageToken(null);
        
        // Load initial batch
        await loadPhotosFromDrive();
        
        // Fetch total count in background
        googleDriveService.getPhotoCount().then(count => {
          setTotalPhotosCount(count);
        });
        
      } catch (err) {
        console.error("Error loading photos:", err);
        setError("Failed to connect to Google Drive. Please try again later.");
        setLoading(false);
      }
    };

    bootstrapGallery();
  }, []);

  // Fetch photos from Google Drive
  const loadPhotosFromDrive = async (pageToken = null) => {
    try {
      setError(null);
      if (pageToken) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const { photos: newPhotos, nextPageToken: newToken } = await googleDriveService.getPhotos(50, pageToken); // Fetch 50 at a time
      
      setPhotos(prev => pageToken ? [...prev, ...newPhotos] : newPhotos);
      setNextPageToken(newToken);
      
    } catch (err) {
      console.error("Error fetching photos:", err);
      setError("Failed to load photos. Please refresh and try again.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Load more photos
  const handleLoadMore = () => {
    if (nextPageToken) {
      loadPhotosFromDrive(nextPageToken);
    }
  };

  // Get current photo index
  const currentPhotoIndex = selectedImage
    ? photos.findIndex((photo) => photo.id === selectedImage.id)
    : -1;

  // Navigate to next/previous image in modal
  const handleNavigateSelectedImage = (direction) => {
    if (photos.length === 0) return;

    let newIndex = currentPhotoIndex + direction;

    if (newIndex < 0) newIndex = photos.length - 1;
    if (newIndex >= photos.length) newIndex = 0;

    setSelectedImage(photos[newIndex]);
  };

  const galleryStats = {
    totalPhotos: totalPhotosCount || photos.length, // Use total count if available, else loaded count
  };

  const handlePhotoSelect = (photo) => setSelectedImage(photo);
  const handleCloseLightbox = () => setSelectedImage(null);

  return (
    <Box sx={{ minHeight: "100vh", py: { xs: 4, md: 8 }, bgcolor: "grey.50" }}>
      <Container maxWidth="xl">
        <GalleryHeader onBack={() => navigate(-1)} statistics={galleryStats} />

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
            <Button
              variant="outlined"
              size="small"
              startIcon={<GoogleIcon />}
              onClick={loadPhotosFromDrive}
              sx={{ ml: 2 }}
            >
              נסה שוב
            </Button>
          </Alert>
        )}

        {loading ? (
          <GalleryLoading />
        ) : !error && photos.length > 0 ? (
          <>
            <GalleryGrid photos={photos} onSelectPhoto={handlePhotoSelect} />
            
            {/* Load More Button */}
            {nextPageToken && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 2 }}>
                <Button 
                  variant="outlined" 
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  size="large"
                  sx={{ minWidth: 200 }}
                >
                  {loadingMore ? 'טוען...' : 'טען עוד תמונות'}
                </Button>
              </Box>
            )}
          </>
        ) : !error ? (
          <GalleryEmptyState />
        ) : null}

        <GalleryModal
          photo={selectedImage}
          onClose={handleCloseLightbox}
          onNavigate={handleNavigateSelectedImage}
        />
      </Container>
    </Box>
  );
};

export default PhotosPage;
