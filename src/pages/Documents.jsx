import { useDocuments } from '../hooks/useDocuments';
import DocumentCard from '../components/DocumentCard';
import { useAppContext } from '../context/AppContext';

export default function Documents() {
  const { refreshTrigger } = useAppContext();
  const { documents, loading, deleteDoc } = useDocuments(refreshTrigger);

  if (loading) return <div className="page"><p>Loading documents...</p></div>;

  return (
    <div className="page documents-page">
      <h1>Documents</h1>
      {documents.length === 0 ? (
        <p className="empty-state">No documents uploaded yet.</p>
      ) : (
        <div className="document-list">
          {documents.map((doc) => (
            <DocumentCard key={doc.id} doc={doc} onDelete={deleteDoc} />
          ))}
        </div>
      )}
    </div>
  );
}
