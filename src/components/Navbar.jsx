import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../CartContext.jsx';

function Navbar() {
  const { nbItems } = useCart();

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
            return {
              color: isActive ? '#38bdf8' : '#cbd5e1',
              textDecoration: 'none',
            };
          }}
        >
          Accueil
        </NavLink>
        <NavLink
          to="/produits"
          style={function ({ isActive }) {
            return {
              color: isActive ? '#38bdf8' : '#cbd5e1',
              textDecoration: 'none',
            };
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
      </nav>
    </header>
  );
}

export default Navbar;
