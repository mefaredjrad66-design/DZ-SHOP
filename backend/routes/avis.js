import express from 'express';
import Avis from '../models/Avis.js';
import Produit from '../models/Produit.js';
import Utilisateur from '../models/Utilisateur.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Lire les avis d'un produit — public
router.get('/:produitId', async (req, res) => {
  try {
    const avis = await Avis.find({ produit: req.params.produitId }).sort({ createdAt: -1 });
    res.json(avis);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Laisser (ou modifier) un avis — connecté uniquement
router.post('/:produitId', verifyToken, async (req, res) => {
  try {
    const { note, commentaire } = req.body;
    const { produitId } = req.params;

    if (!note || note < 1 || note > 5) {
      return res.status(400).json({ message: 'La note doit être entre 1 et 5' });
    }
    if (!commentaire || !commentaire.trim()) {
      return res.status(400).json({ message: 'Le commentaire ne peut pas être vide' });
    }

    const produit = await Produit.findById(produitId);
    if (!produit) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    const utilisateur = await Utilisateur.findById(req.user.id);

    // Un avis existant du même utilisateur est mis à jour, jamais dupliqué
    await Avis.findOneAndUpdate(
      { produit: produitId, utilisateur: req.user.id },
      {
        note,
        commentaire: commentaire.trim(),
        nomUtilisateur: utilisateur?.nom || 'Client',
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // Recalcul de la moyenne à partir des vrais avis en base
    const stats = await Avis.aggregate([
      { $match: { produit: produit._id } },
      { $group: { _id: null, moyenne: { $avg: '$note' }, total: { $sum: 1 } } },
    ]);

    produit.ratingAvg = stats[0]?.moyenne || 0;
    produit.ratingCount = stats[0]?.total || 0;
    await produit.save();

    const avisActuels = await Avis.find({ produit: produitId }).sort({ createdAt: -1 });

    res.status(201).json({
      avis: avisActuels,
      ratingAvg: produit.ratingAvg,
      ratingCount: produit.ratingCount,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;