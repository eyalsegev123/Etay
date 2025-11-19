import { Modal, Box, IconButton, Typography, Fade, Backdrop } from "@mui/material";
import {
  ArrowBackIosNew as ArrowBackIcon,
  ArrowForwardIos as ArrowForwardIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

// ==========================================
// Sub-components
// ==========================================

const CloseButton = ({ onClick }) => (
  <Box 
    sx={{ 
      position: 'absolute', 
      top: 0, 
      right: 0, 
      zIndex: 10, 
      p: 2 
    }}
  >
    <IconButton
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      sx={{
        color: "white",
        bgcolor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(4px)",
        '&:hover': { bgcolor: "rgba(255, 255, 255, 0.2)" }
      }}
    >
      <CloseIcon />
    </IconButton>
  </Box>
);

const NavButton = ({ direction, onClick }) => {
  const isLeft = direction === 'left';
  const Icon = isLeft ? ArrowBackIcon : ArrowForwardIcon;
  
  return (
    <IconButton
      onClick={(e) => { 
        e.stopPropagation(); 
        onClick(); 
      }}
      sx={{
        position: "absolute",
        [isLeft ? 'left' : 'right']: { xs: 10, md: 20 },
        color: "white",
        bgcolor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(4px)",
        '&:hover': { bgcolor: "rgba(255, 255, 255, 0.2)" },
        zIndex: 5,
      }}
    >
      <Icon />
    </IconButton>
  );
};

const GalleryImage = ({ photo }) => {
  // Prioritize thumbnailSrc (with high-res modifier) because direct src often 403s
  const imageSrc = photo?.thumbnailSrc 
    ? photo.thumbnailSrc.replace(/=s\d+.*$/, "=s2048") 
    : photo?.src;

  return (
    <Box
      component="img"
      src={imageSrc}
      alt={photo?.title}
      referrerPolicy="no-referrer"
      onClick={(e) => e.stopPropagation()} // Don't close when clicking image
      sx={{
        maxWidth: "100%",
        maxHeight: "100%",
        objectFit: "contain",
        boxShadow: "0 0 20px rgba(0,0,0,0.5)",
        borderRadius: 1,
      }}
    />
  );
};

const CaptionOverlay = ({ photo }) => {
  if (!photo?.title && !photo?.year && !photo?.category) return null;

  return (
    <Box
      onClick={(e) => e.stopPropagation()}
      sx={{
        p: 3,
        background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)",
        color: "white",
        textAlign: "center",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 4,
      }}
    >
       {photo?.title && (
         <Typography variant="h6" sx={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)', fontWeight: 500 }}>
            {photo.title}
         </Typography>
       )}
       <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 0.5, opacity: 0.8 }}>
         {photo?.category && (
           <Typography variant="body2">
              {photo.category}
           </Typography>
         )}
         {photo?.year && (
           <Typography variant="body2">
              {photo.year}
           </Typography>
         )}
       </Box>
    </Box>
  );
};

// ==========================================
// Main Component
// ==========================================

export default function GalleryModal({ photo, onClose, onNavigate }) {
  if (!photo) return null;

  return (
    <Modal
      open={!!photo}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
          style: { backgroundColor: 'rgba(0, 0, 0, 0.95)' }
        },
      }}
    >
      <Fade in={!!photo}>
        <Box
          onClick={onClose} // Click anywhere to close
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            outline: "none",
            display: "flex",
            flexDirection: "column",
            bgcolor: "transparent",
          }}
        >
          <CloseButton onClick={onClose} />

          <Box
            sx={{
              flex: 1,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              px: { xs: 2, md: 8 },
              py: 4,
            }}
          >
            <NavButton direction="left" onClick={() => onNavigate(-1)} />
            <GalleryImage photo={photo} />
            <NavButton direction="right" onClick={() => onNavigate(1)} />
          </Box>

          <CaptionOverlay photo={photo} />
        </Box>
      </Fade>
    </Modal>
  );
}
