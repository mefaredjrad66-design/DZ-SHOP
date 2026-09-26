// Utilisation (depuis le dossier backend) :  node makeAdmin.js ton-email@gmail.com
// (le compte doit déjà exister : inscris-toi d'abord sur le site)
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Utilisateur from './models/Utilisateur.js';

dotenv.config();

const email = (process.argv[2] || '').toLowerCase().trim();
if (!email) {
  console.log('Utilisation : node makeAdmin.js ton-email@gmail.com');
  process.exit(1);
}

try {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/dzshop');
  const utilisateur = await Utilisateur.findOneAndUpdate(
    { email: email },
    { role: 'admin' },
    { returnDocument: 'after' }
  );
  if (!utilisateur) {
    console.log("Aucun compte avec l'email " + email + ". Inscris-toi d'abord sur le site.");
  } else {
    console.log(utilisateur.nom + ' (' + utilisateur.email + ') est maintenant admin.');
  }
} catch (err) {
  console.log('Erreur : ' + err.message);
} finally {
  await mongoose.disconnect();
}