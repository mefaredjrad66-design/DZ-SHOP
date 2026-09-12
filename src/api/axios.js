// src/api/axios.js
// Un seul endroit qui sait parler à notre serveur.
// baseURL = le début de TOUTES les adresses. Ensuite on écrit juste api.get('/produits')
// et axios complète en http://localhost:5000/api/produits.
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export default api;
