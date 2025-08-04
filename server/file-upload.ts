import multer from 'multer';
import { uploadToCloudinary, deleteFromCloudinary } from './cloudinary-config';

// Configure multer for memory storage (no local file storage)
const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow all common file types
    const allowedMimes = [
      // Images
      'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/bmp', 'image/svg+xml',
      // Videos
      'video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'video/flv', 'video/webm', 'video/mkv',
      // Documents
      'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/plain', 'text/csv', 'application/rtf',
      // Archives
      'application/zip', 'application/x-rar-compressed', 'application/x-tar', 'application/gzip',
      // Audio
      'audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp3', 'audio/mp4',
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`File type ${file.mimetype} not allowed`));
    }
  },
});

// Helper function to upload files to Cloudinary
export async function uploadFiles(
  files: Express.Multer.File[],
  folder: string = 'uploads'
): Promise<{
  filename: string;
  mimetype: string;
  size: number;
  cloudinary_url: string;
  cloudinary_public_id: string;
  upload_date: string;
}[]> {
  const uploadPromises = files.map(async (file) => {
    // Determine resource type based on mimetype
    let resourceType: 'image' | 'video' | 'raw' | 'auto' = 'raw';
    if (file.mimetype.startsWith('image/')) {
      resourceType = 'image';
    } else if (file.mimetype.startsWith('video/')) {
      resourceType = 'video';
    } else if (file.mimetype.startsWith('audio/')) {
      resourceType = 'raw'; // Audio files are handled as raw in Cloudinary
    }

    const result = await uploadToCloudinary(
      file.buffer,
      file.originalname,
      folder,
      resourceType
    );

    return {
      filename: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      cloudinary_url: result.secure_url,
      cloudinary_public_id: result.public_id,
      upload_date: new Date().toISOString(),
    };
  });

  return Promise.all(uploadPromises);
}

// Helper function to delete files from Cloudinary
export async function deleteFiles(publicIds: string[]): Promise<void> {
  const deletePromises = publicIds.map(deleteFromCloudinary);
  await Promise.all(deletePromises);
}

// Helper function to get file type category
export function getFileCategory(mimetype: string): 'image' | 'video' | 'document' | 'audio' | 'archive' | 'other' {
  if (mimetype.startsWith('image/')) return 'image';
  if (mimetype.startsWith('video/')) return 'video';
  if (mimetype.startsWith('audio/')) return 'audio';
  if (mimetype.includes('pdf') || mimetype.includes('document') || mimetype.includes('sheet') || mimetype.includes('presentation') || mimetype.includes('text')) {
    return 'document';
  }
  if (mimetype.includes('zip') || mimetype.includes('rar') || mimetype.includes('tar') || mimetype.includes('gzip')) {
    return 'archive';
  }
  return 'other';
}