# Streaming Admin Backend(suapensed)
- **see this service** [streaming user backned](https://stream-admin-backned.onrender.com)  
This is the backend service for a song album streaming app, designed for admin operations. The primary functions allow an admin to upload, create, and delete album and track data.

## 🔗 Project Position in Full System

- **Frontend (User side perform on netlify):** [streaming-frontend](https://github.com/sana2912/streaming-frontend.git)  
- **Backend (User side perform on render):** [streaming-user-backend](https://github.com/sana2912/streaming-user-backend.git)  
- **Frontend (Admin side perfrom on netlify):** [stream_admin_ui](https://github.com/sana2912/stream_admin_ui.git)  
- **Backend (Admin side perfom on render):** **this project**
- **for more understanding see full systems picture:** [image](https://res.cloudinary.com/ddlspu2uq/image/upload/v1756123510/system_d4p3cd.jpg)  

## Features

- **Create Album Data**: Add new albums with metadata and tracks.
- **Create Track Data**: Upload individual song tracks, including metadata.
- **Delete Album Data**: Remove albums and associated tracks.
- **Delete Track Data**: Remove individual tracks from albums.

## App Flow

1. **Request Handling**: Data is received from client requests.
2. **Multer Middleware**: Handles file uploads (track files).
3. **Business Logic**: Uploaded files are sent to Cloudinary for storage, and metadata/info is saved to MongoDB Atlas.
4. **Response**: Appropriate success or error messages are sent back to the client.

## Technologies Used

- **Node.js**: JavaScript runtime for server-side development.
- **Express**: Web framework for building REST APIs.
- **Mongoose**: ODM for MongoDB, managing schemas and interactions.
- **MongoDB Atlas**: Cloud database for storing album/track metadata.
- **Multer**: Middleware for handling multipart/form-data (file uploads).
- **Cloudinary**: Cloud storage for track files.

## Getting Started

### Installation

```bash
git clone https://github.com/sana2912/stream_admin_backned.git
cd stream_admin_backned
npm install
```

### Running the App

```bash
node app.js
```

### Configuration

- Set up environment variables for MongoDB Atlas and Cloudinary in a `.env` file.

### Example `.env`:

```
MONGODB_URI=your_mongodb_atlas_uri
CLOUDINARY_URL=your_cloudinary_url
```

## API Endpoints

- `POST /albums` - Create a new album.
- `POST /tracks` - Upload a new track.
- `DELETE /albums/:id` - Delete an album by ID.
- `DELETE /tracks/:id` - Delete a track by ID.
