import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Utilisateur from '../models/Utilisateur.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

function creerToken(utilisateur) {
  return jwt.sign(
    { id: utilisateur._id, role: utilisateur.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

function versPublic(utilisateur) {
  return { nom: utilisateur.nom, email: utilisateur.email, role: utilisateur.role };
}

router.post('/register', async (req, res) => {
  try {
    // On choisit les champs un par un : le rôle ne vient JAMAIS du navigateur
    const { nom, email, mdp } = req.body;

    if (!nom || !email || !mdp) {
      return res.status(400).json({ message: 'Nom, email et mot de passe obligatoires' });
    }
    if (String(mdp).length < 6) {
      return res.status(400).json({ message: 'Le mot de passe doit faire au moins 6 caractères' });
    }

    const emailPropre = String(email).toLowerCase().trim();
    const existe = await Utilisateur.findOne({ email: emailPropre });
    if (existe) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }

    const mdpHache = await bcrypt.hash(String(mdp), 10);
    const utilisateur = await Utilisateur.create({ nom, email: emailPropre, mdp: mdpHache });

    res.status(201).json({
      token: creerToken(utilisateur),
      user: versPublic(utilisateur),
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }
    res.status(500).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, mdp } = req.body;

    const utilisateur = await Utilisateur.findOne({
      email: String(email || '').toLowerCase().trim(),
    });

    // Même message si l'email n'existe pas OU si le mot de passe est faux
    if (!utilisateur || !(await bcrypt.compare(String(mdp || ''), utilisateur.mdp))) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    res.json({
      token: creerToken(utilisateur),
      user: versPublic(utilisateur),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Qui suis-je ? (le site s'en sert pour vérifier que la session est encore valable)
router.get('/me', verifyToken, (req, res) => {
  res.json({ user: versPublic(req.user) });
});

export default router;