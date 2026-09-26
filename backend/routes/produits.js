import express from 'express';
import mongoose from 'mongoose';
import Produit from '../models/Produit.js';
import { verifyToken, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Échappe les caractères spéciaux d'une regex pour une recherche sûre
function echapperRegex(texte) {
  return texte.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Liste des catégories existantes — pour le filtre. AVANT /:id pour ne pas être capturé par lui.
router.get('/categories/liste', async (req, res) => {
  try {
    const categories = await Produit.distinct('category');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { recherche, page = 1, limite = 8, categorie, tri } = req.query;

    const filtre = {};
    if (recherche) {
      filtre.title = { $regex: echapperRegex(recherche), $options: 'i' };
    }
    if (categorie) {
      filtre.category = categorie;
    }

    let triMongo = { createdAt: -1 };
    if (tri === 'prix_asc') triMongo = { price: 1 };
    else if (tri === 'prix_desc') triMongo = { price: -1 };

    const pageNum = Math.max(1, parseInt(page) || 1);
    const limiteNum = Math.max(1, parseInt(limite) || 8);
    const skip = (pageNum - 1) * limiteNum;

    const [produits, total] = await Promise.all([
      Produit.find(filtre).sort(triMongo).skip(skip).limit(limiteNum),
      Produit.countDocuments(filtre),
    ]);

    res.json({
      produits,
      page: pageNum,
      totalPages: Math.max(1, Math.ceil(total / limiteNum)),
      total,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    // Un identifiant mal écrit : 404 propre, pas de plantage
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    const produit = await Produit.findById(req.params.id);

    if (!produit) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    res.json(produit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', verifyToken, isAdmin, async (req, res) => {
  try {
    // On choisit les champs un par un (le navigateur ne décide pas de ratingAvg, etc.)
    const { title, price, category, image, description, rating } = req.body;
    const produit = new Produit({ title, price, category, image, description, rating });
    const nouveauProduit = await produit.save();

    res.status(201).json(nouveauProduit);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    const { title, price, category, image, description, rating } = req.body;
    const produit = await Produit.findByIdAndUpdate(
      req.params.id,
      { title, price, category, image, description, rating },
      {
        returnDocument: 'after',
        runValidators: true
      }
    );

    if (!produit) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    res.json(produit);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    const produit = await Produit.findByIdAndDelete(req.params.id);

    if (!produit) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    res.json({ message: 'Produit supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;