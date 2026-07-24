export default function SourcePanel({ sources, visible, onToggle }) {
  return (
    <div className={`source-panel ${visible ? 'source-panel-open' : ''}`}>
      <button className="source-toggle" onClick={onToggle}>
        {visible ? 'Hide Sources' : 'Show Sources'} ({sources.length})
      </button>
      {visible && (
        <div className="source-list">
          {sources.map((s, i) => (
            <div key={i} className="source-item">
              <strong>Chunk {s.chunk_index}</strong>
              {s.page_number != null && <span> (page {s.page_number})</span>}
              <p>{s.text.slice(0, 300)}...</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
