// src/pages/ProduitDetails.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import products from '../data/products.js';
import { useCart } from '../CartContext.jsx';

function ProduitDetails() {
  const { id } = useParams(); // "3" (string)
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Convertir l'id string → nombre pour la comparaison
  const product = products.find(function (p) {
    return p.id === Number(id); // 3 === 3 ✅
  });

  // Si le produit n'existe pas
  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <h2>Produit introuvable !</h2>
        <button
          onClick={function () {
            navigate('/produits');
          }}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
          }}
        >
          ← Retour au catalogue
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <button
        onClick={function () {
          navigate(-1);
        }}
        style={{
          background: 'none',
          border: '1px solid #cbd5e1',
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          cursor: 'pointer',
          marginBottom: '1.5rem',
        }}
      >
        ← Retour
      </button>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          alignItems: 'start',
        }}
      >
        <img
          src={product.image}
          alt={product.title}
          style={{ width: '100%', borderRadius: '12px' }}
        />

        <div>
          <span style={{ color: '#64748b', fontSize: '0.9rem' }}>
            {product.category}
          </span>
          <h1 style={{ margin: '0.5rem 0' }}>{product.title}</h1>
          <p style={{ color: '#475569', marginBottom: '1rem' }}>
            {product.description}
          </p>
          <p
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#7c3aed',
            }}
          >
            {product.price.toLocaleString()} DZD
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginTop: '1.5rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '0 0.5rem',
              }}
            >
              <button
                onClick={function () {
                  setQuantity(function (q) {
                    return Math.max(1, q - 1);
                  });
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.3rem',
                  cursor: 'pointer',
                  padding: '0.5rem',
                }}
              >
                −
              </button>
              <span
                style={{
                  fontWeight: 'bold',
                  minWidth: '2ch',
                  textAlign: 'center',
                }}
              >
                {quantity}
              </span>
              <button
                onClick={function () {
                  setQuantity(function (q) {
                    return q + 1;
                  });
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.3rem',
                  cursor: 'pointer',
                  padding: '0.5rem',
                }}
              >
                +
              </button>
            </div>

            <button
              onClick={function () {
                addToCart(product, quantity);
                setAdded(true);
                setTimeout(function () {
                  setAdded(false);
                }, 2000);
              }}
              style={{
                flex: 1,
                padding: '0.75rem',
                background: added ? '#16a34a' : '#0891b2',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                cursor: 'pointer',
              }}
            >
              {added
                ? '✅ Ajouté au panier !'
                : `🛒 Ajouter (${(quantity * product.price).toLocaleString()} DZD)`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProduitDetails;
