import { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import theme from "./theme";
import HomePage from "./pages/HomePage";
import StoryPage from "./pages/StoryPage";
import PhotosPage from "./pages/PhotosPage";
import NotFoundPage from "./pages/NotFoundPage";
import ErrorBoundary from "./components/ErrorBoundary";
import googleDriveService from "./services/googleDriveService";
import "./styles/App.css";

// Wrapper component that uses location
const AppContent = () => {
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

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/story/:id" element={<StoryPage />} />
        <Route path="/photos" element={<PhotosPage />} />
        {/* Catch-all route for 404 - must be last */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
