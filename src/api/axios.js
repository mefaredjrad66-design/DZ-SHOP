// src/api/axios.js
import axios from 'axios';

// Un SEUL endroit qui connaît l'adresse de l'API.
// En local : http://localhost:5000/api. En ligne : la variable REACT_APP_API_URL
// (avec /api à la fin, ex. https://ton-api.onrender.com/api).
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

// Avant chaque requête, on ajoute le token de connexion (s'il existe)
api.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Si le serveur répond "session invalide" (token expiré) alors qu'on avait un token :
// on déconnecte proprement et on renvoie vers la page de connexion
api.interceptors.response.use(
  function (reponse) {
    return reponse;
  },
  function (erreur) {
    const url = (erreur.config && erreur.config.url) || '';
    const estAuth = url.startsWith('/auth/login') || url.startsWith('/auth/register');
    if (erreur.response && erreur.response.status === 401 && localStorage.getItem('token') && !estAuth) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(erreur);
  }
);

export default api;