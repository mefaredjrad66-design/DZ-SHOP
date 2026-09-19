// src/pages/ProduitDetails.jsx
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import api from '../api/axios.js';
import { useCart } from '../CartContext.jsx';
import { AuthContext } from '../context/AuthContext.jsx';
import { EtoilesAffichage, EtoilesPicker } from '../components/Etoiles.jsx';

function ProduitDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const [avisListe, setAvisListe] = useState([]);
  const [note, setNote] = useState(0);
  const [commentaire, setCommentaire] = useState('');
  const [envoiAvis, setEnvoiAvis] = useState(false);
  const [erreurAvis, setErreurAvis] = useState('');

  useEffect(function () {
    api
      .get('/produits/' + id)
      .then(function (rep) {
        setProduct(rep.data);
      })
      .catch(function () {
        setProduct(null);
      })
      .finally(function () {
        setChargement(false);
      });
  }, [id]);

  useEffect(function () {
    api
      .get('/avis/' + id)
      .then(function (rep) { setAvisListe(rep.data) })
      .catch(function () { setAvisListe([]) });
  }, [id]);

  async function envoyerAvis(e) {
    e.preventDefault();
    setErreurAvis('');

    if (note === 0) {
      setErreurAvis("Choisis une note avant d'envoyer.");
      return;
    }

    setEnvoiAvis(true);
    try {
      const rep = await api.post('/avis/' + id, { note, commentaire });
      setAvisListe(rep.data.avis);
      setProduct(function (prev) {
        return { ...prev, ratingAvg: rep.data.ratingAvg, ratingCount: rep.data.ratingCount };
      });
      setCommentaire('');
      setNote(0);
    } catch (err) {
      setErreurAvis(err.response?.data?.message || "Erreur lors de l'envoi de l'avis");
    } finally {
      setEnvoiAvis(false);
    }
  }

  if (chargement) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <p>⏳ Chargement…</p>
      </div>
    );
  }

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
          <div style={{ marginBottom: '0.75rem' }}>
            <EtoilesAffichage moyenne={product.ratingAvg} nombre={product.ratingCount} />
          </div>
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

      <div style={{ marginTop: '3rem', borderTop: '1px solid #e2e8f0', paddingTop: '2rem' }}>
        <h2 style={{ marginBottom: '0.5rem' }}>Avis clients</h2>
        <EtoilesAffichage moyenne={product.ratingAvg} nombre={product.ratingCount} />

        {user ? (
          <form onSubmit={envoyerAvis} style={{ marginTop: '1.5rem', maxWidth: '450px' }}>
            <EtoilesPicker valeur={note} onChange={setNote} />
            <textarea
              style={{
                width: '100%',
                marginTop: '0.75rem',
                padding: '0.6rem',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                minHeight: '80px',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
              }}
              placeholder="Ton avis sur ce produit…"
              value={commentaire}
              onChange={function (e) { setCommentaire(e.target.value) }}
              required
            />
            {erreurAvis && (
              <p style={{ color: '#dc2626', fontSize: '0.9rem', marginTop: '0.25rem' }}>{erreurAvis}</p>
            )}
            <button
              disabled={envoiAvis}
              style={{
                marginTop: '0.5rem',
                padding: '0.6rem 1.25rem',
                background: envoiAvis ? '#94a3b8' : '#0891b2',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: envoiAvis ? 'not-allowed' : 'pointer',
              }}
            >
              {envoiAvis ? 'Envoi…' : 'Publier mon avis'}
            </button>
          </form>
        ) : (
          <p style={{ marginTop: '1rem', color: '#64748b' }}>
            <Link to="/login" style={{ color: '#0891b2', fontWeight: 'bold' }}>Connecte-toi</Link> pour laisser un avis.
          </p>
        )}

        <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {avisListe.length === 0 && (
            <p style={{ color: '#64748b' }}>Aucun avis pour l'instant — sois le premier !</p>
          )}
          {avisListe.map(function (a) {
            return (
              <div
                key={a._id}
                style={{
                  background: 'white',
                  borderRadius: '10px',
                  padding: '1rem',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <b>{a.nomUtilisateur}</b>
                  <EtoilesAffichage moyenne={a.note} nombre={0} />
                </div>
                <p style={{ margin: '0.5rem 0 0', color: '#475569' }}>{a.commentaire}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProduitDetails;