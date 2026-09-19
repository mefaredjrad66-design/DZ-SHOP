// src/pages/AjouterProduit.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios.js';

function AjouterProduit() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [erreur, setErreur] = useState('');
  const [envoi, setEnvoi] = useState(false);

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    marginBottom: '1rem',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
    fontSize: '0.95rem',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  };

  async function envoyer(e) {
    e.preventDefault();
    setErreur('');
    setEnvoi(true);
    try {
      await api.post('/produits', {
        title,
        price: Number(price),
        category,
        image,
        description,
      });
      navigate('/produits');
    } catch (err) {
      setErreur(err.response?.data?.message || "Erreur lors de l'ajout du produit");
    } finally {
      setEnvoi(false);
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
      <Link
        to="/produits"
        style={{
          display: 'inline-block',
          marginBottom: '1.5rem',
          color: '#64748b',
          textDecoration: 'none',
        }}
      >
        ← Retour au catalogue
      </Link>

      <h2 style={{ marginBottom: '1.5rem' }}>Ajouter un produit</h2>

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

      <form onSubmit={envoyer}>
        <input
          style={inputStyle}
          placeholder="Titre du produit"
          value={title}
          onChange={function (e) { setTitle(e.target.value) }}
          required
        />
        <input
          style={inputStyle}
          type="number"
          min="0"
          placeholder="Prix (DZD)"
          value={price}
          onChange={function (e) { setPrice(e.target.value) }}
          required
        />
        <input
          style={inputStyle}
          placeholder="Catégorie (ex : Hauts, Pantalons)"
          value={category}
          onChange={function (e) { setCategory(e.target.value) }}
          required
        />
        <input
          style={inputStyle}
          placeholder="URL de l'image"
          value={image}
          onChange={function (e) { setImage(e.target.value) }}
        />
        <textarea
          style={{ ...inputStyle, minHeight: '90px', resize: 'vertical' }}
          placeholder="Description"
          value={description}
          onChange={function (e) { setDescription(e.target.value) }}
        />
        <button
          disabled={envoi}
          style={{
            width: '100%',
            padding: '0.85rem',
            background: envoi ? '#94a3b8' : '#16a34a',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: envoi ? 'not-allowed' : 'pointer',
          }}
        >
          {envoi ? 'Ajout en cours…' : 'Ajouter le produit'}
        </button>
      </form>
    </div>
  );
}

export default AjouterProduit;