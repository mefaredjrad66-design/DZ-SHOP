import mongoose from 'mongoose';

const utilisateurSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mdp: { type: String, required: true }, // toujours hashé, jamais en clair
    role: { type: String, enum: ['client', 'admin'], default: 'client' },
  },
  { timestamps: true }
);

const Utilisateur = mongoose.model('Utilisateur', utilisateurSchema);

export default Utilisateur;