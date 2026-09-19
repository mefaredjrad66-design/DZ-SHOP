import { createContext, useState, useEffect } from 'react'
import api from '../api/axios.js'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [chargement, setChargement] = useState(true)

  useEffect(function () {
    const token = localStorage.getItem('token')
    const userSauvegarde = localStorage.getItem('user')
    if (token && userSauvegarde) {
      setUser(JSON.parse(userSauvegarde))
    }
    setChargement(false)
  }, [])

  async function login(email, mdp) {
    try {
      const rep = await api.post('/auth/login', { email, mdp })
      localStorage.setItem('token', rep.data.token)
      localStorage.setItem('user', JSON.stringify(rep.data.user))
      setUser(rep.data.user)
      return { ok: true }
    } catch (err) {
      return { ok: false, message: err.response?.data?.message || 'Erreur de connexion au serveur' }
    }
  }

  async function register(nom, email, mdp) {
    try {
      const rep = await api.post('/auth/register', { nom, email, mdp })
      localStorage.setItem('token', rep.data.token)
      localStorage.setItem('user', JSON.stringify(rep.data.user))
      setUser(rep.data.user)
      return { ok: true }
    } catch (err) {
      return { ok: false, message: err.response?.data?.message || 'Erreur de connexion au serveur' }
    }
  }

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, chargement }}>
      {children}
    </AuthContext.Provider>
  )
}