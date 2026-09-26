import jwt from 'jsonwebtoken';
import Utilisateur from '../models/Utilisateur.js';

export async function verifyToken(req, res, next) {
  const header = req.headers.authorization || '';
  if (!header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Non connecté' });
  }
  try {
    const token = header.slice(7); // "Bearer xxxxx" → xxxxx
    const decode = jwt.verify(token, process.env.JWT_SECRET); // { id, role }
    // On relit l'utilisateur en base à chaque requête : si son rôle change
    // (ex. devenu admin), c'est pris en compte tout de suite, sans se reconnecter.
    const utilisateur = await Utilisateur.findById(decode.id);
    if (!utilisateur) {
      return res.status(401).json({ message: 'Compte introuvable, reconnecte-toi' });
    }
    // req.user.id (texte) et req.user.role restent utilisables comme avant
    req.user = utilisateur;
    next();
  } catch {
    return res.status(401).json({ message: 'Session invalide, reconnecte-toi' });
  }
}

export function isAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Accès réservé aux administrateurs' });
  }
  next();
}