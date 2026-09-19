// src/pages/CheckoutPage.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext.jsx';
import api from '../api/axios.js';

function CheckoutPage() {
  const { cartItems, totalPrix, clearCart } = useCart();

  const [form, setForm] = useState({ nom: '', telephone: '', wilaya: '', adresse: '' });
  const [confirmation, setConfirmation] = useState(null);
  const [erreur, setErreur] = useState('');
  const [envoi, setEnvoi] = useState(false);

  const livraison = totalPrix >= 5000 ? 0 : 500;

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function commander(e) {
    e.preventDefault();
    setErreur('');
    setEnvoi(true);

    try {
      const res = await api.post('/commandes', {
        cartItems: cartItems.map(function (item) {
          return { id: item._id, quantity: item.quantity };
        }),
        nom: form.nom,
        telephone: form.telephone,
        wilaya: form.wilaya,
        adresse: form.adresse,
      });
      setConfirmation(res.data);
      clearCart();
    } catch (err) {
      setErreur(err.response?.data?.message || 'Erreur lors de la commande');
    } finally {
      setEnvoi(false);
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '0.6rem',
    marginBottom: '0.75rem',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  };

  if (confirmation) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <div style={{ fontSize: '3rem' }}>✅</div>
        <h2>Commande confirmée !</h2>
        <p style={{ color: '#64748b', marginTop: '0.5rem' }}>
          Total payé : <b>{confirmation.total.toLocaleString()} DZD</b> — vous serez livré sous 48h.
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

      {erreur && (
        <div
          style={{
            background: '#fee2e2',
            color: '#dc2626',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            marginBottom: '1rem',
            fontSize: '0.9rem',
          }}
        >
          {erreur}
        </div>
      )}

      <form onSubmit={commander}>
        <input
          style={inputStyle}
          name="nom"
          value={form.nom}
          onChange={handleChange}
          placeholder="Nom complet"
          required
        />
        <input
          style={inputStyle}
          name="telephone"
          value={form.telephone}
          onChange={handleChange}
          placeholder="Téléphone"
          required
        />
        <input
          style={inputStyle}
          name="wilaya"
          value={form.wilaya}
          onChange={handleChange}
          placeholder="Wilaya (ex : Skikda)"
          required
        />
        <textarea
          style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
          name="adresse"
          value={form.adresse}
          onChange={handleChange}
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
          disabled={envoi}
          style={{
            width: '100%',
            padding: '0.9rem',
            background: envoi ? '#94a3b8' : '#16a34a',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            cursor: envoi ? 'not-allowed' : 'pointer',
          }}
        >
          {envoi ? 'Envoi en cours…' : 'Confirmer la commande'}
        </button>
      </form>
    </div>
  );
}

export default CheckoutPage;