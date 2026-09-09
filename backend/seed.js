// backend/seed.js — remplit la base avec tes produits (à lancer une seule fois)
const mongoose = require('mongoose');
require('dotenv').config();
const Produit = require('./models/Produit');

const produits = [
  {
    title: 'Baggy',
    description:
      'Baggy est un pantalon ample et confortable, parfait pour un style décontracté. Fabriqué à partir de matériaux de haute qualité, il offre une grande liberté de mouvement et un look tendance.',
    price: 3900,
    category: 'Pantalons',
    image: '/assets/BEIGE-BAGGY MALE FRONT.jpg',
    rating: 9.5,
  },
  {
    title: 'POLO DEMI MANCH',
    description:
      'POLO DEMI MANCH est un polo à manches courtes, idéal pour les journées chaudes. Conçu avec des tissus respirants, il offre un confort optimal tout en restant élégant.',
    price: 1500,
    category: 'Hauts',
    image: '/assets/polo-demi-manche.JPG',
    rating: 8.5,
  },
  {
    title: 'SHORT',
    description:
      'SHORT est un short léger et confortable, parfait pour les activités estivales. Fabriqué avec des matériaux de qualité, il assure une grande liberté de mouvement et un style décontracté.',
    price: 2450,
    category: 'Bas',
    image: '/assets/short-maron.jpg',
    rating: 9,
  },
  {
    title: 'WIDE SHORT',
    description:
      'WIDE SHORT est un short ample et confortable, parfait pour les activités estivales. Fabriqué avec des matériaux de qualité, il assure une grande liberté de mouvement et un style décontracté.',
    price: 2900,
    category: 'Bas',
    image: '/assets/wideshort-blue.JPG',
    rating: 9,
  },
  {
    title: 'T-SHIRT OVERSIZE',
    description:
      'T-SHIRT OVERSIZE est un t-shirt ample et confortable, parfait pour un style décontracté. Fabriqué à partir de matériaux de haute qualité, il offre une grande liberté de mouvement et un look tendance.',
    price: 2600,
    category: 'Hauts',
    image: '/assets/t-shirt260gsm-vert.jpg',
    rating: 8.5,
  },
  {
    title: 'T-SHIRT OVERSIZE+',
    description:
      'T-SHIRT OVERSIZE+ est un t-shirt ample et confortable, parfait pour un style décontracté. Fabriqué à partir de matériaux de haute qualité, il offre une grande liberté de mouvement et un look tendance.',
    price: 2900,
    category: 'Hauts',
    image: '/assets/t-shirtovrsize-beige.jpg',
    rating: 8.5,
  },
];

async function seed() {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || 'mongodb://localhost:27017/dzshop'
    );
    console.log('✅ Connecté à MongoDB');

    await Produit.deleteMany({}); // vide la collection d'abord
    console.log('🧹 Anciens produits supprimés');

    await Produit.insertMany(produits);
    console.log('🌱 ' + produits.length + ' produits ajoutés !');
  } catch (err) {
    console.log('❌ Erreur :', err.message);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
}

seed();
