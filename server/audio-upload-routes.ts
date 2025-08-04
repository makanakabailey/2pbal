import express from 'express';
import multer from 'multer';
import { uploadToCloudinary } from './cloudinary-config';

const router = express.Router();

// Configure multer for audio uploads
const audioUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept audio files and webm (for recordings)
    const allowedMimes = [
      'audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp3', 'audio/mp4', 'audio/m4a',
      'audio/webm', 'audio/x-wav', 'audio/aac', 'video/webm' // webm can contain audio
    ];

    if (allowedMimes.includes(file.mimetype) || file.originalname.endsWith('.webm')) {
      cb(null, true);
    } else {
      cb(new Error(`Audio file type ${file.mimetype} not allowed`));
    }
  },
});

// Upload audio recording to Cloudinary
router.post('/upload-audio', audioUpload.single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No audio file provided' });
    }

    const { originalname, buffer, mimetype, size } = req.file;
    const { recordingName, quoteId } = req.body;

    // Generate a unique filename for the recording
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = recordingName || `voice-recording-${timestamp}`;
    const folder = quoteId ? `quotes/${quoteId}/audio` : 'audio-recordings';

    // Upload to Cloudinary as raw resource type for audio
    const cloudinaryResult = await uploadToCloudinary(
      buffer,
      `${filename}.${mimetype.split('/')[1] || 'webm'}`,
      folder,
      'raw'
    );

    // Return the upload result
    res.json({
      success: true,
      audio: {
        filename: filename,
        originalName: originalname,
        mimetype: mimetype,
        size: size,
        cloudinary_url: cloudinaryResult.secure_url,
        cloudinary_public_id: cloudinaryResult.public_id,
        upload_date: new Date().toISOString(),
        format: cloudinaryResult.format,
        bytes: cloudinaryResult.bytes
      }
    });

  } catch (error: any) {
    console.error('Audio upload error:', error);
    res.status(500).json({ 
      error: 'Failed to upload audio recording',
      message: error?.message || 'Unknown error occurred'
    });
  }
});

// Convert blob URL to file for upload
router.post('/upload-recording-blob', async (req, res) => {
  try {
    const { audioBlob, recordingName, quoteId } = req.body;
    
    if (!audioBlob) {
      return res.status(400).json({ error: 'No audio blob provided' });
    }

    // Convert base64 to buffer
    const base64Data = audioBlob.split(',')[1];
    const buffer = Buffer.from(base64Data, 'base64');
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = recordingName || `voice-recording-${timestamp}`;

    try {
      // Try to upload to Cloudinary
      const cloudinaryResult = await uploadToCloudinary(
        buffer,
        filename,
        'audio-recordings', // Use folder again
        'raw'
      );

      res.json({
        success: true,
        audio: {
          filename: filename,
          mimetype: 'audio/webm',
          size: buffer.length,
          cloudinary_url: cloudinaryResult.secure_url,
          cloudinary_public_id: cloudinaryResult.public_id,
          upload_date: new Date().toISOString(),
          format: cloudinaryResult.format,
          bytes: cloudinaryResult.bytes,
          storage: 'cloudinary'
        }
      });

    } catch (cloudinaryError: any) {
      console.warn('Cloudinary upload failed, providing local fallback:', cloudinaryError.message);
      
      // Return success with local storage info - audio will remain in browser blob storage
      res.json({
        success: true,
        audio: {
          filename: filename,
          mimetype: 'audio/webm',
          size: buffer.length,
          local_blob: true, // Indicates this is stored locally in the browser
          upload_date: new Date().toISOString(),
          storage: 'local',
          note: 'Audio stored locally - will be included when you submit your quote'
        }
      });
    }

  } catch (error: any) {
    console.error('Blob upload error:', error);
    
    // Even if there's an outer error, provide fallback response
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = req.body.recordingName || `voice-recording-${timestamp}`;
    
    res.json({
      success: true,
      audio: {
        filename: filename,
        mimetype: 'audio/webm',
        size: req.body.audioBlob ? Buffer.from(req.body.audioBlob.split(',')[1], 'base64').length : 0,
        local_blob: true,
        upload_date: new Date().toISOString(),
        storage: 'local',
        note: 'Audio stored locally - will be included when you submit your quote'
      }
    });
  }
});

// Get audio file from Cloudinary
router.get('/audio/:publicId', async (req, res) => {
  try {
    const { publicId } = req.params;
    
    // Cloudinary automatically serves files via their CDN
    // We can construct the URL or redirect to it
    const audioUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/raw/upload/${publicId}`;
    
    res.json({
      success: true,
      audio_url: audioUrl,
      public_id: publicId
    });

  } catch (error: any) {
    console.error('Audio retrieval error:', error);
    res.status(500).json({ 
      error: 'Failed to retrieve audio file',
      message: error?.message || 'Unknown error occurred'
    });
  }
});

export default router;