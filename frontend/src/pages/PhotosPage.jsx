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
  const [error, setError] = useState(null);

  // Initialize and fetch photos
  useEffect(() => {
    const bootstrapGallery = async () => {
      try {
        setLoading(true);
        await loadPhotosFromDrive();
      } catch (err) {
        console.error("Error loading photos:", err);
        setError("Failed to connect to Google Drive. Please try again later.");
        setLoading(false);
      }
    };

    bootstrapGallery();
  }, []);

  // Fetch photos from Google Drive
  const loadPhotosFromDrive = async () => {
    try {
      setLoading(true);
      const photoData = await googleDriveService.getPhotos();
      setPhotos(photoData);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching photos:", err);
      setError("Failed to load photos. Please refresh and try again.");
      setLoading(false);
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
    totalPhotos: photos.length,
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
          <GalleryGrid photos={photos} onSelectPhoto={handlePhotoSelect} />
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
