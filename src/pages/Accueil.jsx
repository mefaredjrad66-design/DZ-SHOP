// src/pages/Accueil.jsx
import { useNavigate } from 'react-router-dom';
import products from '../data/products.js';

function Accueil() {
  const navigate = useNavigate();

  // On met en avant les 3 premiers produits
  const featured = products.slice(0, 3);

  return (
    <div>
      {/* HERO */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0891b2, #0e7490)',
          color: 'white',
          padding: '5rem 2rem',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '2.5rem', margin: 0 }}>
          Bienvenue chez 🛍️ DZShop
        </h1>
        <p
          style={{
            fontSize: '1.15rem',
            opacity: 0.9,
            marginTop: '0.75rem',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Vêtements tendance et confortables, livrés partout en Algérie.
        </p>
        <button
          onClick={function () {
            navigate('/produits');
          }}
          style={{
            marginTop: '2rem',
            padding: '0.9rem 2rem',
            background: 'white',
            color: '#0e7490',
            border: 'none',
            borderRadius: '10px',
            fontSize: '1.05rem',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Découvrir la collection →
        </button>
      </section>

      {/* PRODUITS EN VEDETTE */}
      <section style={{ padding: '3rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
          ⭐ Nos coups de cœur
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {featured.map(function (product) {
            return (
              <div
                key={product.id}
                onClick={function () {
                  navigate(`/produit/${product.id}`);
                }}
                style={{
                  background: 'white',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  cursor: 'pointer',
                }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  style={{ width: '100%', height: '220px', objectFit: 'cover' }}
                />
                <div style={{ padding: '1rem' }}>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    {product.category}
                  </span>
                  <h3 style={{ margin: '0.5rem 0' }}>{product.title}</h3>
                  <p
                    style={{
                      fontWeight: 'bold',
                      color: '#7c3aed',
                      fontSize: '1.1rem',
                      margin: 0,
                    }}
                  >
                    {product.price.toLocaleString()} DZD
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <button
            onClick={function () {
              navigate('/produits');
            }}
            style={{
              padding: '0.75rem 1.75rem',
              background: '#0891b2',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            Voir tous les produits →
          </button>
        </div>
      </section>
    </div>
  );
}

export default Accueil;
