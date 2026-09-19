import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function RegisterPage() {
  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [mdp, setMdp] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [erreur, setErreur] = useState('')
  const { register } = useContext(AuthContext)
  const navigate = useNavigate()

  async function envoyer(e) {
  e.preventDefault()
  if (mdp.length < 6) {
    setErreur('Le mot de passe doit faire au moins 6 caractères')
    return
  }
  if (mdp !== confirmation) {
    setErreur('Les deux mots de passe ne sont pas identiques')
    return
  }
  const res = await register(nom, email, mdp)
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
        <h1 style={{ fontSize: '1.6rem', marginBottom: '0.25rem' }}>Créer un compte</h1>
        <p style={{ color: '#64748b', marginTop: 0, marginBottom: '1.5rem' }}>
          Rejoins DZShop en quelques secondes.
        </p>

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
            placeholder="Nom complet"
            value={nom}
            onChange={function (e) { setNom(e.target.value) }}
            required
          />
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
            placeholder="Mot de passe (min. 6)"
            value={mdp}
            onChange={function (e) { setMdp(e.target.value) }}
            required
          />
          <input
            style={inputStyle}
            type="password"
            placeholder="Confirmer le mot de passe"
            value={confirmation}
            onChange={function (e) { setConfirmation(e.target.value) }}
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
            Créer mon compte
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', marginBottom: 0, color: '#64748b' }}>
          Déjà un compte ?{' '}
          <Link to="/login" style={{ color: '#0891b2', fontWeight: 'bold', textDecoration: 'none' }}>
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  )
}
export default RegisterPage;