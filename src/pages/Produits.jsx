// src/pages/Produits.jsx
import { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios.js';
import { AuthContext } from '../context/AuthContext.jsx';

function Produits() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [produits, setProduits] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState('');

  useEffect(function () {
    api
      .get('/produits')
      .then(function (rep) {
        setProduits(rep.data);
      })
      .catch(function () {
        setErreur('Serveur injoignable — le backend est-il lancé ?');
      })
      .finally(function () {
        setChargement(false);
      });
  }, []);

  async function supprimer(id) {
    const confirmation = window.confirm('Supprimer ce produit ?');
    if (!confirmation) return;

    try {
      await api.delete('/produits/' + id);
      setProduits(function (prev) {
        return prev.filter(function (p) { return p._id !== id });
      });
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur lors de la suppression');
    }
  }

  if (chargement) {
    return (
      <main style={{ padding: '3rem', textAlign: 'center' }}>
        <p>⏳ Chargement des produits…</p>
      </main>
    );
  }

  if (erreur) {
    return (
      <main style={{ padding: '3rem', textAlign: 'center' }}>
        <p style={{ color: '#dc2626', fontWeight: 'bold' }}>{erreur}</p>
      </main>
    );
  }

  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 style={{ margin: 0 }}>Tous nos Produits ({produits.length})</h2>

        {user?.role === 'admin' && (
          <Link
            to="/ajouter-produit"
            style={{
              padding: '0.6rem 1.25rem',
              background: '#16a34a',
              color: 'white',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '0.9rem',
            }}
          >
            + Ajouter un produit
          </Link>
        )}
      </div>

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

                {user?.role === 'admin' && (
                  <button
                    onClick={function () { supprimer(product._id) }}
                    style={{
                      marginTop: '0.5rem',
                      width: '100%',
                      padding: '0.6rem',
                      background: '#fee2e2',
                      color: '#dc2626',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                    }}
                  >
                    🗑️ Supprimer
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default Produits;