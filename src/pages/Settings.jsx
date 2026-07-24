import { useState, useEffect } from 'react';
import { getHealth } from '../services/health';

export default function Settings() {
  const [health, setHealth] = useState(null);

  useEffect(() => {
    getHealth().then(setHealth).catch(() => setHealth({ status: 'error', qdrant: 'error' }));
  }, []);

  return (
    <div className="page settings-page">
      <h1>Settings</h1>
      <div className="settings-card">
        <h3>System Status</h3>
        <p>API: <span className={`badge badge-${health?.status === 'ok' ? 'success' : 'error'}`}>{health?.status || 'checking...'}</span></p>
        <p>Qdrant: <span className={`badge badge-${health?.qdrant === 'ok' ? 'success' : health?.qdrant === 'unknown' ? 'warning' : 'error'}`}>{health?.qdrant || 'checking...'}</span></p>
      </div>
      <div className="settings-card">
        <h3>Configuration</h3>
        <p>Configure via <code>.env</code> file in the backend directory.</p>
      </div>
    </div>
  );
}
