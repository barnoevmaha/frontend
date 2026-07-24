import { marked } from 'marked';

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';

  const html = marked.parse(message.content, { breaks: true });

  return (
    <div className={`message ${isUser ? 'message-user' : 'message-assistant'}`}>
      <div className="message-avatar">{isUser ? 'U' : 'AI'}</div>
      <div className="message-content" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
