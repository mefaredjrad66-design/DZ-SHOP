// backend/server.js — le point de départ du serveur
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/dzshop')
  .then(function () {
    console.log('✅ MongoDB connecté');
  })
  .catch(function (err) {
    console.log('❌ Erreur MongoDB :', err.message);
  });

// Routes
const produitRoutes = require('./routes/produits');
app.use('/api/produits', produitRoutes);

// Petite route de test
app.get('/', function (req, res) {
  res.send('API DZShop en ligne 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log('🚀 Serveur sur http://localhost:' + PORT);
});
