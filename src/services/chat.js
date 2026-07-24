import api from './api';

export async function sendQuestion(documentId, question) {
  const { data } = await api.post('/chat', {
    document_id: documentId,
    question,
  });
  return data;
}
