import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [mdp, setMdp] = useState('')
  const [erreur, setErreur] = useState('')
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  async function envoyer(e) {
  e.preventDefault()
  const res = await login(email, mdp)
  if (res.ok) { navigate('/') }
  else { setErreur(res.message) }
}

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    marginBottom: '1rem',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
    fontSize: '0.95rem',
    outline: 'none',
    boxSizing: 'border-box',
  }

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 80px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '16px',
          padding: '2.5rem',
          maxWidth: '420px',
          width: '100%',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        }}
      >
        <h1 style={{ fontSize: '1.6rem', marginBottom: '0.25rem' }}>Connexion</h1>
        <p style={{ color: '#64748b', marginTop: 0, marginBottom: '1.5rem' }}>
          Content de te revoir 👋
        </p>

        <div
          style={{
            background: '#e0f2fe',
            color: '#0e7490',
            padding: '0.65rem 1rem',
            borderRadius: '8px',
            fontSize: '0.85rem',
            marginBottom: '1.25rem',
          }}
        >
          Démo : <b>mefaredjrad66@gmail.com</b> / <b>29455092006</b>
        </div>

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
            type="email"
            placeholder="Email"
            value={email}
            onChange={function (e) { setEmail(e.target.value) }}
            required
          />
          <input
            style={inputStyle}
            type="password"
            placeholder="Mot de passe"
            value={mdp}
            onChange={function (e) { setMdp(e.target.value) }}
            required
          />
          <button
            style={{
              width: '100%',
              padding: '0.85rem',
              background: '#0891b2',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Se connecter
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', marginBottom: 0, color: '#64748b' }}>
          Pas de compte ?{' '}
          <Link to="/register" style={{ color: '#0891b2', fontWeight: 'bold', textDecoration: 'none' }}>
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  )
}
export default LoginPage;