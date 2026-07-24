import { useState } from 'react';
import { uploadDocument } from '../services/documents';

export function useUpload() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const upload = async (file) => {
    setUploading(true);
    setProgress(0);
    setError(null);

    try {
      const result = await uploadDocument(file, (e) => {
        const pct = Math.round((e.loaded * 100) / e.total);
        setProgress(pct);
      });
      return result;
    } catch (err) {
      const msg = err.response?.data?.detail || err.message || 'Upload failed';
      setError(msg);
      throw err;
    } finally {
      setUploading(false);
    }
  };

  return { upload, uploading, progress, error, clearError: () => setError(null) };
}
