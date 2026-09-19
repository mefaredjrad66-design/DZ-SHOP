// src/pages/NotFoundPage.jsx
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', padding: '5rem 2rem' }}>
      <div style={{ fontSize: '5rem', fontWeight: 'bold', color: '#0891b2' }}>404</div>
      <h2 style={{ margin: '0.5rem 0 1.5rem' }}>Page introuvable</h2>
      <Link
        to="/"
        style={{
          display: 'inline-block',
          padding: '0.75rem 1.75rem',
          background: '#0891b2',
          color: 'white',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 'bold',
        }}
      >
        ← Retour à l'accueil
      </Link>
    </div>
  );
}

export default NotFoundPage;