import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
  getMetadata,
  updateMetadata,
  uploadBytesResumable,
  StorageReference,
  UploadTaskSnapshot,
  UploadMetadata,
  SettableMetadata,
  ListResult,
  FullMetadata,
} from 'firebase/storage';
import { storage } from '../../config/firebase';

export interface UploadProgressListener {
  next: (snapshot: UploadTaskSnapshot) => void;
  error?: (error: Error) => void;
  complete?: () => void;
}

export class StorageService {
  private basePath: string;

  constructor(basePath: string = '') {
    this.basePath = basePath;
  }

  // Get a reference to a file or directory
  private getRef(path: string): StorageReference {
    const fullPath = this.basePath ? `${this.basePath}/${path}` : path;
    return ref(storage, fullPath);
  }

  // Upload a file
  async uploadFile(
    path: string,
    file: Blob | Uint8Array | ArrayBuffer,
    metadata?: UploadMetadata,
  ): Promise<string> {
    const fileRef = this.getRef(path);
    const uploadResult = await uploadBytes(fileRef, file, metadata);
    return await getDownloadURL(uploadResult.ref);
  }

  // Upload a file with progress tracking
  uploadFileWithProgress(
    path: string,
    file: Blob | Uint8Array | ArrayBuffer,
    progressListener: UploadProgressListener,
    metadata?: UploadMetadata,
  ): () => void {
    const fileRef = this.getRef(path);
    const uploadTask = uploadBytesResumable(fileRef, file, metadata);

    uploadTask.on(
      'state_changed',
      progressListener.next,
      progressListener.error,
      progressListener.complete,
    );

    // Return a function that can be used to cancel the upload
    return () => uploadTask.cancel();
  }

  // Get download URL for a file
  async getFileUrl(path: string): Promise<string> {
    const fileRef = this.getRef(path);
    return await getDownloadURL(fileRef);
  }

  // Delete a file
  async deleteFile(path: string): Promise<void> {
    const fileRef = this.getRef(path);
    await deleteObject(fileRef);
  }

  // List all files in a directory
  async listFiles(path: string = ''): Promise<ListResult> {
    const dirRef = this.getRef(path);
    return await listAll(dirRef);
  }

  // Get metadata for a file
  async getFileMetadata(path: string): Promise<FullMetadata> {
    const fileRef = this.getRef(path);
    return await getMetadata(fileRef);
  }

  // Update metadata for a file
  async updateFileMetadata(path: string, metadata: SettableMetadata): Promise<FullMetadata> {
    const fileRef = this.getRef(path);
    return await updateMetadata(fileRef, metadata);
  }

  // Generate a unique file name to avoid collisions
  generateUniqueFilename(originalName: string): string {
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(2, 10);

    // Extract file extension
    const lastDot = originalName.lastIndexOf('.');
    const ext = lastDot !== -1 ? originalName.substring(lastDot) : '';

    // Create filename without extension
    const nameWithoutExt = lastDot !== -1 ? originalName.substring(0, lastDot) : originalName;

    // Combine parts and ensure valid filename
    return `${nameWithoutExt.replace(/[^a-z0-9]/gi, '_')}_${timestamp}_${randomString}${ext}`;
  }

  // Get file path from URL
  getPathFromUrl(url: string): string | null {
    try {
      const storageUrl = new URL(url);
      const pathMatch = storageUrl.pathname.match(/\/o\/(.+?)(?:\?|$)/);
      if (pathMatch && pathMatch[1]) {
        return decodeURIComponent(pathMatch[1]);
      }
      return null;
    } catch (e) {
      console.error('Invalid URL format', e);
      return null;
    }
  }

  // Get file size in a human-readable format
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
