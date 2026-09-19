import express from 'express';
import Commande from '../models/Commande.js';
import Produit from '../models/Produit.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
  try {
    const { cartItems, nom, telephone, wilaya, adresse } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: 'Panier vide' });
    }

    let sousTotal = 0;
    const produitsCommande = [];

    for (const item of cartItems) {
      const produit = await Produit.findById(item.id);
      if (!produit) continue;

      sousTotal += produit.price * item.quantity;
      produitsCommande.push({
        produit: produit._id,
        title: produit.title,
        prixUnitaire: produit.price,
        quantity: item.quantity,
      });
    }

    const livraison = sousTotal >= 5000 ? 0 : 500;
    const total = sousTotal + livraison;

    const commande = await Commande.create({
      utilisateur: req.user.id,
      produits: produitsCommande,
      sousTotal,
      livraison,
      total,
      nom,
      telephone,
      wilaya,
      adresse,
    });

    res.status(201).json(commande);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/mes-commandes', verifyToken, async (req, res) => {
  try {
    const commandes = await Commande.find({ utilisateur: req.user.id }).sort({ createdAt: -1 });
    res.json(commandes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;