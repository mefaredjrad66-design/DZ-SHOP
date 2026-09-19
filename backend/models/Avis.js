import mongoose from 'mongoose';

const avisSchema = new mongoose.Schema(
  {
    produit: { type: mongoose.Schema.Types.ObjectId, ref: 'Produit', required: true },
    utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur', required: true },
    nomUtilisateur: { type: String, required: true },
    note: { type: Number, required: true, min: 1, max: 5 },
    commentaire: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

// Un seul avis par utilisateur et par produit
avisSchema.index({ produit: 1, utilisateur: 1 }, { unique: true });

const Avis = mongoose.model('Avis', avisSchema);

export default Avis;