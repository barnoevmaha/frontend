import { useNavigate } from 'react-router-dom';
import { formatFileSize, formatDate } from '../utils/format';

export default function DocumentCard({ doc, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="document-card">
      <div className="document-info">
        <h3 className="document-name">{doc.filename}</h3>
        <p className="document-meta">
          {formatFileSize(doc.file_size)} &middot; {doc.file_type} &middot; {doc.chunk_count} chunks
          {doc.page_count != null && ` \u00B7 ${doc.page_count} pages`}
        </p>
        <p className="document-date">{formatDate(doc.created_at)}</p>
      </div>
      <div className="document-actions">
        <button className="btn btn-primary" onClick={() => navigate(`/chat/${doc.id}`)}>
          Chat
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(doc.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
