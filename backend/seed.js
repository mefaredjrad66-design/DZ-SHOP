import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Produit from './models/Produit.js';

dotenv.config();

const produits = [
  {
    title: 'Baggy',
    description: 'Pantalon ample et confortable, parfait pour un style décontracté.',
    price: 3900,
    category: 'Pantalons',
    image: '/assets/BEIGE-BAGGY MALE FRONT.jpg',
    rating: 9.5,
  },
  {
    title: 'POLO DEMI MANCH',
    description: 'Polo à manches courtes, idéal pour les journées chaudes.',
    price: 1500,
    category: 'Hauts',
    image: '/assets/polo-demi-manche.JPG',
    rating: 8.5,
  },
  {
    title: 'SHORT',
    description: 'Short léger et confortable, parfait pour l’été.',
    price: 2450,
    category: 'Bas',
    image: '/assets/short-maron.jpg',
    rating: 9,
  },
  {
    title: 'WIDE SHORT',
    description: 'Short ample et confortable, parfait pour l’été.',
    price: 2900,
    category: 'Bas',
    image: '/assets/wideshort-blue.JPG',
    rating: 9,
  },
  {
    title: 'T-SHIRT OVERSIZE',
    description: 'T-shirt ample et confortable, parfait pour un style décontracté.',
    price: 2600,
    category: 'Hauts',
    image: '/assets/t-shirt260gsm-vert.jpg',
    rating: 8.5,
  },
  {
    title: 'T-SHIRT OVERSIZE+',
    description: 'T-shirt ample et confortable, parfait pour un style décontracté.',
    price: 2900,
    category: 'Hauts',
    image: '/assets/t-shirtovrsize-beige.jpg',
    rating: 8.5,
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/dzshop');
    console.log('✅ Connecté à MongoDB');

    await Produit.deleteMany({});
    console.log('🧹 Anciens produits supprimés');

    await Produit.insertMany(produits);
    console.log('🌱 ' + produits.length + ' produits ajoutés !');
  } catch (err) {
    console.log('❌ Erreur :', err.message);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
