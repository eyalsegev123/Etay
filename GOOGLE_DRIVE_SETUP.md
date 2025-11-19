# Google Drive Integration Setup

This document provides step-by-step instructions on how to set up Google Drive integration for the photo gallery.

## Prerequisites

- A Google account
- A Google Drive folder with photos to display in the gallery

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select an existing one)
3. Give your project a name related to the memorial website (e.g., "Itay Memorial Site")

## Step 2: Enable Google Drive API

1. In your Google Cloud project, go to "APIs & Services" > "Library"
2. Search for "Google Drive API" and click on it
3. Click "Enable"

## Step 3: Create API Key

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" and select "API Key"
3. Copy the API key
4. Click "Restrict Key" to limit access to only the Google Drive API

## Step 4: Update the Website Configuration

1. In the `frontend/` directory, create a file named `.env`.
2. Add the following lines, replacing the placeholders with your actual values:
   ```
   REACT_APP_GOOGLE_API_KEY=YOUR_GOOGLE_API_KEY
   REACT_APP_GOOGLE_DRIVE_FOLDER_ID=YOUR_GOOGLE_DRIVE_FOLDER_ID
   ```
3. Keep this file private (it is listed in `.gitignore`). When deploying, copy the same file or set the matching environment variables on your hosting provider.
4. Restart the dev server (`npm start`) so the env vars take effect.

## Step 5: Get Your Google Drive Folder ID

1. Open Google Drive
2. Navigate to the folder containing the photos
3. Look at the URL in your browser. It should look like:
   `https://drive.google.com/drive/folders/1a2b3c4d5e6f7g8h9i0j`
4. The part after "folders/" is your folder ID (in this example: `1a2b3c4d5e6f7g8h9i0j`)
5. Update the `PHOTOS_FOLDER_ID` in the code with this value

## Step 6: Organize Photos in Google Drive

For best results, organize your photos in Google Drive as follows:

1. Create a main folder for all photos
2. You can create subfolders by category if desired
3. Use meaningful file names - these will be displayed as titles in the gallery
4. Image titles in the gallery are derived from file names, replacing underscores with spaces
5. The date/year information is taken from the file's creation date in Google Drive

## Step 7: Share the Folder Correctly

For the read-only gallery to work with just an API key, the Drive folder must be shared as "Anyone with the link → Viewer". This lets the site list photos without requiring visitors to sign in, while uploads remain manual via Drive.
