function Footer() {
  return (
    <footer
      style={{
        background: '#1e293b',
        color: '#cbd5e1',
        textAlign: 'center',
        padding: '1.5rem',
        marginTop: '2rem',
        fontSize: '0.85rem',
      }}
    >
      © {new Date().getFullYear()} 🛍️ DZShop — Tous droits réservés
    </footer>
  );
}

export default Footer;