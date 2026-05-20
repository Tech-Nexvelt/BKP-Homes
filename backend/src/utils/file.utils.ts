import { cloudinary } from '../config/cloudinary.config';
import { logger } from './logger';
import path from 'path';

const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.pdf'];
const MAX_FILE_SIZE_MB = 5;

export const validateFileExtension = (filename: string): boolean => {
  const ext = path.extname(filename).toLowerCase();
  return ALLOWED_EXTENSIONS.includes(ext);
};

export const validateFileSize = (sizeBytes: number): boolean => {
  return sizeBytes <= MAX_FILE_SIZE_MB * 1024 * 1024;
};

export const uploadToCloudinary = async (
  filePath: string,
  folder = 'luxora',
): Promise<string> => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: 'auto',
      quality: 'auto',
      fetch_format: 'auto',
    });
    return result.secure_url;
  } catch (error) {
    logger.error('Cloudinary upload failed:', error);
    throw new Error('File upload failed');
  }
};

export const uploadBufferToCloudinary = async (
  buffer: Buffer,
  originalName: string,
  folder = 'luxora',
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'auto',
        quality: 'auto',
        fetch_format: 'auto',
        public_id: `${Date.now()}-${path.basename(originalName, path.extname(originalName))}`,
      },
      (error, result) => {
        if (error || !result) {
          logger.error('Cloudinary stream upload failed:', error);
          reject(new Error('File upload failed'));
          return;
        }
        resolve(result.secure_url);
      },
    );
    uploadStream.end(buffer);
  });
};

export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    logger.error('Cloudinary delete failed:', error);
  }
};

export const getPublicIdFromUrl = (url: string): string => {
  const parts = url.split('/');
  const filename = parts[parts.length - 1] ?? '';
  return filename.replace(/\.[^/.]+$/, '');
};
