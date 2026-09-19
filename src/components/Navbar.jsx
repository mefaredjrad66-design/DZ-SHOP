import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { useCart } from '../CartContext.jsx';
import { AuthContext } from '../context/AuthContext.jsx';

function Navbar() {
  const { nbItems } = useCart();
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <header
      style={{
        background: '#1e293b',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Link
        to="/"
        style={{
          color: 'white',
          textDecoration: 'none',
          fontSize: '1.5rem',
          fontWeight: 'bold',
        }}
      >
        🛍️ DZShop
      </Link>

      <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <NavLink
          to="/"
          end
          style={function ({ isActive }) {
            return { color: isActive ? '#38bdf8' : '#cbd5e1', textDecoration: 'none' };
          }}
        >
          Accueil
        </NavLink>
        <NavLink
          to="/produits"
          style={function ({ isActive }) {
            return { color: isActive ? '#38bdf8' : '#cbd5e1', textDecoration: 'none' };
          }}
        >
          Produits
        </NavLink>
        <Link
          to="/panier"
          style={{
            color: '#cbd5e1',
            textDecoration: 'none',
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem',
          }}
        >
          🛒 Panier
          {nbItems > 0 && (
            <span
              style={{
                background: '#38bdf8',
                color: '#0f172a',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                borderRadius: '999px',
                padding: '1px 8px',
                minWidth: '20px',
                textAlign: 'center',
              }}
            >
              {nbItems}
            </span>
          )}
        </Link>

        {/* Défi FACILE : Connexion si personne, sinon le nom */}
        {!user ? (
          <Link to="/login" style={{ color: '#cbd5e1', textDecoration: 'none' }}>
            Connexion
          </Link>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ color: '#38bdf8' }}>👤 {user.nom}</span>

            {/* Défi BONUS : lien Admin visible seulement si role === 'admin'.
                Pointe vers "/" pour l'instant — change to="/admin" quand cette page existera. */}
            {user.role === 'admin' && (
  <Link to="/ajouter-produit" style={{ color: '#facc15', textDecoration: 'none' }}>
    + Ajouter
  </Link>
)}

            <button
              onClick={handleLogout}
              style={{
                background: 'none',
                border: '1px solid #cbd5e1',
                color: '#cbd5e1',
                borderRadius: '6px',
                padding: '0.3rem 0.75rem',
                cursor: 'pointer',
                fontSize: '0.85rem',
              }}
            >
              Déconnexion
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;