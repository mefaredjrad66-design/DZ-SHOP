import mongoose from 'mongoose';

const ProduitSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 2
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    category: {
      type: String,
      required: true
    },
    image: {
      type: String
    },
    description: {
      type: String
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 10
    }
  },
  {
    timestamps: true
  }
);

const Produit = mongoose.model('Produit', ProduitSchema);

export default Produit;