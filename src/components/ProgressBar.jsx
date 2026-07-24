export default function ProgressBar({ progress }) {
  return (
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: `${progress}%` }} />
      <span className="progress-text">{progress}%</span>
    </div>
  );
}
