// src/pages/Produits.jsx
import { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios.js';
import { AuthContext } from '../context/AuthContext.jsx';
import { EtoilesAffichage } from '../components/Etoiles.jsx';

function Produits() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [produits, setProduits] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState('');

  const [saisie, setSaisie] = useState('');       // ce que l'utilisateur tape
  const [recherche, setRecherche] = useState('');  // ce qui est réellement envoyé au serveur
  const [categories, setCategories] = useState([]);
  const [categorie, setCategorie] = useState('');
  const [tri, setTri] = useState('');

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // Ne lance une recherche serveur qu'à partir de 4 lettres (ou 0 = tout afficher),
  // et attend 400ms après la dernière frappe pour éviter une requête par lettre.
  useEffect(function () {
    const minuteur = setTimeout(function () {
      if (saisie.length === 0 || saisie.length >= 4) {
        setRecherche(saisie);
        setPage(1);
      }
    }, 400);
    return function () { clearTimeout(minuteur) };
  }, [saisie]);

  // Liste des catégories, une seule fois
  useEffect(function () {
    api
      .get('/produits/categories/liste')
      .then(function (rep) { setCategories(rep.data) })
      .catch(function () { setCategories([]) });
  }, []);

  // Chargement des produits — recherche, catégorie, tri ou page changée
  useEffect(function () {
    setChargement(true);
    const params = { page, limite: 8 };
    if (recherche) params.recherche = recherche;
    if (categorie) params.categorie = categorie;
    if (tri) params.tri = tri;

    api
      .get('/produits', { params })
      .then(function (rep) {
        setProduits(rep.data.produits);
        setTotalPages(rep.data.totalPages);
        setTotal(rep.data.total);
        setErreur('');
      })
      .catch(function () {
        setErreur('Serveur injoignable — le backend est-il lancé ?');
      })
      .finally(function () {
        setChargement(false);
      });
  }, [recherche, categorie, tri, page]);

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

  const inputStyle = {
    padding: '0.6rem 1rem',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    fontSize: '0.95rem',
  };

  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 style={{ margin: 0 }}>Tous nos Produits ({total})</h2>

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

      {/* Barre de recherche + filtres */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
        <input
          style={{ ...inputStyle, flex: '1 1 220px' }}
          placeholder="Rechercher un produit (4 lettres min.)…"
          value={saisie}
          onChange={function (e) { setSaisie(e.target.value) }}
        />
        <select
          style={inputStyle}
          value={categorie}
          onChange={function (e) { setCategorie(e.target.value); setPage(1) }}
        >
          <option value="">Toutes les catégories</option>
          {categories.map(function (c) {
            return <option key={c} value={c}>{c}</option>;
          })}
        </select>
        <select
          style={inputStyle}
          value={tri}
          onChange={function (e) { setTri(e.target.value); setPage(1) }}
        >
          <option value="">Plus récents</option>
          <option value="prix_asc">Prix croissant</option>
          <option value="prix_desc">Prix décroissant</option>
        </select>
      </div>

      {chargement && (
        <p style={{ textAlign: 'center', padding: '2rem' }}>⏳ Chargement des produits…</p>
      )}

      {!chargement && erreur && (
        <p style={{ textAlign: 'center', color: '#dc2626', fontWeight: 'bold', padding: '2rem' }}>{erreur}</p>
      )}

      {!chargement && !erreur && produits.length === 0 && (
        <p style={{ textAlign: 'center', color: '#64748b', padding: '2rem' }}>
          Aucun produit ne correspond à ta recherche.
        </p>
      )}

      {!chargement && !erreur && produits.length > 0 && (
        <>
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
                    <div style={{ marginBottom: '0.5rem' }}>
                      <EtoilesAffichage moyenne={product.ratingAvg} nombre={product.ratingCount} />
                    </div>
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

          {/* Pagination */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '2.5rem' }}>
            <button
              disabled={page <= 1}
              onClick={function () { setPage(function (p) { return p - 1 }) }}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                background: page <= 1 ? '#f1f5f9' : 'white',
                cursor: page <= 1 ? 'not-allowed' : 'pointer',
              }}
            >
              ← Précédent
            </button>
            <span style={{ color: '#64748b', fontSize: '0.9rem' }}>
              Page {page} / {totalPages}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={function () { setPage(function (p) { return p + 1 }) }}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                background: page >= totalPages ? '#f1f5f9' : 'white',
                cursor: page >= totalPages ? 'not-allowed' : 'pointer',
              }}
            >
              Suivant →
            </button>
          </div>
        </>
      )}
    </main>
  );
}

export default Produits;