/**
 * Simple Google Drive Service
 * 
 * This service fetches photos from a specific Google Drive folder without requiring
 * visitors to authenticate. Only the site owner needs to set up API access.
 */

// Environment configuration (set in .env)
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;  // API key from your Google Cloud project
const PHOTOS_FOLDER_ID = process.env.REACT_APP_GOOGLE_DRIVE_FOLDER_ID;  // The folder containing photos

const ensureConfig = () => {
  if (!API_KEY || !PHOTOS_FOLDER_ID) {
    const missing = [];
    if (!API_KEY) missing.push('REACT_APP_GOOGLE_API_KEY');
    if (!PHOTOS_FOLDER_ID) missing.push('REACT_APP_GOOGLE_DRIVE_FOLDER_ID');
    throw new Error(`Missing Google Drive config: ${missing.join(', ')}. Make sure they are set in your .env file.`);
  }
};

// API configuration
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];

// Load the Google API script
const loadGoogleApiScript = () => {
  return new Promise((resolve, reject) => {
    // If gapi is already available, resolve immediately
    if (window.gapi) {
      resolve();
      return;
    }

    const existingScript = document.querySelector('script[src="https://apis.google.com/js/api.js"]');
    if (existingScript) {
      existingScript.addEventListener('load', resolve, { once: true });
      existingScript.addEventListener('error', reject, { once: true });
      return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

// Initialize Google API client (API key only, no OAuth)
const initClient = async () => {
  ensureConfig();
  try {
    await loadGoogleApiScript();
    
    return new Promise((resolve, reject) => {
      window.gapi.load('client', () => {
        window.gapi.client.init({
          apiKey: API_KEY,
          discoveryDocs: DISCOVERY_DOCS,
        }).then(resolve).catch(reject);
      });
    });
  } catch (error) {
    console.error("Failed to initialize Google API:", error);
    throw error;
  }
};

// Simple service object with core functionality
const googleDriveService = {
  // Get all photos from the specified folder with pagination support
  getPhotos: async (pageSize = 100, pageToken = null) => {
    try {
      ensureConfig();
      await initClient();
      
      // Make sure the photos folder is publicly accessible or shared with anyone with the link
      // Get images from the folder
      const params = {
        q: `'${PHOTOS_FOLDER_ID}' in parents and mimeType contains 'image/' and trashed=false`,
        fields: 'nextPageToken, files(id, name, thumbnailLink, createdTime)',
        orderBy: 'createdTime desc',
        pageSize: pageSize
      };
      
      if (pageToken) {
        params.pageToken = pageToken;
      }
      
      const response = await window.gapi.client.drive.files.list(params);
      
      const files = response.result.files || [];
      const nextPageToken = response.result.nextPageToken || null;
      
      // Transform into simple photo objects
      const photos = files.map(file => ({
        id: file.id,
        src: `https://drive.google.com/uc?export=view&id=${file.id}`,
        thumbnailSrc: file.thumbnailLink,
        title: file.name.replace(/\.[^/.]+$/, "").replace(/_/g, " "),
        year: new Date(file.createdTime).getFullYear().toString(),
        dateCreated: file.createdTime
      }));
      
      return { photos, nextPageToken };
      
    } catch (error) {
      console.error("Error fetching photos:", error);
      return { photos: [], nextPageToken: null }; // Return empty on error
    }
  },
  
  // Get total count of photos in the folder (optimized query)
  getPhotoCount: async () => {
    try {
      ensureConfig();
      await initClient();
      
      let total = 0;
      let pageToken = null;
      
      do {
        const params = {
          q: `'${PHOTOS_FOLDER_ID}' in parents and mimeType contains 'image/' and trashed=false`,
          fields: 'nextPageToken, files(id)', // Only fetch IDs to minimize data transfer
          pageSize: 1000 // Max page size for faster counting
        };
        
        if (pageToken) {
          params.pageToken = pageToken;
        }
        
        const response = await window.gapi.client.drive.files.list(params);
        const files = response.result.files || [];
        total += files.length;
        
        pageToken = response.result.nextPageToken;
      } while (pageToken);
      
      return total;
    } catch (error) {
      console.error("Error counting photos:", error);
      return 0;
    }
  },

  // Get a single photo by ID
  getPhotoById: async (id) => {
    try {
      ensureConfig();
      await initClient();
      
      const response = await window.gapi.client.drive.files.get({
        fileId: id,
        fields: 'id, name, thumbnailLink, createdTime'
      });
      
      const file = response.result;
      
      return {
        id: file.id,
        src: `https://drive.google.com/uc?export=view&id=${file.id}`,
        thumbnailSrc: file.thumbnailLink,
        title: file.name.replace(/\.[^/.]+$/, "").replace(/_/g, " "),
        year: new Date(file.createdTime).getFullYear().toString(),
        dateCreated: file.createdTime
      };
      
    } catch (error) {
      console.error("Error fetching photo by ID:", error);
      throw new Error('Failed to fetch the photo');
    }
  },
  
  // Initialize the API
  initialize: async () => {
    try {
      await initClient();
      return true;
    } catch (error) {
      console.error("Failed to initialize Google Drive service:", error);
      return false;
    }
  },
  
  // Load the Google API script (exported for use in App.jsx)
  loadGoogleApiScript
};

export default googleDriveService;
