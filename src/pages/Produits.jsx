// src/pages/Produits.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios.js';

function Produits() {
  const navigate = useNavigate();

  // 3 mémoires : la liste des produits, l'état de chargement, une éventuelle erreur
  const [produits, setProduits] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState('');

  // Au chargement de la page, on va chercher les produits sur le serveur
  useEffect(function () {
    api
      .get('/produits')
      .then(function (rep) {
        setProduits(rep.data); // rep.data = le tableau renvoyé par l'API
      })
      .catch(function () {
        setErreur('Serveur injoignable — le backend est-il lancé ?');
      })
      .finally(function () {
        setChargement(false);
      });
  }, []); // [] = une seule fois, au chargement

  // Pendant le chargement
  if (chargement) {
    return (
      <main style={{ padding: '3rem', textAlign: 'center' }}>
        <p>⏳ Chargement des produits…</p>
      </main>
    );
  }

  // Si le serveur ne répond pas
  if (erreur) {
    return (
      <main style={{ padding: '3rem', textAlign: 'center' }}>
        <p style={{ color: '#dc2626', fontWeight: 'bold' }}>{erreur}</p>
      </main>
    );
  }

  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h2>Tous nos Produits ({produits.length})</h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginTop: '2rem',
        }}
      >
        {produits.map(function (product) {
          return (
            <div
              key={product._id}
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
                    navigate(`/produit/${product._id}`);
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
