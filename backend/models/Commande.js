import mongoose from 'mongoose';

const commandeSchema = new mongoose.Schema(
  {
    utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur', required: true },
    produits: [
      {
        produit: { type: mongoose.Schema.Types.ObjectId, ref: 'Produit' },
        title: String,
        prixUnitaire: Number,
        quantity: Number,
      },
    ],
    sousTotal: Number,
    livraison: Number,
    total: Number,
    nom: String,
    telephone: String,
    wilaya: String,
    adresse: String,
    statut: { type: String, default: 'en_attente' },
  },
  { timestamps: true }
);

const Commande = mongoose.model('Commande', commandeSchema);

export default Commande;