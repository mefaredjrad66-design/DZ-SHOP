// backend/routes/produits.js — les "portes d'entrée" de l'API produits
const express = require('express');
const router = express.Router();
const Produit = require('../models/Produit');

// GET tous les produits  →  GET /api/produits
router.get('/', async function (req, res) {
  try {
    const produits = await Produit.find();
    res.json(produits);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET un produit par id  →  GET /api/produits/:id
router.get('/:id', async function (req, res) {
  try {
    const produit = await Produit.findById(req.params.id);
    if (!produit) {
      res.status(404).json({ message: 'Produit non trouvé' });
      return;
    }
    res.json(produit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
