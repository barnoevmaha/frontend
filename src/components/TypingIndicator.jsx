export default function TypingIndicator() {
  return (
    <div className="message message-assistant">
      <div className="message-avatar">AI</div>
      <div className="typing-indicator">
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </div>
    </div>
  );
}
