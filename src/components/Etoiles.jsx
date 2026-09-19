// src/components/Etoiles.jsx

// Affichage en lecture seule (grille, page produit)
export function EtoilesAffichage({ moyenne = 0, nombre = 0 }) {
  const pleines = Math.round(moyenne);
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
      <span style={{ color: '#f59e0b', letterSpacing: '1px' }}>
        {[1, 2, 3, 4, 5].map(function (n) {
          return <span key={n}>{n <= pleines ? '★' : '☆'}</span>;
        })}
      </span>
      <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
        {nombre > 0 ? `(${nombre})` : 'Aucun avis'}
      </span>
    </span>
  );
}

// Sélecteur cliquable (formulaire d'avis)
export function EtoilesPicker({ valeur, onChange }) {
  return (
    <div style={{ display: 'flex', gap: '0.25rem', fontSize: '1.6rem' }}>
      {[1, 2, 3, 4, 5].map(function (n) {
        return (
          <span
            key={n}
            onClick={function () { onChange(n) }}
            style={{ color: n <= valeur ? '#f59e0b' : '#e2e8f0', cursor: 'pointer' }}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}