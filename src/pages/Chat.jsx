import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useChat } from '../hooks/useChat';
import MessageBubble from '../components/MessageBubble';
import TypingIndicator from '../components/TypingIndicator';
import SourcePanel from '../components/SourcePanel';

export default function Chat() {
  const { documentId } = useParams();
  const { messages, loading, sources, send, clear, messagesEndRef } = useChat(documentId);
  const [input, setInput] = useState('');
  const [showSources, setShowSources] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading, messagesEndRef]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    send(input.trim());
    setInput('');
  };

  return (
    <div className="page chat-page">
      <div className="chat-header">
        <h1>Chat</h1>
        {messages.length > 0 && (
          <button className="btn btn-secondary" onClick={clear}>Clear Chat</button>
        )}
      </div>

      <div className="chat-messages">
        {messages.length === 0 && (
          <p className="chat-placeholder">Ask a question about your document.</p>
        )}
        {messages.map((msg, i) => (
          <MessageBubble key={i} message={msg} />
        ))}
        {loading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {sources && sources.length > 0 && (
        <SourcePanel
          sources={sources}
          visible={showSources}
          onToggle={() => setShowSources((v) => !v)}
        />
      )}

      <form className="chat-input" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
          disabled={loading}
        />
        <button type="submit" className="btn btn-primary" disabled={loading || !input.trim()}>
          Send
        </button>
      </form>
    </div>
  );
}
