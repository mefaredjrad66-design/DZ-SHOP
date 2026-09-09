// src/pages/Produits.jsx
import products from '../data/products.js';
import { useNavigate } from 'react-router-dom';

function Produits() {
  const navigate = useNavigate();

  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h2>Tous nos Produits ({products.length})</h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginTop: '2rem',
        }}
      >
        {products.map(function (product) {
          return (
            <div
              key={product.id}
              style={{
                background: 'white',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <img
                src={product.image}
                alt={product.title}
                style={{ width: '100%', height: '220px', objectFit: 'cover' }}
              />
              <div
                style={{
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                }}
              >
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  {product.category}
                </span>
                <h3 style={{ margin: '0.5rem 0' }}>{product.title}</h3>
                <p
                  style={{
                    fontWeight: 'bold',
                    color: '#7c3aed',
                    fontSize: '1.1rem',
                    marginTop: 'auto',
                  }}
                >
                  {product.price.toLocaleString()} DZD
                </p>
                <button
                  onClick={function () {
                    navigate(`/produit/${product.id}`);
                  }}
                  style={{
                    marginTop: '0.75rem',
                    width: '100%',
                    padding: '0.6rem',
                    background: '#0891b2',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                >
                  Voir détails →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default Produits;
