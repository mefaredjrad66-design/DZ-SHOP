// src/pages/MesCommandes.jsx — l'historique des commandes de l'utilisateur connecté
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios.js';

function MesCommandes() {
  const [commandes, setCommandes] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState('');

  // Au chargement de la page, on demande MES commandes à l'API
  useEffect(function () {
    api
      .get('/commandes/mes-commandes')
      .then(function (rep) {
        setCommandes(rep.data);
      })
      .catch(function () {
        setErreur('Impossible de charger tes commandes');
      })
      .finally(function () {
        setChargement(false);
      });
  }, []);

  if (chargement) {
    return <p style={{ textAlign: 'center', padding: '3rem' }}>⏳ Chargement…</p>;
  }

  if (erreur) {
    return <p style={{ textAlign: 'center', padding: '3rem', color: '#dc2626' }}>{erreur}</p>;
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Mes commandes</h2>

      {commandes.length === 0 && (
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#64748b' }}>Tu n'as pas encore passé de commande.</p>
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
      )}

      {commandes.map(function (c) {
        return (
          <div
            key={c._id}
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '1rem 1.25rem',
              marginBottom: '1rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <b>CMD-{c._id.slice(-6).toUpperCase()}</b>
              <span style={{ color: '#64748b' }}>
                {new Date(c.createdAt).toLocaleDateString('fr-FR')} · {c.statut.replace('_', ' ')}
              </span>
            </div>
            <ul style={{ margin: '0 0 0.75rem 1.25rem', color: '#334155' }}>
              {c.produits.map(function (p, i) {
                return (
                  <li key={i}>
                    {p.title} × {p.quantity}
                  </li>
                );
              })}
            </ul>
            <b style={{ color: '#7c3aed' }}>Total : {c.total.toLocaleString()} DZD</b>
          </div>
        );
      })}
    </div>
  );
}

export default MesCommandes;
