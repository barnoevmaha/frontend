import { Link, useLocation } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home' },
  { to: '/upload', label: 'Upload' },
  { to: '/documents', label: 'Documents' },
  { to: '/settings', label: 'Settings' },
];

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">RAG</Link>
      <div className="navbar-links">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className={`navbar-link ${pathname === l.to ? 'active' : ''}`}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
