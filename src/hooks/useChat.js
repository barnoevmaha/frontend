import { useState, useRef, useCallback } from 'react';
import { sendQuestion } from '../services/chat';

export function useChat(documentId) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sources, setSources] = useState(null);
  const messagesEndRef = useRef(null);

  const send = useCallback(async (question) => {
    const userMessage = { role: 'user', content: question };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setSources(null);

    try {
      const data = await sendQuestion(documentId, question);
      const botMessage = { role: 'assistant', content: data.answer };
      setMessages((prev) => [...prev, botMessage]);
      if (data.sources && data.sources.length > 0) {
        setSources(data.sources);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'An error occurred while processing your question.' },
      ]);
    } finally {
      setLoading(false);
    }
  }, [documentId]);

  const clear = () => {
    setMessages([]);
    setSources(null);
  };

  return { messages, loading, sources, send, clear, messagesEndRef };
}
