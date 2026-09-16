import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function PrivateRoute({ children }) {
  const { user, chargement } = useContext(AuthContext)
  if (chargement) return <p style={{ textAlign: 'center', padding: '3rem' }}>⏳ Chargement…</p>
  if (!user) return <Navigate to="/login" />
  return children
}
export default PrivateRoute;