// src/pages/Panier.jsx
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext.jsx';

function Panier() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, clearCart, totalPrix } = useCart();

  // Panier vide
  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <h2>🛒 Ton panier est vide</h2>
        <p style={{ color: '#64748b', marginTop: '0.5rem' }}>
          Ajoute des produits pour les retrouver ici.
        </p>
        <button
          onClick={function () {
            navigate('/produits');
          }}
          style={{
            marginTop: '1.5rem',
            padding: '0.75rem 1.5rem',
            background: '#0891b2',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          Voir les produits →
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Mon Panier</h2>

      {cartItems.map(function (item) {
        return (
          <div
            key={item._id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              background: 'white',
              borderRadius: '12px',
              padding: '1rem',
              marginBottom: '1rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: '80px',
                height: '80px',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
            />
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0, fontSize: '1rem' }}>{item.title}</h3>
              <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '0.25rem 0' }}>
                {item.price.toLocaleString()} DZD × {item.quantity}
              </p>
              <p style={{ fontWeight: 'bold', color: '#7c3aed', margin: 0 }}>
                {(item.price * item.quantity).toLocaleString()} DZD
              </p>
            </div>
            <button
              onClick={function () {
                removeFromCart(item._id);
              }}
              style={{
                background: '#fee2e2',
                color: '#dc2626',
                border: 'none',
                borderRadius: '8px',
                padding: '0.5rem 0.75rem',
                cursor: 'pointer',
                fontSize: '0.85rem',
              }}
            >
              🗑️ Supprimer
            </button>
          </div>
        );
      })}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'white',
          borderRadius: '12px',
          padding: '1.5rem',
          marginTop: '1rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }}
      >
        <div>
          <span style={{ color: '#64748b' }}>Total</span>
          <p
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#7c3aed',
              margin: 0,
            }}
          >
            {totalPrix.toLocaleString()} DZD
          </p>
        </div>
        <button
          onClick={clearCart}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#1e293b',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Vider le panier
        </button>
      </div>
    </div>
  );
}

export default Panier;
