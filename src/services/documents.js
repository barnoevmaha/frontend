import api from './api';

export async function getDocuments() {
  const { data } = await api.get('/documents');
  return data.documents;
}

export async function uploadDocument(file, onProgress) {
  const formData = new FormData();
  formData.append('file', file);

  const { data } = await api.post('/documents/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: onProgress,
  });

  return data;
}

export async function deleteDocument(id) {
  await api.delete(`/documents/${id}`);
}
