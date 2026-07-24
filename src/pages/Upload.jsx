import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileDropzone from '../components/FileDropzone';
import ProgressBar from '../components/ProgressBar';
import { useUpload } from '../hooks/useUpload';
import { useAppContext } from '../context/AppContext';

const MAX_SIZE = 50 * 1024 * 1024;

export default function Upload() {
  const { upload, uploading, progress, error, clearError } = useUpload();
  const { triggerRefresh } = useAppContext();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [validationError, setValidationError] = useState(null);

  const handleFile = (file) => {
    clearError();
    setValidationError(null);

    if (file.size > MAX_SIZE) {
      setValidationError('File exceeds 50 MB limit');
      return;
    }

    const ext = '.' + file.name.split('.').pop().toLowerCase();
    if (!['.pdf', '.docx', '.txt'].includes(ext)) {
      setValidationError('Unsupported file type. Use PDF, DOCX, or TXT.');
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    try {
      await upload(selectedFile);
      triggerRefresh();
      navigate('/documents');
    } catch {
      // error handled in hook
    }
  };

  return (
    <div className="page upload-page">
      <h1>Upload Document</h1>
      <FileDropzone onFile={handleFile} disabled={uploading} />
      {selectedFile && !uploading && (
        <div className="file-info">
          <p><strong>File:</strong> {selectedFile.name}</p>
          <p><strong>Size:</strong> {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
          <button className="btn btn-primary" onClick={handleUpload}>Upload</button>
        </div>
      )}
      {uploading && <ProgressBar progress={progress} />}
      {validationError && <p className="error-text">{validationError}</p>}
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}
