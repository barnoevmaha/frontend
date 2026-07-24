import { useState, useEffect, useCallback } from 'react';
import { getDocuments, deleteDocument as apiDelete } from '../services/documents';

export function useDocuments(refreshTrigger) {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const docs = await getDocuments();
      setDocuments(docs);
    } catch {
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch, refreshTrigger]);

  const deleteDoc = async (id) => {
    await apiDelete(id);
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  return { documents, loading, deleteDoc, refresh: fetch };
}
