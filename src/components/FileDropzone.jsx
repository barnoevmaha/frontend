import { useState, useRef } from 'react';

const ACCEPTED = '.pdf,.docx,.txt';

export default function FileDropzone({ onFile, disabled }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) onFile(file);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) onFile(file);
    e.target.value = '';
  };

  return (
    <div
      className={`dropzone ${dragging ? 'dropzone-active' : ''}`}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED}
        onChange={handleChange}
        hidden
        disabled={disabled}
      />
      <p className="dropzone-text">
        {dragging ? 'Drop file here' : 'Drag & drop or click to browse'}
      </p>
      <p className="dropzone-hint">PDF, DOCX, TXT supported</p>
    </div>
  );
}
