// src/pages/CheckoutPage.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext.jsx';

function CheckoutPage() {
  const { cartItems, totalPrix, clearCart } = useCart();
  const [valide, setValide] = useState(false);

  // Livraison gratuite à partir de 5000 DZD, sinon 500 DZD (ajuste selon ton besoin)
  const livraison = totalPrix >= 5000 ? 0 : 500;

  function commander(e) {
    e.preventDefault();
    clearCart();
    setValide(true);
  }

  // Écran de confirmation
  if (valide) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <div style={{ fontSize: '3rem' }}>✅</div>
        <h2>Commande confirmée !</h2>
        <p style={{ color: '#64748b', marginTop: '0.5rem' }}>
          Merci, vous serez livré sous 48h.
        </p>
        <Link
          to="/produits"
          style={{
            display: 'inline-block',
            marginTop: '1.5rem',
            padding: '0.75rem 1.5rem',
            background: '#0891b2',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
          }}
        >
          Continuer mes achats
        </Link>
      </div>
    );
  }

  // Panier vide → pas de commande possible
  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <p style={{ color: '#64748b' }}>Votre panier est vide.</p>
        <Link
          to="/produits"
          style={{
            display: 'inline-block',
            marginTop: '1rem',
            padding: '0.75rem 1.5rem',
            background: '#0891b2',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
          }}
        >
          Voir nos produits
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Livraison</h2>
      <form onSubmit={commander}>
        <input
          style={{ width: '100%', padding: '0.6rem', marginBottom: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}
          placeholder="Nom complet"
          required
        />
        <input
          style={{ width: '100%', padding: '0.6rem', marginBottom: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}
          placeholder="Téléphone"
          required
        />
        <input
          style={{ width: '100%', padding: '0.6rem', marginBottom: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}
          placeholder="Wilaya (ex : Skikda)"
          required
        />
        <textarea
          style={{ width: '100%', padding: '0.6rem', marginBottom: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}
          placeholder="Adresse détaillée"
          required
        />

        <div
          style={{
            background: 'white',
            borderRadius: '12px',
            padding: '1rem',
            marginBottom: '1rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Sous-total</span>
            <span>{totalPrix.toLocaleString()} DZD</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Livraison</span>
            <span>{livraison === 0 ? 'Gratuite 🎉' : livraison.toLocaleString() + ' DZD'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', color: '#7c3aed' }}>
            <span>Total à payer</span>
            <span>{(totalPrix + livraison).toLocaleString()} DZD</span>
          </div>
        </div>

        <button
          style={{
            width: '100%',
            padding: '0.9rem',
            background: '#16a34a',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          Confirmer la commande
        </button>
      </form>
    </div>
  );
}

export default CheckoutPage;