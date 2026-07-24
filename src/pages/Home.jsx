import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="page home-page">
      <h1>RAG Application</h1>
      <p className="home-subtitle">
        Upload documents and ask questions about their content using AI.
      </p>
      <div className="home-actions">
        <Link to="/upload" className="btn btn-primary btn-lg">Upload Document</Link>
        <Link to="/documents" className="btn btn-secondary btn-lg">View Documents</Link>
      </div>
      <div className="home-steps">
        <div className="step">
          <span className="step-number">1</span>
          <h3>Upload</h3>
          <p>Upload PDF, DOCX, or TXT files</p>
        </div>
        <div className="step">
          <span className="step-number">2</span>
          <h3>Index</h3>
          <p>Text is extracted, chunked, and embedded</p>
        </div>
        <div className="step">
          <span className="step-number">3</span>
          <h3>Chat</h3>
          <p>Ask questions and get answers from your documents</p>
        </div>
      </div>
    </div>
  );
}
