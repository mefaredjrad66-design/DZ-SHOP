import dns from 'node:dns';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import produitRoutes from './routes/produits.js';
import authRoutes from './routes/auth.js';
import commandeRoutes from './routes/commandes.js';
import avisRoutes from './routes/avis.js';

dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config();

// Sans phrase secrète, on ne démarre pas : mieux vaut planter que d'être vulnérable
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET manquant dans le fichier .env');
}

const app = express();

// Qui a le droit d'appeler l'API depuis un navigateur ?
// En local : ton site sur le port 3000. En ligne : l'adresse de ton site (variable FRONTEND_URL).
const origines = ['http://localhost:3000', process.env.FRONTEND_URL].filter(Boolean);
app.use(cors({ origin: origines }));
app.use(express.json());

app.use('/assets', express.static('assets'));

app.use('/api/produits', produitRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/commandes', commandeRoutes);
app.use('/api/avis', avisRoutes);

app.get('/', (req, res) => {
  res.send('API DZShop en ligne 🚀');
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || 'mongodb://localhost:27017/dzshop',
      {
        serverSelectionTimeoutMS: 10000
      }
    );

    console.log('✅ MongoDB connecté');

    app.listen(PORT, () => {
      console.log('🚀 Serveur sur http://localhost:' + PORT);
    });
  } catch (err) {
    console.error('❌ Erreur MongoDB :', err.message);
    process.exitCode = 1;
  }
}

startServer();