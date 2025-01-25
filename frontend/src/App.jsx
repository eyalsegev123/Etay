import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import theme from './theme';
import HomePage from './pages/HomePage';
import StoryPage from './pages/StoryPage';
import PhotosPage from './pages/PhotosPage'; // Add this import
import Header from './components/Header';
import './styles/App.css';

// Wrapper component that uses location
const AppContent = () => {
  const location = useLocation();
  const isStoryPage = location.pathname.startsWith('/story/');

  return (
    <div className="App">
      <Header hide={isStoryPage} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/story/:id" element={<StoryPage />} />
        <Route path="/photos" element={<PhotosPage />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
