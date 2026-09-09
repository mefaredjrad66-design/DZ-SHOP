// backend/models/Produit.js — la "forme" d'un produit dans la base de données
const mongoose = require('mongoose');

const ProduitSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String },
    description: { type: String },
    rating: { type: Number, default: 4.5 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Produit', ProduitSchema);
