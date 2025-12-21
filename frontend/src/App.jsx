import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { Analytics } from "@vercel/analytics/react";
import theme from "./theme";
import HomePage from "./pages/HomePage";
import StoryPage from "./pages/StoryPage";
import PhotosPage from "./pages/PhotosPage";
import NotFoundPage from "./pages/NotFoundPage";
import ErrorBoundary from "./components/ErrorBoundary";
import NewsletterModal, { shouldAutoShowModal, isUserSubscribed } from "./components/NewsletterModal";
import NewsletterFloatingButton from "./components/NewsletterFloatingButton";
import googleDriveService from "./services/googleDriveService";
import "./styles/App.css";

// Wrapper component that uses location
const AppContent = () => {
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Pre-load Google API script and initialize the service
  useEffect(() => {
    const initializeGoogleDrive = async () => {
      try {
        await googleDriveService.loadGoogleApiScript();
        await googleDriveService.initialize();
        console.log("Google Drive service initialized successfully");
      } catch (err) {
        console.error("Failed to initialize Google Drive service:", err);
      }
    };

    initializeGoogleDrive();
  }, []);

  // Handle newsletter modal auto-show on initial load
  useEffect(() => {
    // Small delay to let the page load first
    const timer = setTimeout(() => {
      if (shouldAutoShowModal()) {
        setShowNewsletterModal(true);
      } else {
        // User has already interacted before, just show the button
        // (unless they're already subscribed - then we might want to hide it)
        if (!isUserSubscribed()) {
          setShowFloatingButton(true);
        }
      }
      setHasInteracted(true);
    }, 1500); // 1.5 second delay for better UX

    return () => clearTimeout(timer);
  }, []);

  const handleCloseNewsletterModal = () => {
    setShowNewsletterModal(false);
    // Show floating button after modal is closed (unless subscribed)
    if (!isUserSubscribed()) {
      setShowFloatingButton(true);
    }
  };

  const handleSubscribe = () => {
    // User successfully subscribed
    // We could hide the floating button, or keep it for reference
    // For now, let's hide it since they're subscribed
    setShowFloatingButton(false);
  };

  const handleOpenNewsletterModal = () => {
    setShowNewsletterModal(true);
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/story/:id" element={<StoryPage />} />
        <Route path="/photos" element={<PhotosPage />} />
        {/* Catch-all route for 404 - must be last */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* Newsletter Modal */}
      <NewsletterModal
        open={showNewsletterModal}
        onClose={handleCloseNewsletterModal}
        onSubscribe={handleSubscribe}
      />

      {/* Floating Newsletter Button */}
      <NewsletterFloatingButton
        visible={showFloatingButton && hasInteracted}
        onClick={handleOpenNewsletterModal}
      />
    </div>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Analytics />
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
