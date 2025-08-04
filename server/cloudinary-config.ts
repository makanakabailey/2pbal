import { v2 as cloudinary } from 'cloudinary';

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

// Debug logging (can be removed in production)
console.log('Cloudinary config status:', {
  cloud_name: !!process.env.CLOUDINARY_CLOUD_NAME,
  api_key: !!process.env.CLOUDINARY_API_KEY,
  api_secret: !!process.env.CLOUDINARY_API_SECRET
});

export default cloudinary;

// Helper function to upload file buffer to Cloudinary
export async function uploadToCloudinary(
  fileBuffer: Buffer,
  originalName: string,
  folder?: string,
  resourceType: 'image' | 'video' | 'raw' | 'auto' = 'auto'
): Promise<{
  public_id: string;
  secure_url: string;
  original_filename: string;
  format: string;
  resource_type: string;
  bytes: number;
}> {
  return new Promise((resolve, reject) => {
    const uploadOptions: any = {
      resource_type: resourceType
    };
    
    if (folder && folder.trim()) {
      uploadOptions.folder = folder;
    }
    
    console.log('Cloudinary upload options:', uploadOptions);
    
    // Try base64 upload instead of stream upload to avoid signature issues
    const base64Data = `data:${resourceType === 'raw' ? 'application/octet-stream' : 'image/jpeg'};base64,${fileBuffer.toString('base64')}`;
    
    cloudinary.uploader.upload(
      base64Data,
      uploadOptions,
      (error, result) => {
        if (error) {
          reject(error);
        } else if (result) {
          resolve({
            public_id: result.public_id,
            secure_url: result.secure_url,
            original_filename: originalName,
            format: result.format,
            resource_type: result.resource_type,
            bytes: result.bytes,
          });
        } else {
          reject(new Error('Upload failed'));
        }
      }
    ).end(fileBuffer);
  });
}

// Helper function to delete file from Cloudinary
export async function deleteFromCloudinary(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw error;
  }
}

// Helper function to get optimized URL
export function getOptimizedUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    quality?: string;
    format?: string;
  } = {}
): string {
  return cloudinary.url(publicId, {
    transformation: [
      {
        width: options.width,
        height: options.height,
        crop: 'fill',
        quality: options.quality || 'auto',
        fetch_format: options.format || 'auto',
      },
    ],
  });
}