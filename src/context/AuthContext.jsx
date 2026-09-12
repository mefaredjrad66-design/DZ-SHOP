import { createContext, useState } from 'react'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)   // null = déconnecté

  function login(email, mdp) {
    // Vérif "en dur" pour l'instant (le vrai contrôle = partie 2)
    if (email === 'mefaredjrad66@gmail.com' && mdp === '29455092006') {
      setUser({ nom: 'Radi', email: email, role: 'admin' })
      return true
    }
    return false
  }

  // Inscription simulée : on crée un compte "client" et on le connecte.
  function register(nom, email) {
    setUser({ nom: nom, email: email, role: 'client' })
  }

  function logout() { setUser(null) }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}